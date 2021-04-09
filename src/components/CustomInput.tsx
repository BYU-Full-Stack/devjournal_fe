import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { theme, Input, StyleProps } from '../Styles'
import Icon from './Icon'
import { faEdit, faCheckCircle } from '@fortawesome/free-regular-svg-icons'

type Props = {
    myKey: number;
    editableText: string;
    label: string;
    handleInputUpdate: (input: string) => void;
    setCanUserSave?: (bool: boolean) => void;
    type?: string;
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

export default function CustomInput({ myKey, label, editableText = '', type = 'text', handleInputUpdate, setCanUserSave = undefined }: Props) {
    const [isBeingEdited, setIsBeingEdited] = useState(false);
    const [isFirstFocus, setIsFirstFocus] = useState(true);
    const [toggleType, setToggleType] = useState(type);
    const displayText = (type === 'password') ? editableText.slice(0, 30).replace(/./g, '&bull;') : '';

    const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        handleInputUpdate(value)
    };

    const handleFocus = type === 'password' && isFirstFocus ? (() => { handleInputUpdate(''); setIsFirstFocus(false); }) : () => undefined;
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

    const toggleIsBeingEdited = () => {
        setCanUserSave && setCanUserSave(!isBeingEdited);
        setIsBeingEdited(isBeingEdited => !isBeingEdited);
    }

    return (
        <Wrapper>
            { isBeingEdited ?
                <>
                    <section>
                        <label hidden>{label}</label>
                        <Input type={toggleType} value={editableText} onChange={handleChange} onFocus={handleFocus} data-testid="custom-input" />
                        <Icon icon={faCheckCircle} onClick={toggleIsBeingEdited} testid="toggle-custom-input"></Icon>
                    </section>

                    {type === 'password' && !isFirstFocus && (<label data-testid="show-password-label">Show password<input type='checkbox' checked={toggleType === 'text'} onChange={toggleShowing} data-testid="show-password-checkbox" /></label>)}
                </> :
                <>
                    {type === 'password' ?
                        <Span dangerouslySetInnerHTML={{ __html: displayText }} color="purple" data-testid="password-hidden-text"></Span>
                        :
                        <Span color="purple" data-testid="editable-text">{editableText.slice(0, 30)}</Span>
                    }
                    <Icon size="2x" icon={faEdit} onClick={toggleIsBeingEdited} testid="toggle-custom-input" />
                </>
            }

        </Wrapper>
    );
};