import { ChangeEvent } from "react";

interface IInputBox{
    label: string;
    id: string;
    type: string;
    onChange(value: ChangeEvent):void;
}

export default IInputBox;