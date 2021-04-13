import React, { useRef, useState } from "react";

import { updateJournal, useUser } from "../../API/AppLogic";
import ConfirmableInput from "../../components/ConfirmableInput/ConfirmableInput";
import { Button, FlexCol, FlexContainer, H1, H3, Main } from "../../Styles";
import { JournalType } from "./Journal";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ColorPicker from "../../components/ColorPicker";

//////////////////  TYPES ///////////////////

type Props = {
    journal: JournalType,
    setJournals: Function,
}

//////////////////  COMPONENT ///////////////////

const EditJournal = ({journal, setJournals = () => {} }: Props) => {
    const saveButtonRef = useRef<HTMLButtonElement>(null)

    const [canUserSave, setCanUserSave] = useState(true);
    const [user] = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [editJournal, setEditJournal] = useState(journal);
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const fieldsToUpdate = ["name", "color"];

    const handleUpdateTextInput = (value: String, myKey: number) => {
        setEditJournal({ ...editJournal, [fieldsToUpdate[myKey]]: value })
    }

    const setJournalColor = (hex: string) => {
        setEditJournal({...editJournal, color: hex})
    }

    const updateJournalDetails = async () => {
        try {
            saveButtonRef!.current && (saveButtonRef!.current.disabled = true);
            //show loading
            setIsLoading(true);
            await updateJournal(user.username, user.token, editJournal)

            setJournals((prevJournals: Array<JournalType>) => {
                let editIdx = prevJournals.findIndex((x) => x.id === journal.id);

                return (
                    [...prevJournals.slice(0, editIdx),
                     editJournal,
                    ...prevJournals.slice(editIdx + 1)]
                )
            })
            saveButtonRef!.current && (saveButtonRef!.current.disabled = false);
            //take off loading
            setIsLoading(false);
        } catch (err) {
            //    TODO: handle errors better than this
            console.log(err);
            saveButtonRef!.current && (saveButtonRef!.current.disabled = false);
        }
    }

    return (
        <Main>
            <Link to="/journals">
                <Button
                    bgColor="bg-dark"
                    padding=".4em 1em"
                    border="transparent 2px solid"
                    hoverBorder="turq 2px solid"
                >Back to Journals</Button>
            </Link>
            <H1>Editing {journal?.name} Journal</H1>
            <FlexContainer wrap="wrap" height="100%">
                <FlexCol margin="auto">
                    <H3 display="inline">Name:</H3>
                    <ConfirmableInput
                        myKey={0}
                        setCanUserSave={setCanUserSave}
                        editableText={editJournal?.name}
                        maxLength={20}
                        handleInputUpdate={handleUpdateTextInput}/>
                    <H3 display="inline">Color:</H3>
                    <ConfirmableInput
                        myKey={1}
                        setCanUserSave={setCanUserSave}
                        editableText={editJournal?.color}
                        maxLength={20}
                        handleInputUpdate={handleUpdateTextInput}
                        setVisibleObject={setDisplayColorPicker}/>

                    <FlexContainer justify="space-between" margin="1em 0em">
                        <ColorPicker visible={displayColorPicker} color={editJournal?.color} setColor={setJournalColor}></ColorPicker>
                        <Button
                            ref={saveButtonRef}
                            bgColor="bg-dark"
                            padding=".4em 1em"
                            border="transparent 2px solid"
                            hoverBorder="turq 2px solid"
                            disabled={canUserSave}
                            onClick={updateJournalDetails}
                        >Save</Button>
                    </FlexContainer>
                    {(isLoading) &&
                        <Loading height={"100%"}/>
                    }
                </FlexCol>
            </FlexContainer>
        </Main>
    )
}

export default EditJournal;