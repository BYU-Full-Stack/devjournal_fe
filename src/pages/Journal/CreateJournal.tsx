import React, { useRef, useState } from "react"
import { useHistory } from "react-router-dom";
import { createJournal, useAlertBox, useUser } from "../../API/AppLogic";
import ConfirmableInput from "../../components/ConfirmableInput/ConfirmableInput";
import { Button, FlexCol, FlexContainer, H1, H3, Main } from "../../styles/GlobalStyles"
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
    const [, addAlert] = useAlertBox();
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
        setJournal({ ...journal, color: hex })
    }

    const createJournalHandler = async () => {
        try {
            saveButtonRef!.current && (saveButtonRef!.current.disabled = true);
            setIsLoading(true);

            await createJournal(user.username, journal, user.token)
            saveButtonRef!.current && (saveButtonRef!.current.disabled = false);
            setIsLoading(false);
            routeHistory.push("/journals");
            addAlert({
                key: `create-${journal.name}-attempt-${new Date()}`,
                text: `Successfully created your ${journal.name} Journal`,
                timeout: 4,
                theme: 'success'
            });
        } catch (err) {
            addAlert({
                key: `create-journal-attempt-${new Date()}`,
                text: 'Unable to Create Journal.',
                timeout: 7,
                theme: 'error'
            });
            routeHistory.push("/error");
            saveButtonRef!.current && (saveButtonRef!.current.disabled = false);
        }
    }

    return (
        <Main>
            <Button
                bgColor="bg-dark"
                padding=".4em 1em"
                border="transparent 2px solid"
                hoverBorder="turq 2px solid"
                onClick={() => routeHistory.goBack()}
            >Back to Journals</Button>
            <H1>Create a New Journal</H1>
            <FlexContainer wrap="wrap" height="100%">
                <FlexCol margin="auto">
                    <H3 display="inline">Name:</H3>
                    <ConfirmableInput
                        myKey={0}
                        setCanUserSave={setCanUserSave}
                        editableText={journal?.name}
                        maxLength={20}
                        handleInputUpdate={handleUpdateTextInput}
                        inputTestId={'name-input-test-id'}
                        iconTestId={'name-icon-toggle-test-id'} />
                    <H3 display="inline">Color:</H3>
                    <ConfirmableInput
                        myKey={1}
                        setCanUserSave={setCanUserSave}
                        editableText={journal?.color}
                        maxLength={20}
                        type='color'
                        handleInputUpdate={handleUpdateTextInput}
                        setVisibleObject={setDisplayColorPicker}
                        inputTestId={'color-input-test-id'}
                        iconTestId={'color-icon-toggle-test-id'} />

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
                            data-testid="journal-create-save-btn"
                        >Create</Button>
                    </FlexContainer>
                    {(isLoading) &&
                        <Loading height={"100%"} />
                    }
                </FlexCol>
            </FlexContainer>
        </Main>
    )
}

export default CreateJournal;