import React, {useCallback, useState} from 'react';
import {useStream} from 'react-fetch-streams';
import Entry from './Entry';

const fetchParams = {mode: 'cors'}

const EntryList = props => {
    const [entries, setEntries] = useState([]);
    const onNext = useCallback(async res => {
        // TODO add schema validation
        const newEntry = await res.json();
        setEntries([newEntry, ...entries]);
        console.debug('new entry', newEntry.id);
    }, [setEntries, entries]);
    useStream('http://localhost:8000/public', {onNext, fetchParams});

    const entriesContent = entries.map(entry => (
            <Entry key={entry.id} createdAt={entry.created_at}
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

export default EntryList;
