import { useSelector } from 'react-redux'
import { RootState } from '../store'
import styled from 'styled-components'
import { theme } from '../Styles'

export default function C() {
    const userState = useSelector((state: RootState) => state.userReducer);
    const Wrapper = styled.section`
        div {
            border-top: 3px ${theme['turq']} solid;
            min-height: '100%';
            color: ${theme['turq']};
        }
    `;
    console.log(theme['turq'])

    return (
        <Wrapper>
            <div>
                {userState.email}
            </div>
        </Wrapper>
    );
};