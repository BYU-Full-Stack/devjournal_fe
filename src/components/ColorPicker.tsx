import { ChromePicker } from 'react-color'

type Props = {
    visible: boolean;
    color?: string;
    setColor: (hex: string) => void;
}

const ColorPicker = (props: Props) => {
    const handleChangeComplete = (newColor: any) => {
        props.setColor(newColor.hex);
    }
    if (props.visible) {
        return (
            <ChromePicker
                color={props.color}
                onChangeComplete={handleChangeComplete}
            />
        )
    } else return (<div/>)
};

export default ColorPicker;

