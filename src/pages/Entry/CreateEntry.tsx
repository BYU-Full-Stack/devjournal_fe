import { OnChange } from '@monaco-editor/react';
import Editor, {
  DiffEditor,
  useMonaco,
  loader,
  Monaco,
} from '@monaco-editor/react';
import { useState } from 'react';
import { createEntry, useUser } from '../../API/AppLogic';
import ConfirmableInput from '../../components/ConfirmableInput/ConfirmableInput';
import { Button, FlexCol, FlexContainer, H1, H3 } from '../../Styles';
import { EntryType } from '../Journal/ListEntries';
import { Link, useHistory, useParams } from 'react-router-dom';

const CreateEntry = () => {
  const [user] = useUser();
  const routeHistory = useHistory();
  const [canUserSave, setCanUserSave] = useState(true);
  const journalId = useParams<{ id?: string }>();

  const [entry, setEntry] = useState<EntryType>({
    title: '',
    markdown: '',
    html: '',
  });

  const titlePlace = ['title'];

  const handleUpdateTextInput: OnChange = (value, e) => {
    setEntry({ ...entry, markdown: value });
  };

  const handleUpdateNameInput = (value: String) => {
    setEntry({ ...entry, [titlePlace[0]]: value });
  };

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
      <Link to=''>
        <Button>Back</Button>
      </Link>
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
