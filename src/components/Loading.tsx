import { FlexContainer } from "../styles/GlobalStyles";
import Icon from "./Icon/Icon";
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

type Props = {
    height?: string
}

const Loading = (props: Props) => {
    return (
        <FlexContainer justify={"center"} align={"center"} height={props.height || "500px"}>
            <Icon size={"4x"} icon={faSpinner} spin={true} testid={"loading-test-id"}></Icon>
        </FlexContainer>
    )
};

export default Loading;