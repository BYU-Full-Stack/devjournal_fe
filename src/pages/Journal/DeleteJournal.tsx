import React, { useLayoutEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { deleteJournal, useAlertBox, useUser } from "../../API/AppLogic";
import Loading from "../../components/Loading";
import { Button, FlexCol, FlexContainer, H1, H3, Main } from "../../styles/GlobalStyles";
import { JournalType } from "./Journal";
import { dateType } from "./ListJournals";

//////////////////  TYPES ///////////////////

type Props = {
    journal: JournalType;
    setJournals: Function;
    username: string;
}

type CellType = {
    col: number;
    colSpan?: number;
    row: number;
    rowSpan?: number;
}

//////////////////  STYLED COMPONENTS ///////////////////
export const Wrapper = styled.div`
    display: grid;
    grid-template: repeat(6, 1fr) / 30% 70%;
    border: 2px white solid;
`;

export const TableCell = styled.div`
    grid-column: ${(props: CellType) => {
        let span = props.colSpan !== undefined ? props.colSpan : 1;
        return (
            props.col + " / span " + span
        )
    }
    };
    grid-row: ${(props: CellType) => {
        let span = props.rowSpan !== undefined ? props.rowSpan : 1;
        return (
            props.row + " / span " + span
        )
    }
    };
    padding: 0.75em 0.25em 0.75em 0.75em;
    //padding-left: 0.75em;
    &:nth-child(n + 2) {
        &:not(:nth-child(8)) {
            border-top: 2px white solid;
        }
    }
`;

//////////////////  COMPONENT ///////////////////

const DeleteJournal = ({ username, journal, setJournals = () => { } }: Props) => {
    const saveButtonRef = useRef<HTMLButtonElement>(null)

    const [isLoading, setIsLoading] = useState(false);
    const [userDeleting, setUserDeleting] = useState(false);
    const [user] = useUser();
    const [, addAlert] = useAlertBox();
    const routeHistory = useHistory();

    const fieldNames = ["ID", "UserID", "Journal Name", "Color", "Date Created", "Last Updated", "Number of Entries"];

    useLayoutEffect(() => {
        journal.lastUpdated = (journal.lastUpdated !== undefined) ? new Date(journal.lastUpdated) : undefined;
        journal.dateCreated = (journal.dateCreated !== undefined) ? new Date(journal.dateCreated) : undefined;

        let dateOptions: dateType = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };

        journal.lastUpdated?.setHours(journal.lastUpdated.getHours() - 6);
        journal.dateCreated?.setHours(journal.dateCreated.getHours() - 6);

        journal.lastUpdated = journal.lastUpdated?.toLocaleString([], dateOptions);
        journal.dateCreated = journal.dateCreated?.toLocaleString([], dateOptions);
    }, [journal]);

    const deleteJournalHandler = async () => {
        try {
            saveButtonRef!.current && (saveButtonRef!.current.disabled = true);
            //show loading
            setIsLoading(true);
            setUserDeleting(true);
            await deleteJournal(username, journal.id, user.token)

            setJournals((prevState: Array<JournalType>) => {
                let deleteIdx = prevState.findIndex((x) => x.id === journal.id);

                return (
                    [...prevState.slice(0, deleteIdx),
                    ...prevState.slice(deleteIdx + 1)]
                )
            });

            saveButtonRef!.current && (saveButtonRef!.current.disabled = false);
            //take off loading
            setIsLoading(false);
            setUserDeleting(false);
            routeHistory.goBack();
            addAlert({
                id: `delete-${journal.name}-attempt`,
                text: `Successfully deleted your ${journal.name} Journal`,
                timeout: 4,
                theme: 'success'
            });
        } catch (err) {
            addAlert({
                id: `delete-journal-attempt`,
                text: 'Unable to Delete Journal.',
                timeout: 7,
                theme: 'error'
            });
            routeHistory.push("/error");
            saveButtonRef!.current && (saveButtonRef!.current.disabled = false);
        }
    }

    return (
        <Main>
            <br /><br />
            <FlexContainer height="100%" border="2px white solid">
                <FlexCol margin="auto" maxWidth={"100%"} width="40em">
                    <H1 self-align="center">Are You Sure You Want to Delete Your "{journal?.name}" Journal?</H1>
                    <Wrapper>
                        {fieldNames.map((field, i) => {
                            return (
                                <TableCell col={1} row={i + 1} key={i}>
                                    <H3 display="inline" >{field} : </H3>
                                </TableCell>
                            )
                        })}
                        {Object.entries(journal).map((field, i) => {
                            return (
                                <TableCell col={2} row={i + 1} key={i}>
                                    <span>{field[1]}</span>
                                </TableCell>
                            )
                        })}
                    </Wrapper>
                    <FlexContainer justify="space-evenly" margin="1em 10em">
                        <Button
                            bgColor="bg-dark"
                            padding=".4em 1em"
                            border="transparent 2px solid"
                            hoverBorder="turq 2px solid"
                            onClick={() => routeHistory.goBack()}
                        >Back to Journals</Button>
                        <Button
                            ref={saveButtonRef}
                            bgColor="bg-dark"
                            padding=".4em 1em"
                            border="transparent 2px solid"
                            hoverBorder="red-deep 2px solid"
                            disabled={userDeleting}
                            onClick={deleteJournalHandler}
                            data-testid="journal-delete-btn"
                        >Yes, Delete</Button>
                    </FlexContainer>
                    {(isLoading) &&
                        <Loading height={"100%"} />
                    }
                </FlexCol>
            </FlexContainer>
        </Main>
    )
}

export default DeleteJournal;