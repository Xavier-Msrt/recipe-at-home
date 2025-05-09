export default function Button({text, handle}: {text: string, handle: () => void}) {
    return (
        <button 
            type="button" 
            onClick={handle}
            className="px-4 py-2 bg-blue-200 rounded-xl text-white"
        >
            {text}
        </button>
    )
}