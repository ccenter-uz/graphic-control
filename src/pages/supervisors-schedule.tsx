import CheckboxGroup from "@shared/ui/checkbox-group";

const SupervisorsSchedule = () => {
  return (
    <div className="flex">
      <CheckboxGroup />
      {/* <BaseDay
        isWorkDay={true}
        isOrder={true}
        isNight={false}
        isHoliday={false}
        isToday={false}
        isCheckable={false}
        label={1}
      /> */}
    </div>
  );
};

export default SupervisorsSchedule;
