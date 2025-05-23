import { useRef } from 'react';

export default function Input({
    type,
    label,
    value,
    setValue,
}: {
    type: string;
    label: string;
    value: string | number;
    setValue: (value: string) => void;
}) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleChangeInput = (value: string) => setValue(value);
    const handleChangeTextArea = () =>
        setValue(textAreaRef?.current?.value ?? '');

    return (
        <div className="flex flex-col my-4">
            <label className=" font-bold mb-2">{label}</label>
            {type === 'area' ? (
                <textarea
                    className="border border-gray-400 rounded-sm p-2 w-full resize-none"
                    value={value}
                    ref={textAreaRef}
                    onChange={handleChangeTextArea}
                />
            ) : (
                <input
                    type={type}
                    className="border border-gray-400 rounded-sm p-2 w-full"
                    value={value}
                    onChange={(e) => handleChangeInput(e.target.value)}
                />
            )}
        </div>
    );
}
