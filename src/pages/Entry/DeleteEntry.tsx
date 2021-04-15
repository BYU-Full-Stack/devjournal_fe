import { SetStateAction } from 'react';
import { useHistory, useParams } from 'react-router';
import { deleteEntry, useUser } from '../../API/AppLogic';
import { Button } from '../../Styles';
import { EntryType } from '../Journal/ListEntries';

type Props = {
  entry: EntryType;
  setEntries: React.Dispatch<React.SetStateAction<EntryType[]>>;
};

const DeleteEntry = ({ entry, setEntries }: Props) => {
  //user credentials
  const [user] = useUser();

  const handleEntryDelete = async () => {
    try {
      //ensures that entry is actually deletable
      let journal_id = entry.journalId ? entry.journalId : '';
      let entry_id = entry.id ? entry.id : '';

      await deleteEntry(user.username, journal_id, entry_id, user.token);

      // update list of entries displayed within journal
      setEntries((prevState: Array<EntryType>) => {
        let deleteIdx = prevState.findIndex((x) => x.id === entry.id);
        return [
          ...prevState.slice(0, deleteIdx),
          ...prevState.slice(deleteIdx + 1),
        ];
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Button
      bgColor='bg-dark'
      padding='.4em 1em'
      border='transparent 2px solid'
      hoverBorder='turq 2px solid'
      onClick={handleEntryDelete}
    >
      Delete Entry
    </Button>
  );
};
export default DeleteEntry;
