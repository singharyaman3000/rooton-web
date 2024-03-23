/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */

import React, { useEffect, useState } from 'react';
import '../sop.module.css';
import { FormProps } from '@/app/services/apiService/ToolsAPI';
import { H2 } from '@/components/H2';
import Joyride, { STATUS } from 'react-joyride';
import { useHeaderData } from '@/hooks/HeaderDataProvider';

const Form: React.FC<FormProps> = ({ onFormSubmit, formFields }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const sections = formFields[0].builder;
  const { updateToolsFormState, toolsFormState } = useHeaderData();

  const formProgress = ((currentSection + 1) / sections.length) * 100;
  const isTour = localStorage.getItem('SOP_BUILDER_TOUR_DISABLE');
  const [run, setRun] = useState(false);

  const steps = [
    {
      target: '.step1',
      content: 'Fill out the text field by typing the relevant information.',
      disableBeacon: true,
    },
    {
      target: '.step2',
      content: 'To select a value, choose one from the dropdown.',
      disableBeacon: true,
    },
    {
      target: '.step3',
      content: 'You will be able to go to next section by clicking "Next" button once all mandatory fields are filled.',
      disableBeacon: true,
    },
    {
      target: '.step4',
      content: 'You can go to previous section by clicking on "Back" button.',
      disableBeacon: true,
    },
    {
      target: '.step5',
      content: 'You can watch the form progress here.',
      disableBeacon: true,
    },
  ];

  useEffect(() => {
    if (isTour === 'Yes') {
      setRun(false);
    } else {
      setRun(true);
    }
  }, []);

  // Callback function to handle the tour events
  const handleJoyrideCallback = (data: any) => {
    const { status, action } = data;
    // Check if the tour is finished or skipped
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status) || action === 'close') {
      localStorage.setItem('SOP_BUILDER_TOUR_DISABLE', 'Yes');
      setRun(false); // Stops the tour
    }
  };

  const initialFormData: Record<string, string> = {};
  if (formFields.length > 0) {
    sections.forEach((section) => {
      section.fields.forEach((field: { name: string }) => {
        initialFormData[field.name] = '';
      });
    });
  }

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onFormSubmit(formData);
    updateToolsFormState(true);
  };

  const areRequiredFieldsFilled = () => {
    const currentSectionFields = sections[currentSection].fields;
    return currentSectionFields.every((field) => {
      return !field.required || formData[field.name].trim() !== '';
    });
  };

  const handlePreviousSection = () => {
    setCurrentSection(currentSection - 1);
  };

  const handleNextSection = () => {
    setCurrentSection(currentSection + 1);
  };

  return (
    <div>
      <Joyride
        continuous
        scrollToFirstStep
        run={run}
        scrollOffset={300}
        showProgress
        showSkipButton
        disableOverlayClose
        steps={steps}
        callback={handleJoyrideCallback}
        styles={{
          options: {
            zIndex: 100,
          },
          buttonNext: {
            backgroundColor: '#D08420',
          },
          buttonBack: {
            color: '#2A2B2D',
          },
        }}
      />
      <form className="flex shadow-hubspot-form-shadow border border-golden-yellow justify-between relative overflow-hidden bg-pale-sandal">
        <div className="step5 absolute top-0 left-0 h-1 bg-golden-yellow" style={{ width: `${formProgress}%` }}></div>
        <div className="p-4 lg:pl-[60px] w-full lg:w-[95%] py-12 lg:pb-16 lg:pr-0 sm:p-12">
          <H2>{sections[currentSection].title}</H2>
          {sections[currentSection].fields.map((field) => {
            if (field.type === 'dropdown' && field.options) {
              return (
                <div className="step2 my-4" key={field.name}>
                  <label className="text-lg font-medium leading-6 text-black" htmlFor={field.name}>
                    {field.label}
                    {field.required && <span className="pl-0 text-[#ff0000]">*</span>}
                  </label>
                  <select
                    className="w-full px-3 py-3 text-black font-normal text-base leading-6 border border-solid border-gray-300 bg-white"
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    required={field.required}
                  >
                    {field.options.map((option) => {
                      return (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
              );
            }
            return (
              <div className="step1 my-4" key={field.name}>
                <label className="text-lg font-medium leading-6 text-black" htmlFor={field.name}>
                  {field.label}
                  {field.required && <span className="pl-0 text-[#ff0000]">*</span>}
                </label>
                <input
                  className="w-full px-3 py-3 text-black font-normal text-base leading-6 border border-solid border-gray-300 bg-white"
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              </div>
            );
          })}
          <div className="flex justify-center">
            <div className="flex flex-row justify-between w-full mt-10">
              <button
                className={`step4 bg-black text-white px-4 py-3.5 min-w-[100px] text-sm font-bold${
                  currentSection === 0 ? ' opacity-50 cursor-not-allowed' : ''
                }`}
                type="button"
                onClick={handlePreviousSection}
                disabled={currentSection === 0}
              >
                Back
              </button>
              {currentSection !== sections.length - 1 && (
                <button
                  className="step3 bg-black text-white px-4 py-3.5 min-w-[100px] text-sm font-bold"
                  type="button"
                  onClick={handleNextSection}
                  disabled={!areRequiredFieldsFilled()}
                >
                  Next
                </button>
              )}
              {currentSection === sections.length - 1 && (
                <button
                  className="bg-black text-white px-4 py-3.5 min-w-[100px] text-sm font-bold"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!areRequiredFieldsFilled() || toolsFormState}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
