import { useState } from 'react';
import { ChromePicker } from 'react-color'

const ColorPicker = () => {
    const [color, setColor] = useState("#fff");

    return (
        <ChromePicker
            color={}
        />
    )
};

export default ColorPicker;

