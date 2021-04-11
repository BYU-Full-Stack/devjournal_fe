import { useRef, useState } from "react";
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { updateJournal, useUser } from "../../API/AppLogic";
import CustomInput from "../../components/CustomInput";
import { Button, FlexCol, FlexContainer, H1, H3 } from "../../Styles";
import { JournalType } from "./Journal";
import Icon from "../../components/Icon";

type Props = {
    setIsBeingEdited: (bool: boolean) => void,
    journal?: JournalType,
    setJournals: Function,
}

const EditJournal = ({setIsBeingEdited, journal, setJournals = () => {} }: Props) => {
    const saveButtonRef = useRef<HTMLButtonElement>(null)

    const [canUserSave, setCanUserSave] = useState(true);
    const [user] = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [editJournal, setEditJournal] = useState(journal)
    const fieldsToUpdate = ["name", "color"];

    const handleUpdateTextInput = (value: String, myKey: number) => {
        setEditJournal({ ...editJournal, [fieldsToUpdate[myKey]]: value })
    }

    const updateJournalDetails = async () => {
        try {
            saveButtonRef!.current && (saveButtonRef!.current.disabled = true);
            //show loading
            setIsLoading(true);
            await updateJournal(user.username, user.token, editJournal)

            setJournals((prevJournals: Array<Object>) => {
                const {idx = 0} = journal || {};
                console.log("prevJournals", prevJournals)
                return (
                    [...prevJournals.slice(0, idx),
                     editJournal,
                    ...prevJournals.slice(idx + 1)]
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
                    {(isLoading) &&
                        <FlexContainer justify={"center"}>
                            <Icon size={"4x"} icon={faSpinner} spin={true}></Icon>
                        </FlexContainer>
                    }
                </FlexCol>
            </FlexContainer>
        </main>
    )
}

export default EditJournal;