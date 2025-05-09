import {useRef} from "react";

export default function Input({type, label, setValue}: {type: string, label: string, setValue: (value: string ) => void}) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleChangeInput = (value: string) => setValue(value);
    const handleChangeTextArea = () => setValue(textAreaRef?.current?.value ?? "");
    

    return (
        <div className="flex flex-col my-4">
            <label className=" font-bold mb-2">{ label }</label>
            {
                type === "area"
                    ?
                    <textarea
                        className="border border-gray-400 rounded-sm p-2 w-full resize-none"
                        ref={textAreaRef}
                        onChange={handleChangeTextArea}
                    />
                    :
                    <input
                        type={type}
                        className="border border-gray-400 rounded-sm p-2 w-full "
                        onChange={(e) => handleChangeInput(e.target.value)}
                    />
            }
        </div>);
}