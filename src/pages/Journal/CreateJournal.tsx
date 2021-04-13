import React, { useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom";
import { createJournal, useUser } from "../../API/AppLogic";
import ConfirmableInput from "../../components/ConfirmableInput/ConfirmableInput";
import { Button, FlexCol, FlexContainer, H1, H3, Main } from "../../Styles"
import { JournalType } from "./Journal";
import Loading from "../../components/Loading";

//////////////////  COMPONENT ///////////////////

const CreateJournal = () => {
    const saveButtonRef = useRef<HTMLButtonElement>(null)

    const [canUserSave, setCanUserSave] = useState(true);
    const [user] = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const routeHistory = useHistory();
    const [journal, setJournal] = useState<JournalType>({
        name: "",
        color: "",
    });
    const fieldsToUpdate = ["name", "color"];

    const handleUpdateTextInput = (value: String, myKey: number) => {
        setJournal({ ...journal, [fieldsToUpdate[myKey]]: value })
    }

    const createJournalHandler = async () => {
        try {
            saveButtonRef!.current && (saveButtonRef!.current.disabled = true);
            setIsLoading(true);
            await createJournal(user.username, journal, user.token)
            saveButtonRef!.current && (saveButtonRef!.current.disabled = false);
            setIsLoading(false);
            routeHistory.push("/journals");
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
            <H1>Create a New Journal</H1>
            <FlexContainer wrap="wrap" height="100%">
                <FlexCol margin="auto">
                    <H3 display="inline">Name:</H3>
                    <ConfirmableInput
                        myKey={0}
                        setCanUserSave={setCanUserSave}
                        editableText={journal?.name}
                        handleInputUpdate={handleUpdateTextInput} />
                    <H3 display="inline">Color:</H3>
                    <ConfirmableInput
                        myKey={1}
                        setCanUserSave={setCanUserSave}
                        editableText={journal?.color}
                        handleInputUpdate={handleUpdateTextInput} />

                    <FlexContainer justify="flex-end" margin="1em 0em">
                        <Button
                            ref={saveButtonRef}
                            bgColor="bg-dark"
                            padding=".4em 1em"
                            border="transparent 2px solid"
                            hoverBorder="turq 2px solid"
                            disabled={canUserSave}
                            onClick={createJournalHandler}
                        >Create</Button>
                    </FlexContainer>
                    {(isLoading) &&
                        <Loading height={"100%"}/>
                    }
                </FlexCol>
            </FlexContainer>
        </Main>
    )
}

export default CreateJournal;