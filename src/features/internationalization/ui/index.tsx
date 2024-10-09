import i18next from "i18next";

export const Internationalization = () => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    return i18next.changeLanguage(event.target.value);
  };

  return (
    <select className="bg-[#F0F7FE]" onChange={handleSelectChange}>
      <option value="rus">Рус</option>
      <option value="uzb">O`zb</option>
      <option value="cyr">Ўзб</option>
    </select>
  );
};
