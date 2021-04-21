import StyledInput from './StyledInput'

const StyledInputStory = {
    title: 'StyledInput',
    component: StyledInput
};
export default StyledInputStory;

export const StyledTextInput = () => <StyledInput
    type='text'
    placeholder='Username'
    handleChange={() => { }} />

export const StyledPasswordInput = () => <StyledInput
    type='password'
    placeholder='Password'
    handleChange={() => { }} />

