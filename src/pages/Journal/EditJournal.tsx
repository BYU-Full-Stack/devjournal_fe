import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { updateJournal, useUser } from "../../API/AppLogic";
import CustomInput from "../../components/CustomInput";
import { Button, FlexCol, FlexContainer, H1, H3 } from "../../Styles";
import { JournalType } from "./Journal";

type Props = {
    setIsBeingEdited: (bool: boolean) => void,
    journal?: JournalType,
}

const EditJournal = ({setIsBeingEdited, journal }: Props) => {
    const saveButtonRef = useRef<HTMLButtonElement>(null)

    const [canUserSave, setCanUserSave] = useState(true);
    const [user] = useUser();
    const [editJournal, setEditJournal] = useState(journal)
    console.log(editJournal)
    const fieldsToUpdate = ["name", "color"];

    const handleUpdateTextInput = (value: String, myKey: number) => {
        setEditJournal({ ...editJournal, [fieldsToUpdate[myKey]]: value })
    }

    const updateJournalDetails = async () => {
        try {
            saveButtonRef!.current!.disabled = true;
            await updateJournal(user.username, user.token, editJournal)

            saveButtonRef!.current!.disabled = false;
        } catch (err) {
            //    TODO: handle errors better than this
            console.log(err);
            saveButtonRef!.current!.disabled = false;
        }
    }

    return (
        <main>
            <Button onClick={() => setIsBeingEdited(false)}>Back</Button>
            <H1>Editing {journal?.name} Journal</H1>
            <FlexContainer wrap="wrap" height="100%">
                <FlexCol margin="auto">
                    <H3 display="inline">Name:</H3>
                    <CustomInput
                        myKey={0}
                        setCanUserSave={setCanUserSave}
                        editableText={editJournal?.name}
                        handleInputUpdate={handleUpdateTextInput} />
                    <H3 display="inline">Color:</H3>
                    <CustomInput
                        myKey={1}
                        setCanUserSave={setCanUserSave}
                        editableText={editJournal?.color}
                        handleInputUpdate={handleUpdateTextInput} />

                    <FlexContainer justify="flex-end" margin="1em 0em">
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
                </FlexCol>
            </FlexContainer>
        </main>
    )
}

export default EditJournal;