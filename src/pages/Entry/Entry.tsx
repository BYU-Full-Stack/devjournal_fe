import { useEffect, useState } from 'react';
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

const Entry = (props: SelectedEntryType) => {
  const [seeMarkdown, setSeeMarkdown] = useState(false);

  const updateEntryList = (editedEntry: EntryType) => {
    props.setEntries((prevEntries: Array<EntryType>) => {
      let editIdx = prevEntries.findIndex((x) => x.id === props.entry.id);
      console.log(prevEntries[editIdx]);
      console.log(prevEntries);
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
          <EditEntry
            entry={props.entry}
            saveEntry={(editedEntry: EntryType) => {
              // setSeeMarkdown(true);
              updateEntryList(editedEntry);
              console.log('at saveEntry prop EditEntry', editedEntry);
            }}
          />
        </>
      ) : (
        <>
          <div>kaboom</div>
          {/* <DisplayEntry entry={props.entry} saveEntry={setSeeMarkdown} /> */}
        </>
      )}
    </>
  );
};

export default Entry;
