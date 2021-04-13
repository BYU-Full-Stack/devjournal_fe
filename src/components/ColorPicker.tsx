import { useState } from 'react';
import { ChromePicker } from 'react-color'

const ColorPicker = () => {
    const [color, setColor] = useState("#fff");

    const handleChangeComplete = (newColor: any) => {
        console.log(newColor);
        setColor(newColor.hex);
    }
    return (
        <ChromePicker
            color={color}
            onChangeComplete={handleChangeComplete}
        />
    )
};

export default ColorPicker;

