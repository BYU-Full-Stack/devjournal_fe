import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getEntries, useUser } from '../../API/AppLogic';
import {
  FlexCol,
  FlexContainer,
  LeftNav,
  PrettyH2,
  H1,
  Button,
} from '../../Styles';
import Entry from '../Entry/Entry';
import { JournalType } from './Journal';
import Loading from '../../components/Loading';
import { Link } from 'react-router-dom';

//////////////////  TYPES ///////////////////

export type EntryType = {
  id?: string;
  journalId?: string;
  title?: string;
  markdown?: string;
  html?: string;
  dateCreated?: Date;
  lastUpdated?: Date | number;
  idx?: number;
};

type ListeEntriesProps = {
  username: string;
} & JournalType;
//////////////////  STYLED COMPONENTS ///////////////////

const SmallText = styled.span`
  font-size: 12px;
`;

//////////////////  COMPONENT ///////////////////

const ListEntries = ({ username, id, name }: ListeEntriesProps) => {
  const [entries, setEntries] = useState<EntryType[]>([]);
  const [visibleEntry, setVisibleEntry] = useState<EntryType>();
  const [user] = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    user.token &&
      (async function () {
        try {
          setIsLoading(true);
          const allEntries: EntryType[] = await getEntries(
            username,
            id,
            user.token
          );
          setEntries(allEntries.sort((a, b) =>
            (a.lastUpdated && b.lastUpdated)
              ?
              a.lastUpdated < b.lastUpdated ? 1 : -1
              : -1
          ));
          setVisibleEntry(allEntries[0]);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      })();
  }, [user.token, username, id]);

  useEffect(() => {
    const idx = entries.findIndex(
      ({ id = '' }: EntryType) => id === visibleEntry?.id
    );
    setVisibleEntry(entries[idx]);
  }, [entries, visibleEntry?.id]);

  const changeEntry = (idx: number) => {
    let entry = entries[idx];
    setVisibleEntry(entry);
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <FlexContainer wrap='wrap' height='100%'>
        <LeftNav width='15%'>
          <PrettyH2>{name} Journal Entries</PrettyH2>
          {entries.map(({ title, lastUpdated }, idx) => {
            lastUpdated = (lastUpdated !== undefined) ? new Date(lastUpdated) : undefined;
            lastUpdated?.setHours(lastUpdated.getHours() - 6);

            return (
              <div key={idx} onClick={() => changeEntry(idx)}>
                <FlexCol>{title}</FlexCol>
                <FlexCol>
                  <SmallText>
                    Updated {lastUpdated?.toLocaleDateString([], { month: 'long', day: 'numeric' })}
                  </SmallText>
                </FlexCol>
              </div>
            );
          })}
          <Link to={`/journals/${id}/entries/create${username ? `?u=${username}` : ''}`}>
            <Button>Create New Entry</Button>
          </Link>
        </LeftNav>
        <FlexCol width='80%' margin='1em'>
          {visibleEntry !== undefined ? (
            <>
              <H1>{visibleEntry.title}</H1>
              <Entry username={username} entry={visibleEntry} setEntries={setEntries} />
            </>
          ) : (
            <>
              <H1>No entry selected</H1>
              <div>-</div>
            </>
          )}
        </FlexCol>
      </FlexContainer>
    );
  }
};

export default ListEntries;
