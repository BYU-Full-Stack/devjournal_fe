import { SetStateAction, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import { theme } from './../../Styles';
import { getJournals, useUser } from '../../API/AppLogic';
import { RouteMatchType } from '../../Types';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { EntryType } from '../Journal/ListEntries';
import EditEntry from './EditEntry';
import DisplayEntry from './DisplayEntry';

export type SelectedEntryType = {
  entry: EntryType;
  setEntries: React.Dispatch<React.SetStateAction<EntryType[]>>;
};

const Entry = ({ entry, setEntries }: SelectedEntryType) => {

  const [seeMarkdown, setSeeMarkdown] = useState(false);

  const updateEntryList = (editedEntry: EntryType) => {
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
      <button onClick={() => setSeeMarkdown(!seeMarkdown)}>switch</button>
      {seeMarkdown === false ? (
        <>
          <EditEntry entry={entry} saveEntry={updateEntryList} />
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
