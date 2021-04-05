import { faEdit } from '@fortawesome/free-regular-svg-icons'

import styled from 'styled-components';
import { H1, theme, StyledLink } from './../../Styles';
import Icon from '../../components/Icon'
import {JournalType, JournalArray, RowWrapper, HeaderRow, TableCell} from './Journal'

const JournalLink = styled(StyledLink)`
    color: ${theme['white']};
    &:hover {
        color: ${theme['blue-hover']};
        border-bottom: ${theme['white']} 2px solid;
    }
    display: initial;
`;

const ListJournals = (props: JournalArray) => {

    const handleJournalEdit = () => {
        console.log("editing")
    }

    const JournalRow = ({id, name, color, dateCreated, lastUpdated}: JournalType & { idx: number }) =>
        <RowWrapper>
                <TableCell col={1}><br/>{color}</TableCell>
                <TableCell col={2}>
                    <br/><JournalLink to={`/journals/${id}`}>{name}</JournalLink>
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
                {props?.journals && props.journals.length > 0 &&
                    props.journals.map((journal, idx) =>
                        <JournalRow key={idx} {...journal} idx={idx} />
                    )
                }
            </div>
        </main>
    )
};

export default ListJournals;