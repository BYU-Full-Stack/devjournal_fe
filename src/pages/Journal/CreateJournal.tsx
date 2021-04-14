import React, { useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom";
import { createJournal, useUser } from "../../API/AppLogic";
import ConfirmableInput from "../../components/ConfirmableInput/ConfirmableInput";
import { Button, FlexCol, FlexContainer, H1, H3, Main } from "../../Styles"
import { JournalType } from "./Journal";
import Loading from "../../components/Loading";
import ColorPicker from "../../components/ColorPicker";

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
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const fieldsToUpdate = ["name", "color"];

    const handleUpdateTextInput = (value: String, myKey: number) => {
        setJournal({ ...journal, [fieldsToUpdate[myKey]]: value })
    }

    const setJournalColor = (hex: string) => {
        setJournal({...journal, color: hex})
    }

    const createJournalHandler = async () => {
        try {
            saveButtonRef!.current && (saveButtonRef!.current.disabled = true);
            setIsLoading(true);
            console.log(journal);
            await createJournal(user.username, journal, user.token)
            saveButtonRef!.current && (saveButtonRef!.current.disabled = false);
            setIsLoading(false);
            routeHistory.push("/journals");
        } catch (err) {
            //    TODO: handle errors better than this
            console.log("error", err);
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
                        maxLength={20}
                        handleInputUpdate={handleUpdateTextInput} />
                    <H3 display="inline">Color:</H3>
                    <ConfirmableInput
                        myKey={1}
                        setCanUserSave={setCanUserSave}
                        editableText={journal?.color}
                        maxLength={20}
                        handleInputUpdate={handleUpdateTextInput}
                        setVisibleObject={setDisplayColorPicker}/>

                    <FlexContainer justify="space-between" margin="1em 0em">
                        <ColorPicker visible={displayColorPicker} color={journal?.color} setColor={setJournalColor}></ColorPicker>
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