import React, {useCallback, useState} from 'react';
import {useStream} from 'react-fetch-streams';
import Entry from './Entry';

const fetchParams = {mode: 'cors'}

const EntryList = props => {
    const [entries, setEntries] = useState([]);
    const onNext = useCallback(async res => {
        const newEntry = await res.json();
        setEntries([...entries, newEntry]);
    }, [setEntries, entries]);
    useStream('http://localhost:8000/', {onNext, fetchParams});

    return <>
        {entries.map(entry => (
            <Entry key={entry.counter} counter={entry.counter} />
        ))}
        </>
    ;
};

export default EntryList;
