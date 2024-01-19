from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import asyncio
from fastapi.responses import StreamingResponse
import json

origins = [
    "http://localhost:3000",
]


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def generate_entries():
    for i in range(10):
        yield json.dumps({"counter":i}) + '\n'
        await asyncio.sleep(0.2)
@app.get("/")
def read_root():
    return {Hello: "World"}
async def index():
    return StreamingResponse(
        generate_entries(),
        media_type="application/x-ndjson"
    )

