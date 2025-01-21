import i18next from "i18next";
import { useEffect } from "react";

export const Internationalization = () => {
  const storedLang = localStorage.getItem("lang") || "rus";

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = event.target.value;
    localStorage.setItem("lang", selectedLang);
    i18next.changeLanguage(selectedLang);
  };

  useEffect(() => {
    i18next.changeLanguage(storedLang);
  }, [storedLang]);

  return (
    <select
      className="bg-[#F0F7FE]"
      onChange={handleSelectChange}
      value={storedLang}
    >
      <option value="rus">Рус</option>
      <option value="uzb">O`zb</option>
      <option value="cyr">Ўзб</option>
    </select>
  );
};
