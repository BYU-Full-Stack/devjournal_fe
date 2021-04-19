import { useEffect, useState } from 'react';
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom';

import {
  getEntries,
  getJournals,
  useAlertBox,
  useUser,
  useQuery
} from '../../API/AppLogic';
import ListJournals from './ListJournals';
import { RouteMatchType } from '../../Types';
import ListEntries from './ListEntries';
import Loading from '../../components/Loading';

export type JournalType = {
  id?: string;
  name?: string;
  color?: string;
  dateCreated?: Date | string;
  lastUpdated?: Date | string;
  user_id?: string;
  idx?: number;
  numEntries?: number;
};

export type ListJournalsProps = {
  journals: JournalType[];
  setJournals: Function;
  username: string;
};

//////////////////  COMPONENT ///////////////////
const Journal = () => {
  let match: RouteMatchType | null;
  match = useRouteMatch({
    path: '/journals/:id',
    strict: true,
    sensitive: true,
  });
  const query = useQuery(useLocation().search);
  const [user] = useUser();
  const [journals, setJournals] = useState<JournalType[]>([]);
  const [username, setUsername] = useState(query.get('u') || user.username);
  const [isLoading, setIsLoading] = useState(true);
  const routeHistory = useHistory();
  const [, addAlert] = useAlertBox();

  useEffect(() => {
    user.token &&
      (async function () {
        try {
          setIsLoading(true);
          const allJournals = await getJournals(username, user.token);

          const promises: any[] = allJournals.map(async ({ id = '' }: JournalType) =>
            getEntries(username, id, user.token));

          Promise.all(promises).then((values: any[]) => {
            const newJournals = allJournals.map((journal: any, idx: number) => {
              return {
                ...journal,
                numEntries: values[idx].length,
              };
            });

            setJournals(newJournals);
            setIsLoading(false);
          });
        } catch (err) {
          addAlert({
            key: `get-journals-attempt-${new Date()}`,
            text: 'Unable to Retrieve Journals.',
            timeout: 7,
            theme: 'error',
          });
          routeHistory.push('/error');
        }
      })();
  }, [addAlert, routeHistory, user.token, query, username]);

  useEffect(() => {
    setUsername(query.get('u') || user.username)
  }, [query, user.username]);

  let journal: JournalType | undefined;
  journal = Object.values(journals).find(
    (x: JournalType) => x?.id === match?.params?.id
  );

  if (isLoading) {
    return <Loading />;
  } else {
    if (journal === undefined) {
      return <ListJournals username={username} setJournals={setJournals} journals={journals} />;
    } else {
      return <ListEntries username={username} {...journal} />;
    }
  }
};

export default Journal;
