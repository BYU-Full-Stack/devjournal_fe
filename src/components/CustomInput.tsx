import { useState } from 'react'
import styled from 'styled-components'
import { theme, Input, StyleProps } from '../Styles'
import Icon from './Icon'
import { faEdit, faCheckCircle } from '@fortawesome/free-regular-svg-icons'

type Props = {
    editableText: string;
    updateText: Function;
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
`;

export default function C({ editableText = '', updateText, type = 'text' }: Props) {
    const [isBeingEdited, setIsBeingEdited] = useState(false);
    const [isFirstFocus, setIsFirstFocus] = useState(true);
    const [toggleType, setToggleType] = useState(type);
    const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        updateText(value)
    };

    const handleFocus = type === 'password' && isFirstFocus ? (() => { updateText(''); setIsFirstFocus(false); }) : () => undefined;
    const toggleShowing = () => {
        setToggleType(toggleType === 'password' ? 'text' : 'password');
    };

    return (
        <Wrapper>
            { isBeingEdited ?
                <>
                    <section>
                        <Input type={toggleType} value={editableText} onChange={handleChange} onFocus={handleFocus} />
                        <Icon icon={faCheckCircle} onClick={setIsBeingEdited.bind(undefined, false)}></Icon>
                    </section>
                    {type === 'password' && !isFirstFocus && (<label>Show password<input type='checkbox' checked={toggleType === 'text'} onChange={toggleShowing} /></label>)}
                </> :
                <>
                    <Span color="purple">{editableText.length > 30 ? `${editableText.slice(0, 30)}...` : editableText}</Span>
                    <Icon size="2x" icon={faEdit} onClick={setIsBeingEdited.bind(undefined, true)} />
                </>
            }

        </Wrapper>
    );
};