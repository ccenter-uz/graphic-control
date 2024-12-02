interface IMonth {
  id: number;
  orderedNumber: number;
  title: string;
  isAvailable: boolean;
  link: string;
}

export const months: IMonth[] = [
  { id: 1, orderedNumber: 1, title: "Январь", isAvailable: false, link: "" },
  { id: 2, orderedNumber: 2, title: "Февраль", isAvailable: false, link: "" },
  { id: 3, orderedNumber: 3, title: "Март", isAvailable: false, link: "" },
  { id: 4, orderedNumber: 4, title: "Апрель", isAvailable: false, link: "" },
  { id: 5, orderedNumber: 5, title: "Май", isAvailable: false, link: "" },
  { id: 6, orderedNumber: 6, title: "Июнь", isAvailable: false, link: "" },
  { id: 7, orderedNumber: 7, title: "Июль", isAvailable: false, link: "" },
  { id: 8, orderedNumber: 8, title: "Август", isAvailable: false, link: "" },
  { id: 9, orderedNumber: 9, title: "Сентябрь", isAvailable: false, link: "" },
  { id: 10, orderedNumber: 10, title: "Октябрь", isAvailable: false, link: "" },
  { id: 11, orderedNumber: 11, title: "Ноябрь", isAvailable: false, link: "" },
  { id: 12, orderedNumber: 12, title: "Декабрь", isAvailable: false, link: "" },
];
