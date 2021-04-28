import { DragEvent, useState } from 'react'
import { theme, FlexContainer, FlexCol, StyleProps } from '../../Styles'
import styled, { css } from 'styled-components'
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

  @media screen and (max-width: ${700}px) {
      position: fixed;
      transition: width .5s;
      z-index: 10;
    ${({ open }: Props) =>
        open ?
            css`
            min-width: inherit;
            width: 300px;
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
    const [menuIsOpen, toggleIsOpen] = useState<boolean>(open);
    const toggleLeftNav = () => toggleIsOpen(prevValue => !prevValue);
    const [top, setTopPosition] = useState<number>(130);

    const handleDrag = ({ clientY = 130 }: DragEvent) => {
        // make sure the left-nav opener stays on screen
        if (clientY > 0 && clientY + 50 < window.innerHeight) {
            setTopPosition(clientY);
        }
    }

    return (
        <StyledCol top={top} open={menuIsOpen} {...rest} draggable={true} onDragEnd={handleDrag}>
            {
                <>

                    <Icon
                        icon={faCaretSquareRight}
                        id='open-icon'
                        size='3x'
                        color="bg-dark"
                        hcolor="turq"
                        onClick={toggleLeftNav}

                    />

                    <section id='contents'>
                        <FlexContainer justify="flex-end">
                            <Icon id="close-icon" color="bg-dark" hcolor="purple" icon={faTimes} size="2x" onClick={toggleLeftNav} />
                        </FlexContainer>
                        {children}
                    </section>
                </>
            }
        </StyledCol>
    )
};

export default LeftNav;