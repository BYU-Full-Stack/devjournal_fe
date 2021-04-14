import { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import { getEntries, getJournals, useAlertBox, useUser } from "../../API/AppLogic";
import ListJournals from './ListJournals';
import { RouteMatchType } from '../../Types'
import ListEntries from "./ListEntries";
import Loading from "../../components/Loading";

//////////////////  TYPES ///////////////////
export type JournalType = {
    id?: string,
    name?: string,
    color?: string,
    dateCreated?: Date | string,
    lastUpdated?: Date | string,
    user_id?: string,
    idx?: number,
    numEntries?: number,
}

export type JournalArray = {
    journals: JournalType[],
    setJournals: Function,
}

//////////////////  COMPONENT ///////////////////
const Journal = () => {
    let match: RouteMatchType | null;
    match = useRouteMatch({
        path: "/journals/:id",
        strict: true,
        sensitive: true
    })

    const [journals, setJournals] = useState<JournalType[]>([]);
    const [user] = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const routeHistory = useHistory();
    const [, addAlert] = useAlertBox();

    useEffect(() => {
        user.token && (async function () {
            try {
                setIsLoading(true);
                let promises: any[] = [];

                let allJournals = await getJournals(user.username, user.token);

                promises = allJournals.map(async (x: JournalType) => {
                    return (
                        getEntries(user.username, x.id, user.token)
                    )
                })

                Promise.all(promises).then((values) => {
                    const newJournals = allJournals.map((journal: any, idx: number) => {
                        return ({
                            ...journal,
                            numEntries: values[idx].length
                        })
                    })

                    setJournals(newJournals);
                    setIsLoading(false);
                });
            } catch (err) {
                addAlert({
                    key: `get-journals-attempt-${new Date()}`,
                    text: 'Unable to Retrieve Journals.',
                    timeout: 7,
                    theme: 'error'
                });
                routeHistory.push("/error");
            }
        })();
    }, [addAlert, routeHistory, user.token, user.username]);

    let journal : JournalType | undefined;
    journal = Object.values(journals).find((x: JournalType) => x?.id === match?.params?.id);

    if (isLoading) {
        return (
            <Loading/>
        )
    } else {
        if (journal === undefined) {
            return (
                <ListJournals setJournals={setJournals} journals={journals}/>
            )
        } else {
            return (
                <ListEntries {...journal}/>
            )
        }
    }
}

export default Journal;