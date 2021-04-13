import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons'

import styled from 'styled-components';
import { H1, theme, StyledLink, Button, Main } from './../../Styles';
import Icon from '../../components/Icon'
import {JournalType, JournalArray} from './Journal'
import React, { useEffect, useState } from 'react';
import EditJournal from './EditJournal';
import { Link, useRouteMatch } from 'react-router-dom';
import { RouteMatchType } from '../../Types';
import DeleteJournal from './DeleteJournal';
import { string } from 'yargs';

//////////////////  TYPES ///////////////////

type CellType = {
    col?: number;
    span?: number;
    border?: string;
    alignSelf?: string;
    justifySelf?: string;
    backgroundColor?: string;
}

//////////////////  STYLED COMPONENTS ///////////////////
export const RowWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 40% repeat(2, 3fr) repeat(2, 125px);
    align-items: flex-end;
    border: ${({ border = `1.5px solid ${theme['turq']}`}: CellType) => border};
    //border-bottom: ${({ border = `1.5px solid ${theme['turq']}`}: CellType) => border};
    /* border-left: ${({ border = `3px solid ${theme['turq']}`}: CellType) => border};
    border-right: ${({ border = `3px solid ${theme['turq']}`}: CellType) => border}; */
    &:nth-child(2) {
        border-top: ${({ border = `3px solid ${theme['turq']}`}: CellType) => border};
        //border-bottom: ${({ border = `2.5px solid ${theme['turq']}`}: CellType) => border};
    }
    &:last-child {
        border-bottom: ${({ border = `3px solid ${theme['turq']}`}: CellType) => border};
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
        )}
    };
    align-self: ${({ alignSelf = 'unset'}: CellType) => alignSelf};
    justify-self: ${({ justifySelf = 'unset'}: CellType) => justifySelf};
    background-color: ${({ backgroundColor = 'unset'}: CellType) => backgroundColor};
    color: ${theme['white']};
    padding: 0.5em;
    padding-left: 0.75em;
`;

const JournalLink = styled(StyledLink)`
    color: ${theme['white']};
    &:hover {
        color: ${theme['blue-hover']};
        border-bottom: ${theme['white']} 2px solid;
    }
    display: initial;
    margin: 0;
`;

const RowLink = styled(Link)`
    text-decoration: unset;
`

//////////////////  COMPONENT ///////////////////

const ListJournals = (props: JournalArray) => {
    let editMatch: RouteMatchType | null;
    editMatch = useRouteMatch({
        path: "/journals/edit/:id",
        strict: true,
        sensitive: true
    })

    let deleteMatch: RouteMatchType | null;
    deleteMatch = useRouteMatch({
        path: "/journals/delete/:id",
        strict: true,
        sensitive: true
    })

    const [journalBeingEdited, setJournalBeingEdited] = useState<JournalType>()
    const [journalBeingDeleted, setJournalBeingDeleted] = useState<JournalType>()

    useEffect(() => {
        let journal : JournalType | undefined
        journal = Object.values(props.journals).find((x: JournalType) => x?.id === editMatch?.params?.id);
        setJournalBeingEdited(journal);
    }, [editMatch, props.journals])

    useEffect(() => {
        let journal : JournalType | undefined
        journal = Object.values(props.journals).find((x: JournalType) => x?.id === deleteMatch?.params?.id);
        setJournalBeingDeleted(journal);
    }, [deleteMatch, props.journals])

    const JournalRow = ({id, name, color, dateCreated, lastUpdated, user_id, idx}: JournalType) =>
        <RowLink to={`/journals/${id}`}>
            <RowWrapper>
                <TableCell col={1} backgroundColor={color} alignSelf={"normal"}></TableCell>
                <TableCell col={2}>
                    <JournalLink to={`/journals/${id}`}>{name}</JournalLink>
                </TableCell>
                <TableCell col={3}>{dateCreated}</TableCell>
                <TableCell col={4}>{lastUpdated}</TableCell>
                <TableCell col={5} justifySelf={"center"}>
                    <Link to={`/journals/edit/${id}`}><Icon size="2x" icon={faEdit} /></Link>
                </TableCell>
                <TableCell col={6} justifySelf={"center"}>
                    <Link to={`/journals/delete/${id}`}><Icon size="2x" icon={faTrashAlt} /></Link>
                </TableCell>
            </RowWrapper>
        </RowLink>

    if (journalBeingEdited) {
        return (
            <EditJournal journal={journalBeingEdited} setJournals={props.setJournals} />
        )
    } else if (journalBeingDeleted) {
        return (
            <DeleteJournal journal={journalBeingDeleted} setJournals={props.setJournals} />
        )
    } else {
        return (
            <Main>
                <RowWrapper border={""}>
                    <TableCell col={1} span={3}>
                        <H1>Journals</H1>
                    </TableCell>
                    <TableCell col={5} span={3} alignSelf={"center"} justifySelf={"flex-end"}>
                        <Link to="/journals/create">
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
                    <TableCell col={2}>Journal Name</TableCell>
                    <TableCell col={3}>Date Created</TableCell>
                    <TableCell col={4}>Last Updated</TableCell>
                    <TableCell col={5} justifySelf={"center"}>Edit Journal</TableCell>
                    <TableCell col={6} justifySelf={"center"}>Delete Journal</TableCell>
                </HeaderRow>
                {props?.journals && props.journals.length > 0 &&
                    props.journals.map((journal, idx) =>
                        <JournalRow key={idx} {...journal} idx={idx} />
                    )
                }
            </Main>
        )
    }
};

export default ListJournals;