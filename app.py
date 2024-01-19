from typing import Union
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import asyncio
from fastapi.responses import StreamingResponse
from mastodon import Mastodon, StreamListener
import json
import datetime
import logging

logging.basicConfig(level=logging.DEBUG)
load_dotenv()
app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

max_entries = int(os.environ.get('MASTODON_MAX_ENTRIES', 50))

# mastodon stream pool
entries = []

def date_to_isoformat(o):
  if isinstance(o, datetime.datetime):
      return o.isoformat()

async def generate_entries():
    global entries
    pos = 0
    while True:
        if (pos < len(entries)):
            entry = entries[pos]
            logging.debug("streaming entry %s", entry['id'])
            yield json.dumps(entry, default=date_to_isoformat) + '\n'
            pos += 1

            # DEMO slow down the stream
            await asyncio.sleep(0.4)

            # TODO if there's no sleep between the chunks, it causes json parse
            # errors on the client side
            await asyncio.sleep(0.1)
        else:
            await asyncio.sleep(1)  # wait for more data

@app.get("/public")
async def stream_public():
    return StreamingResponse(
        generate_entries(),
        media_type="application/x-ndjson"
    )

class Listener(StreamListener):
    def on_update(self, status):
        global entries
        if len(entries) >= max_entries:
            # TODO proper entry management
            logging.debug("maximum entry count %d reached", max_entries)
            return

        if status["language"] == "en":
            # DEMO filter for english entries
            logging.debug("new entry %s", status["id"])
            entries.append(status)

    def handle_heartbeat(self):
        logging.debug("ping")


mastodon = Mastodon(client_id=os.environ['MASTODON_CLIENT_SECRET'])
mastodon.log_in(
    os.environ['MASTODON_USER'],
    os.environ['MASTODON_PASSWORD'],
    to_file=os.environ['MASTODON_USER_SECRET'],
)
mastodon.stream_public(Listener(), run_async=True)
