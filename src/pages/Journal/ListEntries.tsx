import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getEntries, useUser } from '../../API/AppLogic';
import { FlexCol, FlexContainer, LeftNav, PrettyH2, H1 } from '../../Styles';
import Entry from '../Entry/Entry';
import { JournalType } from './Journal';

type EntryType = {
  id: string;
  journalId: string;
  title: string;
  markdown: string;
  html: string;
  dateCreated: Date;
  lastUpdated: Date;
};

const SmallText = styled.span`
  font-size: 12px;
`;

const ListEntries = (props: JournalType) => {
  const [entries, setEntries] = useState<EntryType[]>([]);
  const [visibleEntry, setVisibleEntry] = useState<EntryType>();
  const [user] = useUser();

  useEffect(() => {
    user.token &&
      (async function () {
        try {
          const allEntries: EntryType[] = await getEntries(
            user.username,
            props.id,
            user.token
          );
          setEntries(allEntries);
          setVisibleEntry(allEntries[0]);
        } catch (err) {
          console.log(err);
        }
      })();
  }, [user.token, user.username, props.id]);

  const changeEntry = (props: number) => {
    let entry = entries[props];
    setVisibleEntry(entry);
  };

  return (
    <FlexContainer wrap='wrap' height='100%'>
      <LeftNav width='15%'>
        <PrettyH2>{props.name} Journal Entries</PrettyH2>
        {entries?.map(({ title, lastUpdated }, idx) => {
          lastUpdated = new Date(lastUpdated);

          return (
            <div key={idx} onClick={() => changeEntry(idx)}>
              <FlexCol>{title}</FlexCol>
              <FlexCol>
                <SmallText>
                  Updated {lastUpdated.getMonth()}/{lastUpdated.getDay()}
                </SmallText>
              </FlexCol>
            </div>
          );
        })}
      </LeftNav>
      <FlexCol margin='auto'>
        <H1>{visibleEntry?.title}</H1>
        <div>{visibleEntry?.markdown}</div>
        <Entry markdown={visibleEntry?.markdown} />
      </FlexCol>
    </FlexContainer>
  );
};

export default ListEntries;
