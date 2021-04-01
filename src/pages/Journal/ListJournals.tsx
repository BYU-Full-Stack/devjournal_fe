import React from 'react'

import styled from 'styled-components'

type ColumnType = {
    col: number;
    span?: number;
}

const TableWrapper = styled.div`
    display: grid;
    grid-template-columns: 20% 60% 20%;
    grid-template-rows: repeat(5, 25px);
    border: 2px solid white;
`;

const TableColumn = styled.div`
    grid-column: ${(props: ColumnType) => {
        let span = props.span !== undefined ? props.span : 1;
        return (
            props.col + " / span " + span
        )}
    };
    border: 2px solid red;
`;

const ListJournals = () => {

    return (
        <main>
            <h1>Journals</h1>
            <TableWrapper>
                <TableColumn col={1} span={4}>Journals</TableColumn>
                <TableColumn col={1}>
                    stuff
                </TableColumn>
                <TableColumn col={2}>
                    stuff
                </TableColumn>
                <TableColumn col={3}>
                    stuff
                </TableColumn>
            </TableWrapper>
        </main>
    )
};

export default ListJournals;