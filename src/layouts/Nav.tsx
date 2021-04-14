import { FlexContainer, FlexCol } from '../Styles'
import { theme, StyledLink } from '../Styles'
import styled from 'styled-components'
import logo from '../logo.svg';
import { useUser } from '../API/AppLogic';

const StyledLogo = styled.img`
    max-width: 60px;
    height: auto;
    margin: 3px;
`;

const LogoText = styled.h1`
    font-family: 'Dancing Script', cursive;
    position: absolute;
    margin-top: -3em;
    top: 4em;//3.5em;
    text-align: center;
    left: .6em;
    color: ${theme['black']};
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: ${theme['black']};;
`;

export default function Nav() {
    const [user] = useUser();

    return (
        <FlexContainer>
            <FlexCol width={'5%'}><StyledLogo src={logo} /><LogoText>Dev<br></br>Journal</LogoText></FlexCol>
            <FlexCol width={"80%"}>
                <StyledLink to="/">Home</StyledLink>
                {/* <StyledLink to="/about">About</StyledLink> */}
                <StyledLink to="/journals">Journals</StyledLink>
                <StyledLink to="/account">User Details</StyledLink>
                {(user.role === "ADMIN") &&
                    <StyledLink to="/user">All Users</StyledLink>
                }
            </FlexCol>
            <FlexCol justify={"flex-end"}>
                {(user.token)
                ?
                    <StyledLink to="/logout">Sign Out</StyledLink>
                :
                    <>
                    <StyledLink to="/login">Login</StyledLink>
                    <StyledLink to="/register">Register</StyledLink>
                    </>
                }
            </FlexCol>


        </FlexContainer>
    );
}