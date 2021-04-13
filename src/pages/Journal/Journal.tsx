import { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { getJournals, useUser } from '../../API/AppLogic';
import ListJournals from './ListJournals';
import { RouteMatchType } from '../../Types';
import ListEntries from './ListEntries';
import Loading from '../../components/Loading';

export type JournalType = {
  id?: string;
  name?: string;
  color?: string;
  dateCreated?: Date;
  lastUpdated?: Date;
  user_id?: string;
  idx?: number;
};

export type JournalArray = {
  journals: JournalType[];
  setJournals: Function;
};

//////////////////  COMPONENT ///////////////////
const Journal = () => {
  let match: RouteMatchType | null;
  match = useRouteMatch({
    path: '/journals/:id',
    strict: true,
    sensitive: true,
  });

  const [journals, setJournals] = useState<JournalType[]>([]);
  const [user] = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const routeHistory = useHistory();

  useEffect(() => {
    user.token &&
      (async function () {
        try {
          setIsLoading(true);
          const allJournals: JournalType[] = await getJournals(
            user.username,
            user.token
          );
          setJournals(allJournals);
          setIsLoading(false);
        } catch (err) {
          //    TODO: handle errors better than this
          routeHistory.push('/error');
          console.log('error', err);
        }
      })();
  }, [routeHistory, user.token, user.username]);

  let journal: JournalType | undefined;
  journal = Object.values(journals).find(
    (x: JournalType) => x?.id === match?.params?.id
  );

  if (isLoading) {
    return <Loading />;
  } else {
    if (journal === undefined) {
      return <ListJournals setJournals={setJournals} journals={journals} />;
    } else {
      return <ListEntries {...journal} />;
    }
  }
};

export default Journal;
