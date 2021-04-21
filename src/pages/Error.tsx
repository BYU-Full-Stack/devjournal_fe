import { FlexContainer, H3 } from "../Styles"
import { useQuery } from '../API/AppLogic'
import { useLocation } from 'react-router-dom';
const Error = () => {
    const query = useQuery(useLocation().search);
    const reason = query.get('status') || '';

    const renderError = (reason: string) => {
        switch (reason) {
            case '403':
                return 'Woah, buddy, you are not authorized to perform that action.'
            case '404':
                return 'Did your internet go down? If not, ours did... Try logging in later.'
            default:
                return 'Unknown error occurred. Please try logging in again.'
        }
    };

    return (
        <FlexContainer justify={"center"} align={"center"} height={"500px"}>
            <H3 data-testid='error-test-id'>
                {
                    renderError(reason)
                }

            </H3>
        </FlexContainer>
    )
}

export default Error;