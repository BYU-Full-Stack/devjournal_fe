import {
    Link
} from "react-router-dom";
import { FlexContainer, FlexCol, Button } from '../Styles'
import { Navbar, theme } from '../Styles'
import styled from 'styled-components'
import logo from '../logo.svg';

const StyledLogo = styled.img`
    max-width: 50px;
    height: auto;
    margin: 4px;
`;

const StyledLink = styled(Link)`
    display: inline-block;
    color: inherit;
    color: ${theme['turq']};
    margin: 1em 1em 0 1em;
    transition: border-bottom .5s;
    &:hover {
        color: ${theme['turq-hover']};
        border-bottom: ${theme['orange-deep']} 4px solid;
    }
    text-decoration: none;
`;

const LogoText = styled.h1`
    position: absolute;
    margin-top: -3em;
    top: 3.5em;
    text-align: center;
    left: .2em;
    color: ${theme['black']};
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: ${theme['turq']};;
`;

export default function Nav() {
    return (
        <FlexContainer>
            <FlexCol width='100px'><StyledLogo src={logo} /><LogoText>Dev<br></br>Journal</LogoText></FlexCol>
            <FlexCol>
                <StyledLink to="/">Home</StyledLink>
                <StyledLink to="/about">About</StyledLink>
                <StyledLink to="/users">Users</StyledLink>
            </FlexCol>

        </FlexContainer>
    );
}