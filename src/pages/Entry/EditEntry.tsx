import { faLastfmSquare } from '@fortawesome/free-brands-svg-icons';
import Editor, {
  DiffEditor,
  useMonaco,
  loader,
  Monaco,
} from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
import { updateEntry, useAlertBox, useUser } from '../../API/AppLogic';
import { EntryType } from '../Journal/ListEntries';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { Button } from '../../Styles';

type Props = {
  entry: EntryType;
  saveEntry: (editedEntry: EntryType) => void;
};

type OnChange = (
  value: string | undefined,
  ev: monaco.editor.IModelContentChangedEvent
) => void;

const EditEntry = ({ entry, saveEntry }: Props) => {
  const saveButtonRef = useRef<HTMLButtonElement>(null);

  const [user] = useUser();
  const [editEntry, setEditEntry] = useState(entry);

  // watch for the entry from props to update and then update state
  useEffect(() => setEditEntry(entry), [entry]);

  const handleUpdateTextInput: OnChange = (value, e) => {
    setEditEntry({ ...editEntry, markdown: value });
  };

  const updateEntryDetails = async () => {
    try {
      await updateEntry(user.username, editEntry, user.token);
      saveEntry(editEntry);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button
        ref={saveButtonRef}
        bgColor='bg-dark'
        padding='.4em 1em'
        border='transparent 2px solid'
        hoverBorder='turq 2px solid'
        onClick={updateEntryDetails}
      >
        Save Entry
      </Button>
      <Editor
        height='90vh'
        defaultLanguage='markdown'
        value={entry?.markdown}
        theme='vs-dark'
        onChange={handleUpdateTextInput}
      />
    </>
  );
};

export default EditEntry;
