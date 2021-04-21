import { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { RouteMatchType } from '../../Types';

import {
  getEntries,
  getJournals,
  useAlertBox,
  useUser
} from '../../API/AppLogic';
import ListJournals from './ListJournals';
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
  const match: RouteMatchType | null = useRouteMatch('/:username/journals/:id?');
  const routeHistory = useHistory();

  const [, addAlert] = useAlertBox();
  const [user] = useUser();
  const [username, setUsername] = useState(match?.params?.username || user.username);

  const [journals, setJournals] = useState<JournalType[]>([]);
  const [journal, setJournal] = useState<JournalType | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(true);

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
  }, [addAlert, routeHistory, user.token, username]);

  useEffect(() => {
    setUsername(match?.params?.username || user.username)
    // eslint-disable-next-line
  }, [match?.params?.username]);

  useEffect(() =>
    setJournal(
      Object.values(journals).find(
        ({ id = '' }: JournalType) => id === match?.params?.id
      )
    ), [match?.params, journals]);

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
