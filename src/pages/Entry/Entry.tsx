import { useState } from 'react';

import { EntryType } from '../Journal/ListEntries';
import EditEntry from './EditEntry';
import DisplayEntry from './DisplayEntry';
import DeleteEntry from './DeleteEntry';

export type SelectedEntryType = {
  entry: EntryType;
  setEntries: React.Dispatch<React.SetStateAction<EntryType[]>>;
  username: string;
};

const Entry = ({ username, entry, setEntries }: SelectedEntryType) => {
  const [seeMarkdown, setSeeMarkdown] = useState(true);

  const updateEntryList = (editedEntry: EntryType) => {
    //reset displayed list of entries each time an entry changes
    setEntries((prevEntries: Array<EntryType>) => {
      const editIdx = prevEntries.findIndex((x) => x.id === entry.id);
      setSeeMarkdown(true);
      return [
        ...prevEntries.slice(0, editIdx),
        editedEntry,
        ...prevEntries.slice(editIdx + 1),
      ];
    });
  };

  return (
    <>
      <DeleteEntry username={username} entry={entry} setEntries={setEntries} />
      {seeMarkdown === false ? (
        <>
          <EditEntry username={username} entry={entry} saveEntry={updateEntryList} />
        </>
      ) : (
        <>
          <DisplayEntry entry={entry} saveEntry={setSeeMarkdown} />
        </>
      )}
    </>
  );
};

export default Entry;
