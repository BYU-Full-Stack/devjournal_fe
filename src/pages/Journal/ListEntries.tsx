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
  lastUpdated?: Date;
  idx?: number;
};

//////////////////  STYLED COMPONENTS ///////////////////

const SmallText = styled.span`
  font-size: 12px;
`;

//////////////////  COMPONENT ///////////////////

const ListEntries = (props: JournalType) => {
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
            user.username,
            props.id,
            user.token
          );
          setEntries(allEntries);
          setVisibleEntry(allEntries[0]);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      })();
  }, [user.token, user.username, props.id]);

  useEffect(() => {
    const idx = entries.findIndex(
      ({ id = '' }: EntryType) => id === visibleEntry?.id
    );
    setVisibleEntry(entries[idx]);
  }, [entries]);

  const changeEntry = (props: number) => {
    let entry = entries[props];
    setVisibleEntry(entry);
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <FlexContainer wrap='wrap' height='100%'>
        <LeftNav width='15%'>
          <PrettyH2>{props.name} Journal Entries</PrettyH2>
          {entries.map(({ title, lastUpdated }, idx) => {
            let displayLastUpdated = new Date();
            let checkDate: Date;
            if (lastUpdated !== undefined) {
              checkDate = new Date(lastUpdated.toString());
            } else {
              checkDate = new Date();
            }
            displayLastUpdated = checkDate;
            return (
              <div key={idx} onClick={() => changeEntry(idx)}>
                <FlexCol>{title}</FlexCol>
                <FlexCol>
                  <SmallText>
                    Updated {displayLastUpdated.getMonth()}/
                    {displayLastUpdated.getDay()}
                  </SmallText>
                </FlexCol>
              </div>
            );
          })}
          <Link to={`/journals/${props.id}/entries/create`}>
            <Button>Create New Entry</Button>
          </Link>
        </LeftNav>
        <FlexCol width='80%' margin='1em'>
          {visibleEntry !== undefined ? (
            <>
              <H1>{visibleEntry.title}</H1>
              <Entry entry={visibleEntry} setEntries={setEntries} />
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
