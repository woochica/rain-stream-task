import React, { useCallback, useState } from "react";
import { useStream } from "react-fetch-streams";
import { Entry } from "./Entry";

const serverUrl = "http://localhost:8000/public";
const fetchParams = { mode: "cors" };

type ResponseEntry = {
  id: string;
  account: {
    avatar: string;
    display_name: string;
  };
  created_at: string;
  content: string;
  url: string;
};

export const EntryList = () => {
  const [entries, setEntries] = useState<ResponseEntry[]>([]);
  const onNext = useCallback(
    async (res: Response) => {
      // TODO add schema validation
      const newEntry = (await res.json()) as unknown as ResponseEntry;
      setEntries([newEntry, ...entries]);
      console.debug("new entry", newEntry);
    },
    [setEntries, entries],
  );
  useStream(serverUrl, { onNext, fetchParams });

  const entriesContent = entries.map((entry) => (
    <Entry
      key={entry.id}
      avatar={entry.account.avatar}
      displayName={entry.account.display_name}
      createdAt={entry.created_at}
      content={entry.content}
      url={entry.url}
    />
  ));

  return (
    <div className="mb-32 grid gap-8 text-center">
      <h1 className="mb-3 text-2xl font-semibold">Recent public entries</h1>
      {entries.length > 0 ? entriesContent : <p>No entries yet.</p>}
    </div>
  );
};
