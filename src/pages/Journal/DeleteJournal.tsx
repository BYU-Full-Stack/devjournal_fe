import React from "react";
import { H3 } from "../../Styles";
import { JournalType } from "./Journal";

type Props = {
    journal?: JournalType,
    setJournals: Function,
}

const DeleteJournal = ({journal, setJournals = () => {} }: Props) => {
    return (
        <H3>Deleting Journal {journal?.name}</H3>
    )
}

export default DeleteJournal;