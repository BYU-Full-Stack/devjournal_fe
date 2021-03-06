import Editor from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
import { updateEntry, useUser } from '../../API/AppLogic';
import { EntryType } from '../Journal/ListEntries';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { Button, FlexCol, FlexContainer, H3 } from '../../styles/GlobalStyles';
import ConfirmableInput from '../../components/ConfirmableInput/ConfirmableInput';

type Props = {
  entry: EntryType;
  saveEntry: (editedEntry: EntryType) => void;
  username: string;
};

type OnChange = (
  value: string | undefined,
  ev: monaco.editor.IModelContentChangedEvent
) => void;

const EditEntry = ({ username, entry, saveEntry }: Props) => {
  const saveButtonRef = useRef<HTMLButtonElement>(null);

  const [user] = useUser();
  const [editEntry, setEditEntry] = useState(entry);
  const [, setCanUserSave] = useState(false);
  const titlePlace = ['title'];

  // watch for the entry from props to update and then update state
  useEffect(() => setEditEntry(entry), [entry]);

  const handleUpdateTextInput: OnChange = (value, e) => {
    setEditEntry({ ...editEntry, markdown: value });
  };

  const handleUpdateNameInput = (value: String) => {
    setEditEntry({ ...editEntry, [titlePlace[0]]: value });
  };

  const updateEntryDetails = async () => {
    try {
      await updateEntry(username, editEntry, user.token);
      let date = new Date();
      setEditEntry({
        ...editEntry,
        lastUpdated: date.setHours(date.getHours() + 6),
      });
      saveEntry(editEntry);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <FlexContainer wrap='wrap' height='100%'>
        <FlexCol>
          <Button
            data-testid='title-button'
            ref={saveButtonRef}
            bgColor='bg-dark'
            padding='.4em 1em'
            border='transparent 2px solid'
            hoverBorder='turq 2px solid'
            onClick={updateEntryDetails}
          >
            Save Entry
          </Button>
          <br></br>
          <H3 display='inline'>Name:</H3>
          <ConfirmableInput
            data-testid='title-input'
            myKey={0}
            setCanUserSave={setCanUserSave}
            editableText={editEntry?.title}
            handleInputUpdate={handleUpdateNameInput}
          />
        </FlexCol>
      </FlexContainer>
      <FlexContainer>
        <FlexCol minWidth='100%'>
          <Editor
            data-testid='monaco-editor'
            height='90vh'
            defaultLanguage='markdown'
            value={editEntry?.markdown}
            theme='vs-dark'
            onChange={handleUpdateTextInput}
          />
        </FlexCol>
      </FlexContainer>
    </>
  );
};

export default EditEntry;
