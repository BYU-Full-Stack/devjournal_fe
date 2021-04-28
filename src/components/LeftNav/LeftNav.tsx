import { DragEvent, useState } from 'react'
import styled, { css } from 'styled-components'
import { theme, FlexContainer, FlexCol, StyleProps, devices } from '../../styles/GlobalStyles'
import Icon from '../Icon/Icon'
import { faCaretSquareRight, faTimes } from '@fortawesome/free-solid-svg-icons'

type Props = {
  children: React.ReactNode;
  open?: boolean;
  top?: number;
} & StyleProps;

const StyledCol = styled(FlexCol)`
  height: 100%;
  border-radius: 4px;
  background-color: ${theme['gray-light']};
  margin-top: 1em;
  color: ${theme['bg-dark']};
  #open-icon,#close-icon {
    display: none;
  }
  h2 {
    background-color: ${theme['bg-dark']};
    text-align: center;
    margin: 0;
    padding: 1em 0;
    border-radius: inherit;
    border: 2px ${theme['gray-light']} solid;
    border-bottom: none;
  }
  div {
    padding: 10px 5px;
    transition-duration: 0.5s;
    :hover {
      &:nth-child(3n + 2) {
        background-color: ${theme['orange-hover']};
      }
      &:nth-child(3n + 3) {
        background-color: ${theme['green-hover']};
      }
      &:nth-child(3n + 4) {
        background-color: ${theme['red-hover']};
      }
    }
    border: 1px ${theme['gray-light']} solid;
    border-top: none;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
  }

  ul {
    padding: 0;
    list-style: none;
    transition-duration: 0.5s;
    
    border: 1px ${theme['gray-light']} solid;
    border-top: none;
    cursor: pointer;
  }

  li {
    padding: 10px;
    padding-left: 15px;
    font-size: 18px;
  }

    li:focus {
        outline: none;
    }
    li:hover:nth-child(n),li:focus:nth-child(n) {
       background-color: ${theme['green-hover']};
    }

    li:hover:nth-child(2n),li:focus:nth-child(2n) {
        background-color: ${theme['orange-hover']};
    }

    li:hover:nth-child(3n),li:focus:nth-child(3n) {
       background-color: ${theme['red-hover']};
    }

  @media screen and (max-width: ${devices.tablet}) {
      position: fixed;
      transition: width .5s;
      z-index: 10;
    ${({ open }: Props) =>
    open ?
      css`
            min-width: inherit;
            width: 300px;
            max-width: 95%;
            height: 100vh;
            top: 0;
            box-shadow: #444 0 0 2px 5px;
            #close-icon {
                display: block;
            }
        ` :
      css`
            ${({ top }: Props) => top !== undefined && css`
                top: ${top}px;    
            `}
            min-width: unset;
            width: 50px;
            height: unset;
            #contents {
                height: 0;
                width: 0;
                overflow: hidden;
            }
            #open-icon {
                display: block;
            }
        `
  }
    
  }
`;

const LeftNav = ({ children, open = false, ...rest }: Props) => {
  // opens and closes the left-nav
  const [menuIsOpen, toggleIsOpen] = useState<boolean>(open);
  const toggleLeftNav = () => toggleIsOpen(prevValue => !prevValue);

  // controls the y-axis positioning of the left-nav opener
  const [top, setTopPosition] = useState<number>(130);

  const handleDrag = ({ clientY = 130 }: DragEvent) => {
    // make sure the left-nav opener stays on screen
    if (clientY > 0 && clientY + 50 < window.innerHeight) {
      setTopPosition(clientY);
    }
  };

  return (
    <StyledCol top={top} open={menuIsOpen} {...rest} draggable={!menuIsOpen} onDragEnd={handleDrag}>
      {
        <>
          <Icon
            icon={faCaretSquareRight}
            id='open-icon'
            size='3x'
            color="bg-dark"
            hcolor="turq"
            tabindex={0}
            onClick={toggleLeftNav}
            keyDownData={{ cb: toggleLeftNav }}
          />
          <section id='contents'>
            <FlexContainer justify="flex-end">
              <Icon
                tabindex={1}
                keyDownData={{ cb: toggleLeftNav }}
                onClick={toggleLeftNav}
                id="close-icon"
                color="bg-dark"
                hcolor="red-deep"
                icon={faTimes}
                size="2x" />
            </FlexContainer>
            {children}
          </section>
        </>
      }
    </StyledCol>
  )
};

export default LeftNav;