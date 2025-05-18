export default function Button({
  text,
  handle,
}: {
  text: string;
  handle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={handle}
      className="px-4 py-2 bg-orange-200 rounded-xl text-white font-bold hover:bg-orange-400"
    >
      {text}
    </button>
  );
}
