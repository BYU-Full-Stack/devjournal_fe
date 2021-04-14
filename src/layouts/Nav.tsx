import { theme, StyledLink } from '../Styles'
import styled from 'styled-components'
import logo from '../logo.svg';
import { useUser } from '../API/AppLogic';

//////////////////  TYPES ///////////////////

type CellType = {
    col?: number;
    colSpan?: number;
    justifySelf?: string;
    paddingLeft?: string;
}

const StyledLogo = styled.img`
    max-width: 60px;
    height: auto;
    margin: 3px;
`;

const LogoText = styled.h1`
    font-family: 'Dancing Script', cursive;
    position: absolute;
    margin-top: -1em;
    top: 3em;
    text-align: center;
    left: 2em;
    color: ${theme['black']};
    font-size: 1em;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: ${theme['black']};;
`;

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 100px 2fr 1fr;
    border-bottom: 2px white solid;
`;

export const TableCell = styled.div`
    grid-column: ${(props: CellType) => {
        let span = props.colSpan !== undefined ? props.colSpan : 1;
        return (
            props.col + " / span " + span
        )
    }
    };
    justify-self: ${({ justifySelf = 'unset' }: CellType) => justifySelf};
    padding: 0.75em 0.25em 0.75em 0.75em;
`;

export default function Nav() {
    const [user, setUser] = useUser();
    const logout = () =>
        setUser({
            username: '',
            token: '',
            role: ''
        });

    return (
        <Wrapper>
            <TableCell col={1}><StyledLogo src={logo} /><LogoText>Dev<br></br>Journal</LogoText></TableCell>
            <TableCell col={2}>
                {user.token &&
                    <>
                        <StyledLink to="/">Home</StyledLink>
                        <StyledLink to="/journals">Journals</StyledLink>
                        <StyledLink to="/account">User Details</StyledLink>
                        {user.role === "ADMIN" &&
                            <StyledLink to="/user">All Users</StyledLink>
                        }
                    </>
                }
            </TableCell>
            <TableCell col={3} justifySelf={"flex-end"}>
                {(user.token)
                    ?
                    <StyledLink onClick={logout} to="/logout">Sign Out</StyledLink>
                    :
                    <>
                        <StyledLink to="/login">Login</StyledLink>
                        <StyledLink to="/register">Register</StyledLink>
                    </>
                }
            </TableCell>
        </Wrapper>
    );
}