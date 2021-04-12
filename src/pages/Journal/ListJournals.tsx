import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons'

import styled from 'styled-components';
import { H1, theme, StyledLink } from './../../Styles';
import Icon from '../../components/Icon'
import {JournalType, JournalArray} from './Journal'
import { useEffect, useState } from 'react';
import EditJournal from './EditJournal';
import { Link, useRouteMatch } from 'react-router-dom';
import { RouteMatchType } from '../../Types';
import DeleteJournal from './DeleteJournal';

//////////////////  TYPES ///////////////////

type CellType = {
    col: number;
    span?: number;
    border?: string;
}

//////////////////  STYLED COMPONENTS ///////////////////
export const RowWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 50% repeat(2, 2fr) repeat(2, 125px);
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
    border: ${({ border = `2px solid ${theme['turq']}`}: CellType) => border};
    color: ${theme['white']};
    padding: 0.25em;
    padding-left: 0.75em;
`;

const JournalLink = styled(StyledLink)`
    color: ${theme['white']};
    &:hover {
        color: ${theme['blue-hover']};
        border-bottom: ${theme['white']} 2px solid;
    }
    display: initial;
`;

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
        <RowWrapper>
            <TableCell col={1}><br/>{color}</TableCell>
            <TableCell col={2}>
                <br/><JournalLink to={`/journals/${id}`}>{name}</JournalLink>
            </TableCell>
            <TableCell col={3}><br/>{dateCreated}</TableCell>
            <TableCell col={4}><br/>{lastUpdated}</TableCell>
            <TableCell col={5}>
                <Link to={`/journals/edit/${id}`}><Icon size="2x" icon={faEdit} /></Link>
            </TableCell>
            <TableCell col={6}>
                <Link to={`/journals/delete/${id}`}><Icon size="2x" icon={faTrashAlt} /></Link>
            </TableCell>
        </RowWrapper>

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
            <main>
                <H1>Journals</H1>
                <div>
                    <RowWrapper>
                        <TableCell col={5} span={2} border={""}>
                            <JournalLink to="/journals/create">Create New Journal</JournalLink>
                        </TableCell>
                    </RowWrapper>
                    <HeaderRow>
                        <TableCell col={1}></TableCell>
                        <TableCell col={2}>Journal Name</TableCell>
                        <TableCell col={3}>Date Created</TableCell>
                        <TableCell col={4}>Last Updated</TableCell>
                        <TableCell col={5}>Edit Journal</TableCell>
                        <TableCell col={6}>Delete Journal</TableCell>
                    </HeaderRow>
                    {props?.journals && props.journals.length > 0 &&
                        props.journals.map((journal, idx) =>
                            <JournalRow key={idx} {...journal} idx={idx} />
                        )
                    }
                </div>
            </main>
        )
    }
};

export default ListJournals;