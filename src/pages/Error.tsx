import { FlexContainer, H3 } from "../Styles"

const Error = (props: any) => {
    console.log(props);
    return(
        <FlexContainer justify={"center"} align={"center"} height={"500px"}>
            <H3>There has been an error. Please try again.</H3>
        </FlexContainer>
    )
}

export default Error;