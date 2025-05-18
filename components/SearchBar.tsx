import { useTranslations } from "use-intl";

export default function SearchBar({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (val: string) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const t = useTranslations("SearchBar");

  return (
    <div className="flex justify-center my-10">
      <input
        type="text"
        placeholder={"🔎 " + t("search")}
        value={query}
        onChange={handleChange}
        className="w-100 p-4 pr-8 text-xl rounded-3xl shadow-2xl"
      />
    </div>
  );
}
