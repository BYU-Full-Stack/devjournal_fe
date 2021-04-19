import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { theme, Input, StyleProps } from '../../Styles'
import Icon from '../Icon'
import { faEdit, faCheckCircle } from '@fortawesome/free-regular-svg-icons'

type Props = {
    myKey: number;
    editableText?: string;
    label?: string;
    maxLength?: number;
    handleInputUpdate: (input: string, key: number) => void;
    setCanUserSave?: (bool: boolean) => void;
    type?: string;
    setVisibleObject?: (bool: boolean) => void;
};

const Wrapper = styled.section`
    input[type=text],input[type=password], span {
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
        input[type=text], span {
            min-width: unset;
        }
    }
`;

export const Span = styled.span`
    display: ${({ display = 'inline-block' }: StyleProps) => display};
    color: ${({ color = 'white' }: StyleProps) => theme[color]};
    x-overflow: ${({ xOverflow = 'auto' }: StyleProps) => xOverflow};
`;

export default function ConfirmableInput({ myKey, label, editableText = '', maxLength, type = 'text', handleInputUpdate, setCanUserSave = undefined, setVisibleObject = undefined }: Props) {
    const [isBeingEdited, setIsBeingEdited] = useState(false);
    const [isFirstFocus, setIsFirstFocus] = useState(true);
    const [toggleType, setToggleType] = useState(type);
    const confirmableInput = useRef<HTMLInputElement>(null);
    const displayText = (type === 'password') ? editableText.slice(0, 30).replace(/./g, '&bull;') : '';

    const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        handleInputUpdate(value, myKey)
    };

    const handleFocus = type === 'password' && isFirstFocus ? (() => { handleInputUpdate('', myKey); setIsFirstFocus(false); }) : () => undefined;
    const toggleShowing = () => {
        setToggleType(toggleType === 'password' ? 'text' : 'password');
    };

    useEffect(() => {
        setToggleType(type);
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
        setCanUserSave && setCanUserSave(!isBeingEdited);
        setIsBeingEdited(isBeingEdited => !isBeingEdited);
        setVisibleObject && setVisibleObject(!isBeingEdited);
    }

    return (
        <Wrapper>
            { isBeingEdited ?
                <>
                    <section>
                        <label hidden>{label}</label>
                        <Input ref={confirmableInput} type={toggleType} value={editableText} onChange={handleChange} onFocus={handleFocus} maxLength={maxLength} data-testid="custom-input" />
                        {/* Begin Editing Icon */}
                        <Icon tabindex={0} keyDownData={{ cb: toggleIsBeingEdited }} icon={faCheckCircle} onClick={toggleIsBeingEdited} testid="toggle-custom-input"></Icon>
                    </section>

                    {type === 'password' && !isFirstFocus &&
                        (<label data-testid="show-password-label">Show password
                            <input
                                type='checkbox'
                                checked={toggleType === 'text'}
                                onChange={toggleShowing}
                                data-testid="show-password-checkbox" /></label>)}
                </> :
                <>
                    {type === 'password' ?
                        // show little password dots (when not being edited) instead of revealing the password
                        <Span dangerouslySetInnerHTML={{ __html: displayText }} color="purple" data-testid="password-hidden-text"></Span>
                        :
                        <Span color="purple" data-testid="editable-text">{editableText.slice(0, 30)}</Span>
                    }
                    {/* Confirm/Save Icon */}
                    <Icon tabindex={0} keyDownData={{ cb: toggleIsBeingEdited }} size="2x" icon={faEdit} onClick={toggleIsBeingEdited} testid="toggle-custom-input" />
                </>
            }

        </Wrapper>
    );
};