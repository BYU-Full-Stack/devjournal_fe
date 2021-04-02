import { useEffect, useState } from "react";
import styled from "styled-components";
import { getEntries, useUser } from "../../API/AppLogic";
import { FlexCol, FlexContainer, LeftNav, PrettyH2, H1} from "../../Styles";
import { JournalType } from "./Journal";

type EntryType = {
    id: string,
    journalId: string,
    title: string,
    markdown: string,
    html: string,
    dateCreated: Date,
    lastUpdated: Date,
}

const SmallText = styled.span`
    font-size: 12px;
`;

const ListEntries = (props: JournalType) => {
    //console.log("props:" + props);

    const [entries, setEntries] = useState<EntryType[]>([]);
    const [visibleEntry, setVisibleEntry] = useState<EntryType>();
    const [user] = useUser();

    useEffect(() => {
        user.token && (async function () {
            try {
                const allEntries: EntryType[] = await getEntries(user.username, props.id, user.token);
                setEntries(allEntries);
                //console.log(allEntries[0]);
                //if (allEntries.length !== 0) { console.log(allEntries[0]) }
                setVisibleEntry(allEntries[0]);
            } catch (err) {
                //    TODO: handle errors better than this
                console.log(err);
            }
        })();
    }, [user.token, user.username, props.id]);

const changeEntry = (props: number) => {
    let entry = entries[props];
    setVisibleEntry(entry);
}

    return (
        <FlexContainer wrap="wrap" height="100%">
            <LeftNav width="15%">
                <PrettyH2>{props.name} Journal Entries</PrettyH2>
                {entries?.map(({ title, lastUpdated }, idx) => {
                    lastUpdated = new Date(lastUpdated);

                    return(
                        <div key={idx} onClick={() => changeEntry(idx)}>
                            <FlexCol>{title}</FlexCol>
                            <FlexCol><SmallText>Updated {lastUpdated.getMonth()}/{lastUpdated.getDay()}</SmallText></FlexCol>
                        </div>
                    )}
                )}
            </LeftNav>
            <FlexCol margin="auto">
                <H1>{visibleEntry?.title}</H1>
                <div>{visibleEntry?.markdown}</div>
            </FlexCol>
        </FlexContainer>
    )
}

export default ListEntries;