import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import { theme } from './../../Styles';
import { getJournals, useUser } from '../../API/AppLogic';
import ListJournals from './ListJournals';
import { RouteMatchType } from '../../Types';
import ListEntries from './ListEntries';

export type JournalType = {
  id: string;
  name?: string;
  color?: string;
  dateCreated?: Date;
  lastUpdated?: Date;
  user_id?: string;
};

export type JournalArray = {
  journals?: JournalType[];
};

type CellType = {
  col: number;
  span?: number;
};

export const RowWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 50% repeat(2, 2fr) 125px;
`;

export const HeaderRow = styled(RowWrapper)`
  font-weight: bold;
`;

export const TableCell = styled.div`
  grid-column: ${(props: CellType) => {
    let span = props.span !== undefined ? props.span : 1;
    return props.col + ' / span ' + span;
  }};
  border: 2px solid ${theme['turq']};
  color: ${theme['white']};
  padding: 0.25em;
  padding-left: 0.75em;
`;

const Journal = () => {
  let match: RouteMatchType | null;
  match = useRouteMatch({
    path: '/journals/:id',
    strict: true,
    sensitive: true,
  });
  console.log(match);

  const [journals, setJournals] = useState([]);
  const [user] = useUser();

  useEffect(() => {
    user.token &&
      (async function () {
        try {
          const allJournals: [] = await getJournals(user.username, user.token);
          setJournals(allJournals);
        } catch (err) {
          console.log(err);
        }
      })();
  }, [user.token, user.username]);

  let journal: JournalType | undefined;
  journal = Object.values(journals).find(
    (x: JournalType) => x?.id === match?.params?.id
  );
  console.log(journal);

  if (journal === undefined) {
    return <ListJournals journals={journals} />;
  } else {
    return <ListEntries {...journal} />;
  }
};

export default Journal;
