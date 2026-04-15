import IInputBox from "./IInputBox";

function InputBox(props: IInputBox){
    return(
        <>
            <label htmlFor={props.id}>{props.label}</label>
            <input type='text' name={props.id} id={props.id}
            className="text-2xl border-2 rounded-md pl-2 selection::bg-transparent mb-4 w-[25vw]"
            onChange={(value) => props.onChange(value)}></input>
        </>
    );
}

export default InputBox;