import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { theme, Input, StyleProps } from '../../styles/GlobalStyles'
import Icon from '../Icon/Icon'
import { faEdit, faCheckCircle } from '@fortawesome/free-regular-svg-icons'

type Props = {
    myKey: number;
    editableText?: string;
    label?: string;
    maxLength?: number;
    handleInputUpdate: (input: string, key: number) => void;
    setCanUserSave?: (bool: boolean) => void;
    validate?: undefined | ((input: string) => boolean);
    hint?: string;
    type?: string;
    setVisibleObject?: (bool: boolean) => void;
    inputTestId?: string;
    iconTestId?: string;
};

const Hint = styled.p`
    color: ${theme['red-hover']}
`;

const Wrapper = styled.section`
    input[type=text],input[type=password],input[type=email], span {
        min-width: 300px;
    }
    span {
        padding: 6px 0 0 6px;
    }
    border-top: 3px ${theme['turq']} solid;
    min-height: 3rem;
    min-width: 300px;
    color: ${theme['turq']};
    height: 2rem;
    min-width: 300px;
    @media screen and (max-width: 500px) {
        min-width: 50%;
        input[type=text],input[type=password],input[type=email], span {
            min-width: calc(100% - 50px);
        }
    }
`;

export const Span = styled.span`
    display: ${({ display = 'inline-block' }: StyleProps) => display};
    color: ${({ color = 'white' }: StyleProps) => theme[color] || color};
    x-overflow: ${({ xOverflow = 'auto' }: StyleProps) => xOverflow};
`;

const colorValidation = (input: string) => {
    // make sure the string is valid hexidecimal
    return /^#[a-f0-9]{6}$/i.test(input);
};

export default function ConfirmableInput({
    myKey,
    label,
    editableText = '',
    maxLength,
    type = 'text',
    handleInputUpdate,
    setCanUserSave = undefined,
    setVisibleObject = undefined,
    validate = type === 'color' ? colorValidation : (value: string) => !!value,
    hint = 'Required input',
    inputTestId = 'custom-input',
    iconTestId = 'toggle-custom-input'
}: Props) {
    const [isBeingEdited, setIsBeingEdited] = useState(false);
    const [isFirstFocus, setIsFirstFocus] = useState(true);
    const [showHint, setShowHint] = useState<boolean>(false);
    const [toggleType, setToggleType] = useState(type);
    const confirmableInput = useRef<HTMLInputElement>(null);
    const displayText = (type === 'password') ? editableText.slice(0, 30).replace(/./g, '&bull;') : '';

    const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        // Hide the validation hint if it's showing
        if (showHint && value)
            setShowHint(false);

        handleInputUpdate(value, myKey);
    };

    // used to hide the password when focusing in on the input field
    const handleFocus = type === 'password' && isFirstFocus ? (() => { handleInputUpdate('', myKey); setIsFirstFocus(false); }) : () => undefined;
    // strictly for toggling the password text between bullets and plain text
    const toggleShowing = () => {
        setToggleType(toggleType === 'password' ? 'text' : 'password');
    };

    useEffect(() => {
        // the <input> below should stay as type 'text' when the props type is color
        setToggleType(type === 'color' ? 'text' : type);
        setIsFirstFocus(true);
        setIsBeingEdited(false);
        setCanUserSave && setCanUserSave(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myKey]);

    useEffect(() => {
        // focus in on the input box when beginning to edit
        isBeingEdited && confirmableInput.current?.focus();
    }, [confirmableInput, isBeingEdited])

    const toggleIsBeingEdited = () => {
        // validate the input before allowing user to confirm
        if (!isBeingEdited || validate(confirmableInput.current?.value || '')) {
            setCanUserSave && setCanUserSave(!isBeingEdited);
            setIsBeingEdited(isBeingEdited => !isBeingEdited);
            setVisibleObject && setVisibleObject(!isBeingEdited);
        } else {
            // show the hint when validation fails 
            setShowHint(true);
        }
    }

    return (
        <Wrapper>
            { isBeingEdited ?
                <>
                    <section>
                        <label hidden>{label}</label>
                        <Input ref={confirmableInput} type={toggleType} value={editableText} onChange={handleChange} onFocus={handleFocus} maxLength={maxLength} data-testid={inputTestId} />
                        {/* Begin Editing Icon */}
                        <Icon tabindex={0} keyDownData={{ cb: toggleIsBeingEdited }} icon={faCheckCircle} onClick={toggleIsBeingEdited} testid={iconTestId}></Icon>
                    </section>

                    {type === 'password' && !isFirstFocus &&
                        (<label data-testid="show-password-label">Show password
                            <input
                                type='checkbox'
                                checked={toggleType === 'text'}
                                onChange={toggleShowing}
                                data-testid="show-password-checkbox" /></label>)}
                    <Hint>{showHint ? `*${hint}` : ''}</Hint>
                </> :
                <>
                    {type === 'password' ?
                        // show little password dots (when not being edited) instead of revealing the password
                        <Span dangerouslySetInnerHTML={{ __html: displayText }} color="purple" data-testid="password-hidden-text"></Span>
                        :
                        type === 'color' ?
                            // set the color of the text to the selected color 
                            <Span color={editableText}>{editableText}</Span>
                            :
                            <Span color="purple" data-testid="editable-text">{editableText.slice(0, 30)}</Span>
                    }
                    {/* Confirm/Save Icon */}
                    <Icon tabindex={0} keyDownData={{ cb: toggleIsBeingEdited }} size="2x" icon={faEdit} onClick={toggleIsBeingEdited} testid={iconTestId} />
                </>
            }

        </Wrapper>
    );
};