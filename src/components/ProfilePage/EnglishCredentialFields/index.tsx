/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import React, { useState, forwardRef, useEffect } from 'react';
import style from '../ProfilePage.module.css';
import { v4 as uuidv4 } from 'uuid';
import Select, { MultiValue } from 'react-select';

const examOptions = [
  { value: 'IELTS', label: 'IELTS' },
  { value: 'PTE', label: 'PTE' },
  { value: 'GRE', label: 'GRE' },
  { value: 'GMAT', label: 'GMAT' },
];

type PersonalInformationFieldsProps = {
  id: string;
  label: string;
  options: string[];
  name: string;
  value?: string;
  onChange: (event: any) => void;
};

type ScoreInputFieldProps = {
  id: string;
  label: string;
  examType: string;
  index: number;
  value?: string;
  fieldName: string;
  type: string;
  placeholder: string;
  min: number;
  max: number;
  errorMessage: string;
  onChange: (value: string, examSection: string, examType: string, index: number) => void;
};

type ExamScores = {
  [key: string]: string;
};

type Exam = {
  decision: string;
  scores: ExamScores;
};

type Exams = {
  [key: string]: Exam; // This allows for any key, e.g., "IELTS", to be used dynamically
};

type StudentRecord = {
  id: string;
  exams: Exams;
};

type Experience = { id: string; selectedExams: string[]; decision: Exams; scores: ExamScores };

const ScoreInputField = ({
  id,
  label,
  examType,
  index,
  fieldName,
  onChange,
  type = 'text',
  placeholder,
  min,
  value: initialValue,
  max,
  errorMessage,
}: ScoreInputFieldProps) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    return setValue(initialValue as string);
  }, [initialValue]);

  const fieldStyle =
    'border-2 border-gray-300 focus:outline-none hover:border-2 hover:border-gray-500 p-3 rounded bg-white text-black w-full text-sm';
  const labelStyle = 'block text-sm text-gray-700 font-bold mb-2';
  const errorStyle = 'text-red-500 text-sm mt-1';

  const handleOnChange = (event: any) => {
    const inputValue = event.target.value;
    setValue(inputValue);

    if (inputValue < min || inputValue > max || Number.isNaN(parseFloat(inputValue))) {
      setError(errorMessage);
    } else {
      setError('');
      onChange(inputValue, fieldName, examType, index);
    }
  };
  return (
    <div>
      <label htmlFor={id} className={labelStyle}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={fieldStyle}
        value={value}
        onChange={handleOnChange}
      />
      {error && <div className={errorStyle}>{error}</div>}
    </div>
  );
};

const SelectFieldWithLabel = ({ id, label, options, name, onChange, value }: PersonalInformationFieldsProps) => {
  const fieldStyle =
    'border-2 border-gray-300 focus:outline-none hover:border-2 hover:border-gray-500 p-3 rounded bg-white text-black w-full text-sm';
  const labelStyle = 'block text-sm text-gray-700 font-bold mb-2';

  return (
    <div>
      <label htmlFor={id} className={labelStyle}>
        {label}
      </label>
      <select id={id} className={fieldStyle} value={value} onChange={onChange} name={id}>
        <option value="">Select Option</option>
        {options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

type FieldsProps = {
  onExperiencesChange: (data: StudentRecord[]) => void;
  onChange: (data: StudentRecord[]) => void;
  profileData: any;
};

// eslint-disable-next-line react/display-name
export const EnglishCredentialFields = forwardRef<HTMLDivElement, FieldsProps>(
  ({ onChange, profileData, onExperiencesChange }, ref) => {
    const [experiences, setExperiences] = useState<Experience[]>(() => {
      return profileData.length > 0
        ? profileData.map((data: any) => {
          return {
            id: data.id || uuidv4(),
            selectedExams: Object.keys(data.exams).map((exam) => { return exam.toUpperCase(); }),
            decision: data.exams,
            scores: Object.keys(data.exams).reduce((acc: any, examKey: string) => {
              const examScores = data.exams[examKey].scores || {};
              const normalizedScores = Object.keys(examScores).reduce((scoresAcc: any, scoreKey: string) => {
                scoresAcc[`${examKey.toLowerCase()}${scoreKey}`] = examScores[scoreKey];
                return scoresAcc;
              }, {});
              return { ...acc, ...normalizedScores };
            }, {}),
          };
        })
        : [{ id: uuidv4(), selectedExams: [], decision: {}, scores: {} }];
    });

    const prepareDataForSubmission = () => {
      return experiences.map((experience: Experience) => {
        const { id, selectedExams = [], decision, scores = {} } = experience;

        const examDetails = selectedExams.reduce((details: Exams, exam: string) => {
          const examDecision = decision?.[exam]?.decision || '';
          const examScoresKeys = Object.keys(scores).filter((key) => {
            return key.startsWith(exam.toLowerCase());
          });
          const examScores = examScoresKeys.reduce((acc: ExamScores, key) => {
            const scoreField = key.replace(exam.toLowerCase(), '');
            acc[scoreField] = scores[key];
            return acc;
          }, {});

          details[exam] = {
            decision: examDecision,
            scores: examScores,
          };

          return details;
        }, {});

        return { id, exams: examDetails };
      });
    };

    const handleExamSelectionChange = (
      index: number,
      selected: MultiValue<{
        value: string;
        label: string;
      }>,
    ) => {
      const updatedExperiences = [...experiences];
      updatedExperiences[index].selectedExams = selected.map((option) => {
        return option.value;
      });
      setExperiences(updatedExperiences);
      const data: StudentRecord[] = prepareDataForSubmission();
      onExperiencesChange(data);
    };

    const handleExamDecisionChange = (examType: string, index: number, value: string) => {
      const updatedExperiences = [...experiences];
      if (!updatedExperiences[index].decision) {
        updatedExperiences[index].decision = {};
      }
      updatedExperiences[index].decision[examType] = {
        ...updatedExperiences[index].decision[examType] || {},
        decision: value,
      };
      setExperiences(updatedExperiences);
      const data: StudentRecord[] = prepareDataForSubmission();
      onExperiencesChange(data);
    };

    const handleScoreChange = (value: string, fieldName: string, examType: string, index: number) => {
      setExperiences((prevExperiences: Experience[]) => {
        const newExperiences = [...prevExperiences];
        if (!newExperiences[index].scores) {
          newExperiences[index].scores = {};
        }
        const scoreKey = `${examType.toLowerCase()}${fieldName}`;
        newExperiences[`${index}`].scores[scoreKey] = value;

        return newExperiences;
      });
      const data: StudentRecord[] = prepareDataForSubmission();
      onExperiencesChange(data);
    };

    const renderAdditionalIELTSFields = (index: number) => {
      const examType = 'IELTS';
      const examDecision = experiences[index]?.decision?.IELTS?.decision ?? '';

      if (examDecision === 'Already gave the exam') {
        return (
          <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-9 mt-4">
            <ScoreInputField
              label="Listening"
              id={`ielts-listening-${index}`}
              examType="IELTS"
              index={index}
              fieldName="listening"
              onChange={(value) => {
                return handleScoreChange(value, 'listening', 'IELTS', index);
              }}
              type="number"
              placeholder="0 to 9"
              min={0}
              max={9}
              errorMessage="Please enter a number between 0 and 9"
              value={experiences[index]?.decision?.[examType]?.scores?.listening || ''}
            />
            <ScoreInputField
              label="Speaking"
              id={`ielts-speaking-${index}`}
              examType="IELTS"
              index={index}
              fieldName="speaking"
              onChange={(value) => {
                return handleScoreChange(value, 'speaking', 'IELTS', index);
              }}
              type="number"
              placeholder="0 to 9"
              min={0}
              max={9}
              errorMessage="Please enter a number between 0 and 9"
              value={experiences[index]?.decision?.[examType]?.scores?.speaking || ''}
            />
            <ScoreInputField
              label="Writing"
              id={`ielts-writing-${index}`}
              examType="IELTS"
              index={index}
              fieldName="writing"
              onChange={(value) => {
                return handleScoreChange(value, 'writing', 'IELTS', index);
              }}
              type="number"
              placeholder="0 to 9"
              min={0}
              max={9}
              errorMessage="Please enter a number between 0 and 9"
              value={experiences[index]?.decision?.[examType]?.scores?.writing || ''}
            />
            <ScoreInputField
              label="Reading"
              id={`ielts-reading-${index}`}
              examType="IELTS"
              index={index}
              fieldName="reading"
              onChange={(value) => {
                return handleScoreChange(value, 'reading', 'IELTS', index);
              }}
              type="number"
              placeholder="0 to 9"
              min={0}
              max={9}
              errorMessage="Please enter a number between 0 and 9"
              value={experiences[index]?.decision?.[examType]?.scores?.reading || ''}
            />
            <ScoreInputField
              label="Overall"
              id={`ielts-overall-${index}`}
              examType="IELTS"
              index={index}
              fieldName="overall"
              onChange={(value) => {
                return handleScoreChange(value, 'overall', 'IELTS', index);
              }}
              type="number"
              placeholder="0 to 9"
              min={0}
              max={9}
              errorMessage="Please enter a number between 0 and 9"
              value={experiences[index]?.decision?.[examType]?.scores?.overall || ''}
            />
          </div>
        );
      }
      return null;
    };

    const renderAdditionalPTEFields = (index: number) => {
      const examType = 'PTE';
      const examDecision = experiences[index]?.decision?.PTE?.decision ?? '';
      if (examDecision === 'Already gave the exam') {
        return (
          <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-9 mt-4">
            <ScoreInputField
              label="Listening"
              id={`pte-listening-${index}`}
              fieldName="listening"
              examType="PTE"
              index={index}
              onChange={(value) => {
                return handleScoreChange(value, 'listening', 'pte', index);
              }}
              type="number"
              placeholder="10 to 90"
              min={10}
              max={90}
              errorMessage="Please enter a number between 10 and 90."
              value={experiences[index]?.decision?.[examType]?.scores?.listening || ''}

            />
            <ScoreInputField
              label="Speaking"
              id={`pte-speaking-${index}`}
              fieldName="speaking"
              examType="PTE"
              index={index}
              onChange={(value) => {
                return handleScoreChange(value, 'speaking', 'pte', index);
              }}
              type="number"
              placeholder="10 to 90"
              min={10}
              max={90}
              errorMessage="Please enter a number between 10 and 90."
              value={experiences[index]?.decision?.[examType]?.scores?.speaking || ''}
            />
            <ScoreInputField
              label="Writing"
              id={`pte-writing-${index}`}
              fieldName="writing"
              examType="PTE"
              index={index}
              onChange={(value) => {
                return handleScoreChange(value, 'writing', 'pte', index);
              }}
              type="number"
              placeholder="10 to 90"
              min={10}
              max={90}
              errorMessage="Please enter a number between 10 and 90."
              value={experiences[index]?.decision?.[examType]?.scores?.writing || ''}
            />
            <ScoreInputField
              label="Reading"
              id={`pte-reading-${index}`}
              fieldName="reading"
              examType="PTE"
              index={index}
              onChange={(value) => {
                return handleScoreChange(value, 'reading', 'pte', index);
              }}
              type="number"
              placeholder="10 to 90"
              min={10}
              max={90}
              errorMessage="Please enter a number between 10 and 90."
              value={experiences[index]?.decision?.[examType]?.scores?.reading || ''}
            />
            <ScoreInputField
              label="Overall"
              id={`pte-overall-${index}`}
              fieldName="overall"
              examType="PTE"
              index={index}
              onChange={(value) => {
                return handleScoreChange(value, 'overall', 'pte', index);
              }}
              type="number"
              placeholder="10 to 90"
              min={10}
              max={90}
              errorMessage="Please enter a number between 10 and 90."
              value={experiences[index]?.decision?.[examType]?.scores?.overall || ''}
            />
          </div>
        );
      }
      return null;
    };

    const renderAdditionalGREFields = (index: number) => {
      const examType = 'GRE';
      const examDecision = experiences[index]?.decision?.GRE?.decision ?? '';
      if (examDecision === 'Already gave the exam') {
        return (
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-9 mt-4">
            <ScoreInputField
              label="Verbal"
              id={`gre-verbal-${index}`}
              fieldName="verbal"
              examType="GRE"
              index={index}
              onChange={(value) => {
                return handleScoreChange(value, 'verbal', 'GRE', index);
              }}
              type="number"
              placeholder="130 to 170"
              min={130}
              max={170}
              errorMessage="Please enter a number between 130 and 170."
              value={experiences[index]?.decision?.[examType]?.scores?.verbal || ''}
            />
            <ScoreInputField
              label="Quantitative"
              id={`gre-quantitative-${index}`}
              fieldName="quantitative"
              examType="GRE"
              index={index}
              onChange={(value) => {
                return handleScoreChange(value, 'quantitative', 'GRE', index);
              }}
              type="number"
              placeholder="130 to 170"
              min={130}
              max={170}
              errorMessage="Please enter a number between 130 and 170."
              value={experiences[index]?.decision?.[examType]?.scores?.quantitative || ''}
            />
            <ScoreInputField
              label="Analytical Writing"
              id={`gre-alytical-${index}`}
              fieldName="alytical"
              examType="GRE"
              index={index}
              onChange={(value) => {
                return handleScoreChange(value, 'alytical', 'GRE', index);
              }}
              type="number"
              placeholder="0 to 6"
              min={0}
              max={6}
              errorMessage="Please enter a number between 0 and 6."
              value={experiences[index]?.decision?.[examType]?.scores?.alytical || ''}
            />
            <ScoreInputField
              label="Overall"
              id={`gre-overall-${index}`}
              fieldName="overall"
              examType="GRE"
              index={index}
              onChange={(value) => {
                return handleScoreChange(value, 'overall', 'GRE', index);
              }}
              type="number"
              placeholder="260 to 340"
              min={260}
              max={340}
              errorMessage="Please enter a number between 260 and 340."
              value={experiences[index]?.decision?.[examType]?.scores?.overall || ''}
            />
          </div>
        );
      }
      return null;
    };

    const renderAdditionalGMATFields = (index: number) => {
      const examType = 'GMAT';
      const examDecision = experiences[index]?.decision?.GMAT?.decision ?? '';
      if (examDecision === 'Already gave the exam') {
        return (
          <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-9 mt-4">
            <ScoreInputField
              label="Verbal"
              id={`gmat-verbal-${index}`}
              fieldName="verbal"
              examType="GMAT"
              index={index}
              onChange={(value) => {
                return handleScoreChange(value, 'GMAT', 'GMAT', index);
              }}
              type="number"
              placeholder="0 to 60"
              min={0}
              max={60}
              errorMessage="Please enter a number between 0 and 60."
              value={experiences[index]?.decision?.[examType]?.scores?.verbal || ''}
            />
            <ScoreInputField
              label="Quantitative"
              id={`gmat-quantitative-${index}`}
              fieldName="quantitative"
              examType="GMAT"
              index={index}
              onChange={(value) => {
                return handleScoreChange(value, 'quantitative', 'GMAT', index);
              }}
              type="number"
              placeholder="0 to 60"
              min={0}
              max={60}
              errorMessage="Please enter a number between 0 and 60."
              value={experiences[index]?.decision?.[examType]?.scores?.quantitative || ''}
            />
            <ScoreInputField
              label="Analytical Writing"
              id={`gmat-alytical-${index}`}
              fieldName="alytical"
              examType="GMAT"
              index={index}
              onChange={(value) => {
                return handleScoreChange(value, 'alytical', 'GMAT', index);
              }}
              type="number"
              placeholder="0 to 6"
              min={0}
              max={6}
              errorMessage="Please enter a number between 0 and 6."
              value={experiences[index]?.decision?.[examType]?.scores?.alytical || ''}
            />
            <ScoreInputField
              label="Integrated Reasoning"
              id={`gmat-integratedreasoning-${index}`}
              fieldName="integratedreasoning"
              examType="GMAT"
              index={index}
              onChange={(value) => {
                return handleScoreChange(value, 'integratedreasoning', 'GMAT', index);
              }}
              type="number"
              placeholder="1 to 8"
              min={1}
              max={8}
              errorMessage="Please enter a number between 1 and 8."
              value={experiences[index]?.decision?.[examType]?.scores?.integratedreasoning || ''}
            />
            <ScoreInputField
              label="Overall"
              id={`gmat-overall-${index}`}
              fieldName="overall"
              examType="GMAT"
              index={index}
              onChange={(value) => {
                return handleScoreChange(value, 'overall', 'GMAT', index);
              }}
              type="number"
              placeholder="200 to 800"
              min={200}
              max={800}
              errorMessage="Please enter a number between 200 and 800."
              value={experiences[index]?.decision?.[examType]?.scores?.overall || ''}
            />
          </div>
        );
      }
      return null;
    };

    const renderScoreFields = (exam: string, index: number) => {
      if (experiences[index]?.decision?.[exam]?.decision === 'Already gave the exam') {
        switch (exam) {
        case 'IELTS':
          return renderAdditionalIELTSFields(index);
        case 'PTE':
          return renderAdditionalPTEFields(index);
        case 'GRE':
          return renderAdditionalGREFields(index);
        case 'GMAT':
          return renderAdditionalGMATFields(index);
        default:
          return null;
        }
      }
      return null;
    };

    return (
      <div ref={ref}>
        {experiences.map((experience: Experience, index: number) => {
          return (
            <div
              key={experience.id}
              className={`${style.mainContent} ${index !== 0 ? 'mt-[20px]' : 'mt-[47px]'
              } pl-5 pr-5 pb-8 mr-1 border-2 border-gray-300 p-4 mr-4`}
            >
              <div className="text-black position-relative font-bold text-lg mt-4 mb-4">Proficiency Test</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-9 mt-4 text-base leading-8">
                <Select
                  isMulti
                  name={`exams${index}`}
                  options={examOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(newValue) => {
                    return handleExamSelectionChange(index, newValue);
                  }}
                  value={examOptions.filter((option) => {
                    return experience.selectedExams?.includes(option.value);
                  })}
                />
              </div>
              {experience.selectedExams?.map((exam: string) => {
                return (
                  <React.Fragment key={`${index}-${exam}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-9 mt-4">
                      <SelectFieldWithLabel
                        id={`visarefusal-${index}-${exam}`}
                        label={`${exam} Previous Visa Refusal`}
                        options={[
                          'Not decided',
                          'Already gave the exam',
                          'Booked my exam',
                          'Planning to give the exam in next 2 months',
                        ]}
                        onChange={(event) => {
                          return handleExamDecisionChange(exam, index, event.target.value);
                        }}
                        name="visarefusal"
                        value={experiences[index].decision[exam]?.decision || ''}
                      />
                    </div>
                    {experience.decision &&
                      experience.decision[exam]?.decision === 'Already gave the exam' &&
                      renderScoreFields(exam, index)}
                  </React.Fragment>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  },
);
