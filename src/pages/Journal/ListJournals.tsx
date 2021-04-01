import React, {useState, useEffect} from 'react'
import { useUser, getJournals } from '../../API/AppLogic'

import { faEdit } from '@fortawesome/free-regular-svg-icons'

import styled from 'styled-components';
import { H1, theme, StyledLink } from './../../Styles';
import Icon from '../../components/Icon'

type CellType = {
    col: number;
    span?: number;
}

type JournalType = {
    id?: string,
    name?: string,
    color?: string,
    dateCreated?: Date,
    lastUpdated?: Date,
    user_id?: string,
}

const RowWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 50% repeat(2, 2fr) 125px;
`;

const HeaderRow = styled(RowWrapper)`
    font-weight: bold;
`;

const TableCell = styled.div`
    grid-column: ${(props: CellType) => {
        let span = props.span !== undefined ? props.span : 1;
        return (
            props.col + " / span " + span
        )}
    };
    border: 2px solid ${theme['turq']};
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

const ListJournals = () => {
    const [journals, setJournals] = useState([]);
    const [user] = useUser();

    useEffect(() => {
        user.token && (async function () {
            try {
                const allJournals: [] = await getJournals(user.username, user.token);
                setJournals(allJournals);
            } catch (err) {
                //    TODO: handle errors better than this
                console.log(err);
            }
        })();
    }, [user.token, user.username]);

    const handleJournalEdit = () => {
        console.log("editing")
    }

    const JournalRow = ({id, name, color, dateCreated, lastUpdated}: JournalType & { idx: number }) =>
        <RowWrapper>
                <TableCell col={1}><br/>{color}</TableCell>
                <TableCell col={2}>
                    <br/><JournalLink to="/">{name}</JournalLink>
                </TableCell>
                <TableCell col={3}><br/>{dateCreated}</TableCell>
                <TableCell col={4}><br/>{lastUpdated}</TableCell>
            <TableCell col={5}>
                <Icon size="2x" icon={faEdit} onClick={() => handleJournalEdit()} />
            </TableCell>
        </RowWrapper>

    return (
        <main>
            <H1>Journals</H1>
            <div>
                <TableCell col={1} span={6}>Journals</TableCell>
                <HeaderRow>
                    <TableCell col={1}></TableCell>
                    <TableCell col={2}>Journal Name</TableCell>
                    <TableCell col={3}>Date Created</TableCell>
                    <TableCell col={4}>Last Updated</TableCell>
                    <TableCell col={5}>Edit Journal</TableCell>
                </HeaderRow>
                {journals.length > 0 &&
                    journals.map((journal, idx) =>
                        <JournalRow key={idx} {...journal} idx={idx} />
                    )
                }
            </div>
        </main>
    )
};

export default ListJournals;