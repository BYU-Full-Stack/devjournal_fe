import React from 'react'
import ConfirmableInput from './ConfirmableInput'

const ConfirmableInputStory = {
    title: 'ConfirmableInput',
    component: ConfirmableInput
};
export default ConfirmableInputStory;

export const TextType = () => <ConfirmableInput
    myKey={0}
    editableText={'hello'}
    handleInputUpdate={function (value) { }} />

export const PasswordType = () => <ConfirmableInput
    myKey={0}
    editableText={'password'}
    type='password'
    handleInputUpdate={function (value) { }} />