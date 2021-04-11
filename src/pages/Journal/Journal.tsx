import { useEffect, useState } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { FlexContainer} from "../../Styles";
import Icon from "../../components/Icon";
import { getJournals, useUser } from "../../API/AppLogic";
import ListJournals from './ListJournals';
import { RouteMatchType } from '../../Types'
import ListEntries from "./ListEntries";

//////////////////  TYPES ///////////////////
export type JournalType = {
    id?: string,
    name?: string,
    color?: string,
    dateCreated?: Date,
    lastUpdated?: Date,
    user_id?: string,
    idx?: number,
}

export type JournalArray = {
    journals: JournalType[],
    setJournals: Function,
}

//////////////////  FUNCTION ///////////////////
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

    useEffect(() => {
        user.token && (async function () {
            try {
                setIsLoading(true);
                const allJournals: JournalType[] = await getJournals(user.username, user.token);
                setJournals(allJournals);
                setIsLoading(false);
            } catch (err) {
                //    TODO: handle errors better than this
                <Redirect push to={{
                    pathname: "/error",
                    state: { err: err }
                  }}/>
                console.log("error", err);
            }
        })();
    }, [user.token, user.username]);

    let journal : JournalType | undefined;
    journal = Object.values(journals).find((x: JournalType) => x?.id === match?.params?.id);

    if (isLoading) {
        return (
            <FlexContainer justify={"center"} align={"center"} height={"500px"}>
                <Icon size={"4x"} icon={faSpinner} spin={true}></Icon>
            </FlexContainer>
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