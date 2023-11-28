import React from 'react';

interface FormStepProps {
  currentStep: number;
  stepNumber: number;
  children: React.ReactNode;
}

export const FormStep: React.FC<FormStepProps> = ({ currentStep, stepNumber, children }) => {
  return (
    <div className={`form-step transition-opacity ${currentStep === stepNumber ? 'opacity-100' : 'hidden'}`}>
      {children}
    </div>
  );
};
