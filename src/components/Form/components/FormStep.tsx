import React from 'react';

interface FormStepProps {
  currentStep: number;
  stepNumber: number;
  children: React.ReactNode;
}

export const FormStep: React.FC<FormStepProps> = ({ currentStep, stepNumber, children }) => {
  return currentStep === stepNumber ? <div className="form-step">{children}</div> : null;
};
