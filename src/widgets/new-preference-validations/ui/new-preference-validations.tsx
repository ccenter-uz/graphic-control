import NewPreferenceValidation from "@shared/ui/new-preference-validation";

export const NewPreferenceValidations = () => {
  return (
    <div>
      <NewPreferenceValidation isError={true} isSuccess={false} />
      <NewPreferenceValidation isError={false} isSuccess={true} />
      <NewPreferenceValidation isError={false} isSuccess={false} />
    </div>
  );
};
