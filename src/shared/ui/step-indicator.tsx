import React from "react";

interface StepIndicatorProps {
  currentStep: number;
  className?: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  className,
}) => {
  const steps = [1, 2, 3, 4];
  return (
    <div
      className={`${className} flex justify-between items-center w-full max-w-md px-0 relative`}
    >
      {steps.map((step, index) => (
        <div
          key={index}
          className="relative flex-1 flex items-center last:flex-none"
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-medium z-10
            ${currentStep >= step ? "bg-gradient" : "bg-gray-300"}
            `}
          >
            {step}
          </div>

          {index < steps.length - 1 && (
            <div
              className={`absolute top-1/2 transform -translate-y-1/2 left-[20%] w-full h-1 
              ${currentStep > step ? "bg-gradient" : "bg-gray-300"}
              z-0`}
              style={{ marginLeft: "5px", marginRight: "5px" }}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
