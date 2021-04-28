import { theme } from '../../styles/GlobalStyles'
import styled from 'styled-components'

export const StyledInput = styled.input`
    margin: 0.5rem;
    padding: 0.5rem;
    font-family: 'Roboto', sans-serif;
    border-radius: 10px;
    font-size: 1.5rem;
    color: ${theme['purple']};
    outline: none;
    background-color: ${theme['bg-dark']};
    border: 2px solid white;
    transition: all .4s ease-out;
    &:focus {
        border: 2px solid ${theme['turq']}
    }
`

type Props = {
    type: string;
    placeholder: string;
    handleChange: (a: string) => any | void;
}

const Input = ({ handleChange, ...rest }: Props) =>
    <StyledInput onChange={({ target: { value = '' } = {} }) => handleChange(value)} {...rest} />;

export default Input;
