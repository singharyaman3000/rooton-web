/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Priority from '../Priority';
import { useForm, Controller } from 'react-hook-form';
import { GotData } from '@/components/ToolsPage-Services/Priority/GotData';
import { useUser } from '@/components/LoginInPage/UserData';
import axios from 'axios';
import Select from 'react-select';
import { TailSpin } from 'react-loader-spinner';
import { H2 } from '@/components/H2';
import SnackbarAlert from '../Snackbar';
import { intake, languageProficiency, budgetOptions } from '@/components/ToolsPage-Services/CRS/crsStaticVar';
import getUserRole from '@/utils/userRole';
import ToggleSwitch from './ToggleSwitch';

interface OptionType {
  value: string;
  label: string;
}

const Loader = () => {
  return (
    <div className="px-6">
      <TailSpin
        visible
        height="20"
        width="20"
        color="#E7BA42"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export const CRS = () => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    control,
    formState: { isDirty, isValid },
  } = useForm({
    mode: 'onChange',
  });
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [levels, setLevels] = useState([]);
  const [fieldsOfStudy, setFieldsOfStudy] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [tableData, setTableData] = useState({ table1: [] });
  const [tableData2, setTableData2] = useState({ table2: [] });
  const [spin, setSpin] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userRole, setUserRole] = useState<string | undefined>(undefined);
  const [isToggled, setIsToggled] = useState(false);

  const handleWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    e.currentTarget.blur();
  };

  const handleSubmitForm = (formData: any) => {
    setSpin(true);
    setSubmitting(true);

    const majorAndFieldOfStudy = `${formData.major ? `${formData.major}, ` : ''}${formData.fieldOfStudy}`;

    formData.Duration = formData.Duration ? String(formData.Duration * 12) : '';
    const prepriority = [
      'Level',
      'Budget',
      'Duration',
      'Province',
      'Intake',
    ];
    let priorityOrder = prepriority;
    if (localStorage.getItem('prioritySaved')) {
      priorityOrder = JSON.parse(localStorage.getItem('prioritySaved') || '[]');
    }
    const dictionary: { [key: string]: any } = {
      FieldOfStudy: majorAndFieldOfStudy,
    };

    priorityOrder.forEach((priority: string) => {
      const key = priority.charAt(0) + priority.slice(1);
      if (priority === 'Province') {
        dictionary.Province = Array.isArray(formData.Province) ? formData.Province.join(', ') : '';
      } else if (priority === 'Level') {
        dictionary.Level = Array.isArray(formData.Level) ? formData.Level.join(', ') : '';
      } else {
        dictionary[key] = formData[key] !== undefined ? formData[key] : '';
      }
    });

    const levelString = Array.isArray(formData.Level) ? formData.Level.join(', ') : '';
    const dataToSend = {
      fos: majorAndFieldOfStudy,
      level: levelString,
      dictionary,
      LanguageProficiency: formData.LanguageProficiency,
      Score: formData.score,
      email,
      toggle: isToggled,
    };

    axios
      .post(`${process.env.NEXT_SERVER_API_BASE_URL}/api/recommend_courses`, dataToSend, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(async (response) => {
        const role = await getUserRole();
        setUserRole(role);
        setTableData({ table1: response.data.data.eligible || [] });
        setTableData2({ table2: response.data.data.noteligible || [] });
        setSubmitting(false);
        setSpin(false);
        setIsError(false);
      })
      .catch(() => {
        setSpin(false);
        setSubmitting(false);
        setIsError(true);
        if (formContainerRef.current) {
          formContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      });
  };

  const onSubmit = (data: any, event: any) => {
    event.preventDefault();
    setIsLoading(true);
    setSubmitting(true);
    setIsLoading(false);
    handleSubmitForm(data);
  };

  const renderSubmitButton = () => {
    return isLoading ? <Loader /> : 'Submit';
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      const response = await axios.get(`${process.env.NEXT_SERVER_API_BASE_URL}/api/dropdowns`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLevels(
        response.data.Level.map((level: any) => {
          return { value: level, label: level };
        }),
      );
      setFieldsOfStudy(
        response.data.FieldOfStudy.map((field: any) => {
          return { value: field, label: field };
        }),
      );
      setProvinces(
        response.data.Province.map((province: any) => {
          return { value: province, label: province };
        }),
      );
    };

    fetchData();
  }, []);

  useEffect(() => {
    let userEmail = '';
    if (user && user.Email) {
      userEmail = `${user.Email}`;
      localStorage.setItem('userEmail', userEmail);
    }
    setEmail(userEmail);
  }, [user]);

  const handleNextSection = () => {
    setCurrentSection(currentSection + 1);
  };

  const handlePreviousSection = () => {
    setCurrentSection(currentSection - 1);
  };

  useEffect(() => {
    if (spin && tableContainerRef.current) {
      tableContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [spin]);

  const section0 = (
    <>
      <div className="my-4">
        <div className="flex justify-between">
          <label className="text-lg font-medium leading-6 text-black" htmlFor="fieldOfStudy">
            Preferred Field Of Study
            <span className="text-[#ff0000]">*</span>
          </label>
          <div className='flex mb-1 hidden'>
            <ToggleSwitch isToggled={isToggled} onToggle={setIsToggled} />
            <label className="ml-2 text-lg font-small leading-6 text-black" htmlFor="fieldOfStudy">
              Fast Results (Experimental)
            </label>
          </div>

        </div>
        <Controller
          name="fieldOfStudy"
          control={control}
          rules={{ required: 'FIeld of Study is required' }}
          render={({ field: { onChange, value, ...field } }) => {
            const selectedOption =
              fieldsOfStudy.find((c: OptionType) => {
                return c.value === value;
              }) ?? null;

            return (
              <Select
                {...field}
                options={fieldsOfStudy}
                className="text-base leading-8"
                placeholder="Select Field Of Study"
                value={selectedOption}
                onChange={(val: OptionType | null) => {
                  if (val) {
                    onChange(val.value);
                  }
                }}
                getOptionLabel={(option) => {
                  return option.label;
                }}
                getOptionValue={(option) => {
                  return option.value;
                }}
                styles={{
                  option: (provided) => {
                    return {
                      ...provided,
                      color: 'black',
                    };
                  },
                  singleValue: (provided) => {
                    return {
                      ...provided,
                      color: 'black',
                    };
                  },
                }}
              />
            );
          }}
        />
      </div>

      <div className="my-4">
        <label className="text-lg font-medium leading-6 text-black" htmlFor={'major'}>
          {'Preferred Area of Specialization'}
          <span className="text-[#ff0000]">*</span>
        </label>
        <input
          type="text"
          className="w-full px-3 py-3 text-black font-normal text-base leading-6 border border-solid border-gray-300 bg-white"
          {...register('major', {
            required: true,
          })}
        />
      </div>

      <div className="my-4">
        <label className="text-lg font-medium leading-6 text-black" htmlFor="LevelOfStudy">
          Preferred Level Of Study<span className="text-[#ff0000]">*</span>
        </label>
        <Controller
          name="Level"
          control={control}
          rules={{ required: 'Level of Study is required' }}
          render={({ field }) => {
            return (
              <Select
                {...field}
                isMulti
                options={levels}
                placeholder="Select Level Of Study"
                className="text-base leading-8"
                value={levels.filter((option: OptionType) => {
                  return field.value ? field.value.includes(option.value) : false;
                })}
                onChange={(val) => {
                  return field.onChange(
                    val.map((c: OptionType | null) => {
                      return c?.value;
                    }),
                  );
                }}
                getOptionLabel={(option: OptionType) => {
                  return option.label;
                }}
                getOptionValue={(option: OptionType) => {
                  return option.value;
                }}
                styles={{
                  option: (provided) => {
                    return { ...provided, color: 'black' };
                  },
                  singleValue: (provided) => {
                    return { ...provided, color: 'black' };
                  },
                }}
              />
            );
          }}
        />
      </div>

      <div className="my-4">
        <label className="text-lg font-medium leading-6 text-black" htmlFor={'Budget'}>
          {'Preferred Budget'}
        </label>
        <select
          {...register('Budget')}
          placeholder="Your Budget"
          className="w-full px-3 py-3 text-black font-normal text-base leading-6 border border-solid border-gray-300 bg-white"
        >
          <option value="">Choose Your Budget</option>
          {budgetOptions.map((option, index) => {
            return (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
      <div className="my-4">
        <label className="text-lg font-medium leading-6 text-black" htmlFor={'Duration'}>
          {'Duration'}
        </label>
        <input
          type="number"
          {...register('Duration')}
          placeholder="Course Duration (In Years)"
          className="w-full px-3 py-3 text-black font-normal text-base leading-6 border border-solid border-gray-300 bg-white"
          onWheel={handleWheel}
        />
      </div>
    </>
  );

  const section1 = (
    <>
      <div className="my-4">
        <label className="text-lg font-medium leading-6 text-black" htmlFor="Province">
          Province
        </label>
        <Controller
          name="Province"
          control={control}
          render={({ field }) => {
            const { onChange, onBlur, value } = field;
            let valueArray: string[] = [];

            if (Array.isArray(value)) {
              valueArray = value;
            }

            const selectedOption = provinces.filter((option: OptionType) => { return valueArray.includes(option.value); });

            return (
              <Select
                {...field}
                isMulti
                options={provinces}
                className="text-base leading-8"
                placeholder="Select Province"
                value={selectedOption}
                closeMenuOnSelect={false}
                onChange={(newValue, actionMeta) => {
                  if (actionMeta.action === 'select-option' || actionMeta.action === 'remove-value' || actionMeta.action === 'clear') {
                    onChange(newValue != null ? newValue.map((option: OptionType) => { return option.value; }) : []);
                  }
                }}
                onBlur={onBlur}
                styles={{
                  option: (provided) => { return { ...provided, color: 'black' }; },
                  singleValue: (provided) => { return { ...provided, color: 'black' }; },
                }}
              />
            );
          }}
        />
      </div>

      <div className="my-4">
        <label className="text-lg font-medium leading-6 text-black" htmlFor={'Intake'}>
          {'Intake'}
        </label>
        <select
          className="w-full px-3 py-3 text-black font-normal text-base leading-6 border border-solid border-gray-300 bg-white"
          {...register('Intake')}
        >
          <option value="">Select your Intake</option>
          {intake.map((val) => {
            return (
              <option key={val} value={val} className="options">
                {val}
              </option>
            );
          })}
        </select>
      </div>
      <div className="my-4">
        <label className="text-lg font-medium leading-6 text-black" htmlFor={'LanguageProficiency'}>
          {'Choose yout LanguageProficiency test'}
        </label>
        <select
          className="w-full px-3 py-3 text-black font-normal text-base leading-6 border border-solid border-gray-300 bg-white"
          {...register('LanguageProficiency')}
        >
          <option value="">Select your test</option>
          {languageProficiency.map((val) => {
            return (
              <option key={val} value={val} className="options">
                {val}
              </option>
            );
          })}
        </select>
      </div>
      <div className="my-4">
        <label className="text-lg font-medium leading-6 text-black" htmlFor={'Score'}>
          {'Test Score'}
        </label>
        <input
          type="number"
          {...register('score')}
          step={0.5}
          onWheel={handleWheel}
          className="w-full px-3 py-3 text-black font-normal text-base leading-6 border border-solid border-gray-300 bg-white"
        />
      </div>
    </>
  );

  const renderCurrentSection = () => {
    return (
      <>
        <div style={{ display: currentSection === 0 ? 'block' : 'none' }}>{section0}</div>
        <div style={{ display: currentSection === 1 ? 'block' : 'none' }}>{section1}</div>
      </>
    );
  };

  const totalSections = 2;

  return (
    <div className="p-5 lg:px-[80px] lg:pt-[20px] mt-10 mb-10 m-auto max-w-screen-2xl" ref={formContainerRef}>
      <div className="flex flex-col">
        <div className="flex-1 flex flex-col md:flex-row">
          <div className="flex-1">
            <form
              className=" shadow-hubspot-form-shadow border border-golden-yellow justify-between relative overflow-hidden bg-pale-sandal"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* <div className='p-4 lg:pl-[60px] w-full lg:w-[95%] py-12 lg:pb-4 lg:pr-0 sm:p-12'><H2>{'Course Recommendation System'}</H2></div> */}
              <div className="flex flex-col sm:flex-row justify-between p-4 lg:pl-[60px] w-full lg:w-[95%] py-12 lg:pb-16 lg:pr-0 sm:p-12">
                <div className="w-full parent-allFields">
                  <div>
                    <H2 className='text-black'>Questionnaire</H2>
                    <div className="allFields">
                      <div className="formFields formFields-CRS">{renderCurrentSection()}</div>
                    </div>
                    <div className="flex justify-center">
                      <div className="flex flex-row justify-between w-full mt-10">
                        <button
                          className={`bg-black text-white px-4 py-3.5 min-w-[100px] text-sm font-bold ${currentSection === 0 ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          type="button"
                          onClick={handlePreviousSection}
                          disabled={currentSection === 0}
                        >
                          Back
                        </button>

                        {currentSection < totalSections - 1 && (
                          <button
                            className="bg-black text-white px-4 py-3.5 min-w-[100px] text-sm font-bold"
                            type="button"
                            onClick={handleNextSection}
                            disabled={!isDirty || !isValid || submitting || isLoading}
                          >
                            Next
                          </button>
                        )}

                        {currentSection === totalSections - 1 && (
                          <button
                            className={`bg-black text-white px-4 py-3.5 min-w-[100px] text-sm font-bold ${!isDirty || !isValid || submitting || isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            type="submit"
                            disabled={!isDirty || !isValid || submitting || isLoading}
                          >
                            {renderSubmitButton()}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="priorityFields w-full sm:w-[40%]  sm:ml-8">
                  <Priority />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full py-10 table_container" ref={tableContainerRef}>
          <GotData tableData={tableData} tableData2={tableData2} spin={spin} userRole={userRole} />
        </div>
        <SnackbarAlert
          open={isError}
          message="Oops! Looks like something went wrong. Please try again."
        />
      </div>
    </div>
  );
};
