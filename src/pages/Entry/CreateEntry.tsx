import { OnChange } from '@monaco-editor/react';
import Editor from '@monaco-editor/react';
import { useState } from 'react';
import { createEntry, useUser } from '../../API/AppLogic';
import ConfirmableInput from '../../components/ConfirmableInput/ConfirmableInput';
import { Button, FlexCol, FlexContainer, H1, H3 } from '../../Styles';
import { EntryType } from '../Journal/ListEntries';
import { useHistory, useParams } from 'react-router-dom';

const CreateEntry = () => {
  //bring in user credentials
  const [user] = useUser();

  //route information to access journal id
  const routeHistory = useHistory();
  const journalId = useParams<{ id?: string }>();

  //determine whether or not a user can save the title
  const [canUserSave, setCanUserSave] = useState(true);

  //initial entry is blank
  const [entry, setEntry] = useState<EntryType>({
    title: '',
    markdown: '',
    html: '',
  });

  //reference variable to join later
  const titlePlace = ['title'];

  const handleUpdateTextInput: OnChange = (value, e) => {
    setEntry({ ...entry, markdown: value });
  };

  const handleUpdateNameInput = (value: String) => {
    setEntry({ ...entry, [titlePlace[0]]: value });
  };

  // "on submit" handler
  const createEntryHandler = async () => {
    try {
      await createEntry(
        user.username,
        { ...entry, journalId: journalId ? journalId.id : '' },
        user.token
      );
      routeHistory.push(`/journals/${journalId.id}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main>
      <Button onClick={() => routeHistory.goBack()}>Back</Button>
      <H1>Create a New Entry</H1>
      <FlexContainer wrap='wrap' height='100%'>
        <FlexCol margin='auto'>
          <H3 display='inline'>Name:</H3>
          <ConfirmableInput
            myKey={0}
            setCanUserSave={setCanUserSave}
            editableText={entry?.title}
            handleInputUpdate={handleUpdateNameInput}
          />
          <Editor
            height='90vh'
            defaultLanguage='markdown'
            value={entry?.markdown}
            theme='vs-dark'
            onChange={handleUpdateTextInput}
          />
          <FlexContainer justify='flex-end' margin='1em 0em'>
            <Button
              bgColor='bg-dark'
              padding='.4em 1em'
              border='transparent 2px solid'
              hoverBorder='turq 2px solid'
              disabled={canUserSave}
              onClick={createEntryHandler}
            >
              Create
            </Button>
          </FlexContainer>
        </FlexCol>
      </FlexContainer>
    </main>
  );
};

export default CreateEntry;
