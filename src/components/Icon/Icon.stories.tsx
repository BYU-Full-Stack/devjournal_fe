import React from 'react'
import Icon from './Icon'

import { faCheck, faSpinner, faTimes, faSort } from '@fortawesome/free-solid-svg-icons'
import { faEdit, faCheckCircle, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

const ConfirmableInputStory = {
    title: 'Icon',
    component: Icon
};

export default ConfirmableInputStory;

export const Loading = () => <Icon size={"2x"} color={'bg-dark'} icon={faSpinner} spin={true} />

export const Checkmark = () => <Icon size={"2x"} color={'bg-dark'} icon={faCheck} />

export const CircleCheckmark = () => <Icon size={"2x"} color={'bg-dark'} icon={faCheckCircle} />

export const X = () => <Icon size={"2x"} color={'bg-dark'} icon={faTimes} />

export const Edit = () => <Icon size={"2x"} color={'bg-dark'} icon={faEdit} />

export const Trash = () => <Icon size={"2x"} color={'bg-dark'} icon={faTrashAlt} />

export const Sort = () => <Icon size={"2x"} color={'bg-dark'} icon={faSort} />