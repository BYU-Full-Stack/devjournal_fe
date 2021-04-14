import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from '../../Styles';
import { EntryType } from '../Journal/ListEntries';

type Props = {
  entry?: EntryType;
  saveEntry: (value: React.SetStateAction<boolean>) => void;
};

const DisplayEntry = ({ entry, saveEntry }: Props) => {
  const [markdown, setMarkdown] = useState(
    entry?.markdown ? entry?.markdown : ''
  );

  useEffect(() => setMarkdown(markdown), [entry?.markdown]);
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
      <ReactMarkdown source={markdown} />
    </>
  );
};

export default DisplayEntry;
