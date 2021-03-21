import { useState } from 'react'
import styled from 'styled-components'
import { theme, Input, StyleProps } from '../Styles'
import Icon from './Icon'
import { faEdit, faCheckCircle } from '@fortawesome/free-regular-svg-icons'

type Props = {
    editableText: string;
    updateText: Function;
};

const Wrapper = styled.section`
    input[type=text], span {
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

export default function C({ editableText = '', updateText }: Props) {
    const [isBeingEdited, setIsBeingEdited] = useState(false);

    const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        updateText(value)
    };

    return (
        <Wrapper>
            { isBeingEdited ?
                <>
                    <Input type='text' value={editableText} onChange={handleChange} />
                    <Icon icon={faCheckCircle} onClick={setIsBeingEdited.bind(undefined, false)}></Icon>
                </> :
                <>
                    <Span color="purple">{editableText}</Span>
                    <Icon size="2x" icon={faEdit} onClick={setIsBeingEdited.bind(undefined, true)} />
                </>
            }
        </Wrapper>
    );
};