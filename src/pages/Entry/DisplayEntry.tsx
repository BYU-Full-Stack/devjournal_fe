import ReactMarkdown from 'react-markdown';
import { Button } from '../../styles/GlobalStyles';
import { EntryType } from '../Journal/ListEntries';

type Props = {
  entry?: EntryType;
  saveEntry: (value: React.SetStateAction<boolean>) => void;
};

const DisplayEntry = ({ entry, saveEntry }: Props) => {

  return (
    <>
      <Button
        bgColor='bg-dark'
        padding='.4em 1em'
        border='transparent 2px solid'
        hoverBorder='turq 2px solid'
        onClick={() => saveEntry(false)}
      >
        Edit Entry
      </Button>
      <ReactMarkdown source={entry?.markdown || ''} />
    </>
  );
};

export default DisplayEntry;
