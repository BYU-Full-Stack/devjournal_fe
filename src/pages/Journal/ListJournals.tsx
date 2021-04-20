import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faSort } from '@fortawesome/free-solid-svg-icons'

import styled from 'styled-components';
import { H1, theme, Button, Main, StyledLink } from './../../Styles';
import Icon from '../../components/Icon/Icon'
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons'
import { JournalType, ListJournalsProps } from './Journal'
import { useEffect, useState } from 'react';
import EditJournal from './EditJournal';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { RouteMatchType } from '../../Types';
import DeleteJournal from './DeleteJournal';

//////////////////  TYPES ///////////////////

type CellType = {
    col?: number;
    span?: number;
    border?: string;
    alignSelf?: string;
    justifySelf?: string;
    backgroundColor?: string;
    paddingleft?: string;
    pointOnHover?: boolean;
}

export type dateType = {
    weekday?: "short",
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour?: '2-digit',
    minute?: '2-digit'
}

//////////////////  STYLED COMPONENTS ///////////////////
export const RowWrapper = styled.div`
    display: grid;
    //grid-template-columns: 1fr 15% 25% repeat(2, 3fr) repeat(2, 125px);
    grid-template-columns: 1fr 3fr 5fr repeat(2, 3fr) repeat(2, 2fr);
    align-items: flex-end;
    //border: ${({ border = `1.5px solid ${theme['turq']}` }: CellType) => border};
    border-bottom: ${({ border = `1.5px solid ${theme['turq']}` }: CellType) => border};
    border-left: ${({ border = `3px solid ${theme['turq']}` }: CellType) => border};
    border-right: ${({ border = `3px solid ${theme['turq']}` }: CellType) => border};
    &:nth-child(2) {
        border-top: ${({ border = `3px solid ${theme['turq']}` }: CellType) => border};
        border-bottom: ${({ border = `2.5px solid ${theme['turq']}` }: CellType) => border};
    }
    &:last-child {
        border-bottom: ${({ border = `3px solid ${theme['turq']}` }: CellType) => border};
    }
    border-radius: 10px;
    overflow: hidden;
`;

export const HeaderRow = styled(RowWrapper)`
    font-weight: bold;
`;

export const TableCell = styled.div`
    grid-column: ${(props: CellType) => {
        let span = props.span !== undefined ? props.span : 1;
        return (
            props.col + " / span " + span
        )
    }
    };
    align-self: ${({ alignSelf = 'unset' }: CellType) => alignSelf};
    justify-self: ${({ justifySelf = 'unset' }: CellType) => justifySelf};
    background-color: ${({ backgroundColor = 'unset' }: CellType) => backgroundColor};
    color: ${theme['white']};
    padding: 0.5em;
    padding-left: ${({ paddingleft = '0.75em' }: CellType) => paddingleft};
    cursor: ${({ pointOnHover = false }: CellType) => pointOnHover ? 'pointer' : 'default'};
`;

//////////////////  COMPONENT ///////////////////

const ListJournals = ({ username, setJournals, journals }: ListJournalsProps) => {
    const editMatch: RouteMatchType | null = useRouteMatch({
        path: "/:username/journals/edit/:id",
        strict: true,
        sensitive: true
    })

    const deleteMatch: RouteMatchType | null = useRouteMatch({
        path: "/:username/journals/delete/:id",
        strict: true,
        sensitive: true
    })

    const [journalBeingEdited, setJournalBeingEdited] = useState<JournalType>()
    const [journalBeingDeleted, setJournalBeingDeleted] = useState<JournalType>()
    const [listJournals, setListJournals] = useState(journals);
    const [nameSort, setNameSort] = useState(false);
    const [numEntriesSort, setNumEntriesSort] = useState(false);
    const [dateCreatedSort, setDateCreatedSort] = useState(false);
    const [lastUpdatedSort, setLastUpdatedSort] = useState(false);
    const routeHistory = useHistory();

    useEffect(() => setListJournals(journals), [journals]);

    useEffect(() => {
        const journal: JournalType | undefined =
            Object.values(journals).find(({ id = '' }: JournalType) =>
                id === editMatch?.params?.id);
        setJournalBeingEdited(journal);
    }, [editMatch, journals])

    useEffect(() => {
        const journal: JournalType | undefined =
            Object.values(journals).find(({ id = '' }: JournalType) =>
                id === deleteMatch?.params?.id);
        setJournalBeingDeleted(journal);
    }, [deleteMatch, journals])

    const handleSort = (field: "name" | "numEntries" | "dateCreated" | "lastUpdated", sort: boolean) => {
        setListJournals(
            listJournals.sort((a, b) => (
                ((a[field] || a[field] === 0) && (b[field] || b[field] === 0))
                    ?
                    (sort)
                        ?
                        (a[field]! > b[field]!) ? 1 : -1
                        :
                        (a[field]! < b[field]!) ? 1 : -1
                    :
                    -1
            ))
        );
    }

    const JournalRow = ({ id, name, color, dateCreated, lastUpdated, numEntries, user_id, idx }: JournalType) => {
        lastUpdated = (lastUpdated !== undefined) ? new Date(lastUpdated) : undefined;
        dateCreated = (dateCreated !== undefined) ? new Date(dateCreated) : undefined;

        lastUpdated?.setHours(lastUpdated.getHours() - 6);
        dateCreated?.setHours(dateCreated.getHours() - 6);
        let createdDateOptions: dateType = { year: 'numeric', month: 'long', day: 'numeric' };
        let updatedDateOptions: dateType = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };

        return (
            <section>
                <RowWrapper>
                    <TableCell col={1} pointOnHover={true} backgroundColor={color} alignSelf={"normal"} onClick={() => routeHistory.push(`/journals/${id}`)}></TableCell>
                    <TableCell col={2} paddingleft={"1.75em"}>
                        <StyledLink to={`/${username}/journals/${id}`}>
                            {name}
                            <Icon size='1x' color='blue-hover' hcolor='blue-hover' icon={faExternalLinkSquareAlt}></Icon>
                        </StyledLink>
                    </TableCell>
                    <TableCell col={3} justifySelf={"center"}>{numEntries}</TableCell>
                    <TableCell col={4}>{dateCreated?.toLocaleString([], createdDateOptions)}</TableCell>
                    <TableCell col={5}>{lastUpdated?.toLocaleString([], updatedDateOptions)}</TableCell>
                    <TableCell col={6} justifySelf={"center"}>
                        <Icon onClick={() => routeHistory.push(`/${username}/journals/edit/${id}`)} size="2x" icon={faEdit} />
                    </TableCell>
                    <TableCell col={7} justifySelf={"center"}>
                        <Icon onClick={() => routeHistory.push(`/${username}/journals/delete/${id}`)} size="2x" icon={faTrashAlt} />
                    </TableCell>
                </RowWrapper>
            </section >
        )
    };

    if (journalBeingEdited) {
        return (
            <EditJournal username={username} journal={journalBeingEdited} setJournals={setJournals} />
        )
    } else if (journalBeingDeleted) {
        return (
            <DeleteJournal username={username} journal={journalBeingDeleted} setJournals={setJournals} />
        )
    } else {
        return (
            <Main>
                <RowWrapper border={""}>
                    <TableCell col={1} span={3}>
                        <H1>Journals</H1>
                    </TableCell>
                    <TableCell col={5} span={3} alignSelf={"center"} justifySelf={"flex-end"}>
                        <Link to={`/${username}/journals/create`}>
                            <Button
                                bgColor="bg-dark"
                                padding=".4em 1em"
                                border="transparent 2px solid"
                                hoverBorder="turq 2px solid"
                            >Create New Journal</Button>
                        </Link>
                    </TableCell>
                </RowWrapper>
                <HeaderRow>
                    <TableCell col={1}></TableCell>
                    <TableCell col={2} paddingleft={"1.75em"}>Journal Name<Icon size={"lg"} icon={faSort} onClick={() => { setNameSort(!nameSort); handleSort("name", nameSort); }} paddingleft={"inherit"} /></TableCell>
                    <TableCell col={3} justifySelf={"center"}>Number of Entries<Icon size={"lg"} icon={faSort} onClick={() => { setNumEntriesSort(!numEntriesSort); handleSort("numEntries", numEntriesSort); }} paddingleft={"inherit"} /></TableCell>
                    <TableCell col={4}>Date Created<Icon size={"lg"} icon={faSort} onClick={() => { setDateCreatedSort(!dateCreatedSort); handleSort("dateCreated", dateCreatedSort); }} paddingleft={"inherit"} /></TableCell>
                    <TableCell col={5}>Last Updated<Icon size={"lg"} icon={faSort} onClick={() => { setLastUpdatedSort(!lastUpdatedSort); handleSort("lastUpdated", lastUpdatedSort); }} paddingleft={"inherit"} /></TableCell>
                    <TableCell col={6} justifySelf={"center"}>Edit Journal</TableCell>
                    <TableCell col={7} justifySelf={"center"}>Delete Journal</TableCell>
                </HeaderRow>
                {
                    listJournals && listJournals.length > 0 &&
                    listJournals.map((journal, idx) =>
                        <JournalRow key={idx} {...journal} idx={idx} />
                    )
                }
            </Main >
        )
    }
};

export default ListJournals;