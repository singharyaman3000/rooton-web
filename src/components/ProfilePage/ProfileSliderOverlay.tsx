/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import React, { useEffect, useState, useRef, RefObject } from 'react';
import { useHeaderData } from '@/hooks/HeaderDataProvider';
import { PersonalInformationFields } from './PersonalInformationFields';
import AdditionalInformationFields from './AdditionalInformationFields';
import { EducationalInformationFields } from './EducationalInformationFields';
import { EnglishCredentialFields } from './EnglishCredentialFields';
import { TravelHistoryFields } from './TravelHistoryFields';
import { WorkExperienceFields } from './WorkExperienceFields';
import style from './ProfilePage.module.css';
import { ProfileIcon, ProfileOrangeIcon } from '../Icons/ProfileIcon';
import { TailSpin } from 'react-loader-spinner';
import VisaHistoryField from './VisaHistoryFields';
import { SpouseFields } from './Spouse';
import { useParams } from 'next/navigation';
import axios from 'axios';
import SnackbarAlert from '../ToolsPage-Services/Snackbar';
import VistoIcon from '../Icons/VistoIcon';
import SignRetainerAgreementModal from './SignRetainerAgreementModal';

const Loader = () => {
  return (
    <div className="px-12">
      <TailSpin visible height="20" width="20" color="#E7BA42" ariaLabel="tail-spin-loading" radius="1" />
    </div>
  );
};

export const ProfileDataLoader = () => {
  return (
    <div className="flex justify-center items-center h-3/4">
      <TailSpin visible height="60" width="60" color="#E7BA42" ariaLabel="tail-spin-loading" radius="1" />
    </div>
  );
};

type ProfileInfo = {
  educationalExperiences?: any;
  spouseEducationalExperiences?: any;
  workExperiences?: any;
  spouseWorkExperiences?: any;
  travelHistories?: any;
  visaHistories?: any;
  englishCredentialInfo?: any;
  additionalInformation?: any;
  spouseData?: any;
  _id?: string;
};

type Payload = {
  email: string;
  profileInfo: ProfileInfo;
};

const ProfilePageComponent: React.FC<any> = () => {
  const { logo_name, email } = useHeaderData();
  const params = useParams();
  const emailValue = email || '';
  const nameParts = logo_name ? logo_name.split(' ') : ['', ''];
  const firstName = nameParts[0];
  const Lastname = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
  const [formData, setFormData] = useState({
    email: emailValue,
    Firstname: firstName,
    Lastname,
    Phone: '',
    dob: '',
    gender: '',
    maritalStatus: '',
    countryOfCitizenship: '',
    currentCountry_or_territoryofResidence: '',
    countryorterritory: '',
    countryorterritory_status: '',
    countryorterritory_startDate: '',
    countryorterritory_endDate: '',
    countryorterritory_other: '',
  });
  const [formEdited, setFormEdited] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('personalInfo');
  const [isSectionVisible, setIsSectionVisible] = useState<boolean>(true);
  const [shouldScrollToActiveSection, setShouldScrollToActiveSection] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingSaveAndNext, setLoadingSaveAndNext] = useState(false);
  const [saveStatus, setSaveStatus] = useState('Save');
  const personalInfoRef = useRef<HTMLDivElement>(null);
  const educationInfoRef = useRef<HTMLDivElement>(null);
  const workInfoRef = useRef<HTMLDivElement>(null);
  const travelInfoRef = useRef<HTMLDivElement>(null);
  const visaHistoryInfoRef = useRef<HTMLDivElement>(null);
  const addInfoRef = useRef<HTMLDivElement>(null);
  const [showSpouseSection, setShowSpouseSection] = useState(false);
  const [profileData, setProfileData] = useState<any>({});
  const [loadingProfileData, setLoadingProfileData] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { updateProfileState } = useHeaderData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const fetchProfileData = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoadingProfileData(false);
      return;
    }

    axios
      .get(`${process.env.NEXT_SERVER_API_BASE_URL}/api/profile-info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProfileData(response.data);
        setFormData((prevData) => {
          return {
            ...prevData,
            ...response.data,
          };
        });
        setLoadingProfileData(false);
      })
      .catch((error) => {
        if (error?.response && error?.response?.data?.detail) {
          setErrorMessage(error.response.data.detail);
        } else {
          setErrorMessage('Oops! Looks like something went wrong. Please try again.');
        }
        setLoadingProfileData(false);
      });
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem('token');

    if (!isLoggedIn) {
      const loginUrl = params.lang ? `/${params.lang}/login` : '/login';
      window.location.href = loginUrl;
    }
  }, [params.lang]);

  useEffect(() => {
    if (formData.maritalStatus === 'Married' || formData.maritalStatus === 'Common-Law') {
      setShowSpouseSection(true);
    } else {
      setShowSpouseSection(false);
    }
  }, [formData.maritalStatus]);

  type SectionRefs = {
    [key: string]: RefObject<HTMLDivElement>;
  };

  const sectionRefs: SectionRefs = {
    personalInfo: personalInfoRef,
    educationInfo: educationInfoRef,
    workInfo: workInfoRef,
    travelInfo: travelInfoRef,
    visaHistoryInfo: visaHistoryInfoRef,
    addInfo: addInfoRef,
  };

  useEffect(() => {
    if (formEdited) {
      setSaveStatus('Save');
    }
  }, [formEdited]);

  const handleFormChange = (section: string, field: any, value: string) => {
    if (section === 'personalInfo') {
      setFormData((prevData) => {
        return {
          ...prevData,
          [field]: value,
        };
      });
      setFormEdited(true);
    }
  };

  const handleEnglishCredentialChange = (englishCredentialData: any) => {
    setProfileData((prevProfileData: any) => {
      return {
        ...prevProfileData,
        englishCredentialInfo: englishCredentialData,
      };
    });
    setFormEdited(true);
  };

  useEffect(() => {
    if (shouldScrollToActiveSection) {
      const sectionRef = sectionRefs[activeSection];
      if (sectionRef && sectionRef.current) {
        window.scrollTo({
          top: sectionRef.current.getBoundingClientRect().top + window.pageYOffset - 150,
          behavior: 'smooth',
        });
      }
      setShouldScrollToActiveSection(false);
    }
  }, [shouldScrollToActiveSection, activeSection, sectionRefs]);

  const TABLET_VIEW_MAX_WIDTH = 768;

  const isMobileOrTabletView = () => {
    return typeof window !== 'undefined' && window.innerWidth <= TABLET_VIEW_MAX_WIDTH;
  };

  const handleSectionClick = (sectionKey: string) => {
    if (isMobileOrTabletView()) {
      if (activeSection === sectionKey) {
        setIsSectionVisible(!isSectionVisible);
        if (isSectionVisible) {
          setActiveSection('');
        }
      } else {
        setActiveSection(sectionKey);
        setIsSectionVisible(true);
        setShouldScrollToActiveSection(true);
      }
    } else {
      setActiveSection(sectionKey);
    }
  };

  type SectionButtonProps = {
    sectionKey: string;
    label: string;
  };
  // eslint-disable-next-line react/no-unstable-nested-components
  const SectionButton = ({ sectionKey, label }: SectionButtonProps) => {
    const isActive = activeSection === sectionKey && isSectionVisible;
    const Icon = isActive ? ProfileIcon : ProfileOrangeIcon;
    const buttonClasses = `flex justify-between items-center w-full px-4 py-6 text-left font-bold text-md ${
      isActive ? `${style.activeButton} ${style.stickyButton}` : style.inactiveButton
    }`;

    return (
      <button
        type="button"
        onClick={() => {
          return handleSectionClick(sectionKey);
        }}
        className={buttonClasses}
        style={{ width: '-webkit-fill-available' }}
      >
        <div>{label && <span>{label}</span>}</div>
        <div>
          {Icon && (
            <span>
              <Icon />
            </span>
          )}
        </div>
      </button>
    );
  };

  const handleVisaHistoryChange = (updatedVisaHistories: any) => {
    setProfileData((prevProfileData: any) => {
      return { ...prevProfileData, visaHistories: updatedVisaHistories };
    });
    setFormEdited(true); // Flag the form as edited
  };

  const handleEducationalChange = (section: string | string[], id: string, field: string, value: any) => {
    const newData = { ...profileData };

    const key = section === 'user' ? 'educationalExperiences' : 'spouseEducationalExperiences';
    const experiences = Array.isArray(newData[key]) ? newData[key] : [];
    const experienceIndex = experiences.findIndex((exp: { id: string }) => {
      return exp.id === id;
    });

    if (experienceIndex > -1) {
      experiences[experienceIndex][field] = value;
    } else {
      experiences.push({ id, [field]: value });
    }

    newData[key] = experiences;
    setProfileData(newData);
    setFormEdited(true);
  };

  const handleWorkExperienceChange = (section: string | string[], id: string, field: string | number, value: any) => {
    const updatedData = { ...profileData };

    const key = section === 'work' ? 'workExperiences' : 'spouseWorkExperiences';
    const experiences = Array.isArray(updatedData[key]) ? updatedData[key] : [];
    const index = experiences.findIndex((exp: { id: string }) => {
      return exp.id === id;
    });

    if (index !== -1) {
      experiences[index][field] = value;
    } else {
      experiences.push({ id, [field]: value });
    }

    updatedData[key] = experiences;
    setProfileData(updatedData);
    setFormEdited(true);
  };

  const handleTravelHistoryChange = (updatedHistories: any) => {
    setProfileData((prevProfileData: any) => {
      return {
        ...prevProfileData,
        travelHistories: updatedHistories,
      };
    });

    setFormEdited(true);
  };

  const handleEnglishCredentialExperiencesChange = (updatedExperiences: any) => {
    setProfileData((prevProfileData: any) => {
      return {
        ...prevProfileData,
        englishCredentialInfo: updatedExperiences, // Assumes englishCredentialInfo is the key for English credentials data
      };
    });
    setFormEdited(true); // Mark form as edited
  };

  const handleAdditionalInformationChange = (updatedInformation: any) => {
    setProfileData((prevProfileData: any) => {
      return { ...prevProfileData, additionalInformation: updatedInformation };
    });
    setFormEdited(true);
  };

  const handleSpouseDataChange = (updatedSpouseData: any) => {
    setProfileData((prevProfileData: any) => {
      return {
        ...prevProfileData,
        spouseData: updatedSpouseData,
      };
    });
    setFormEdited(true);
  };

  const getSectionData = () => {
    return [
      {
        key: 'personalInfo',
        label: 'Personal Information',
        content: loadingProfileData ? (
          <ProfileDataLoader />
        ) : (
          <PersonalInformationFields
            onChange={(field: any, value: any) => {
              return handleFormChange('personalInfo', field, value);
            }}
            value={formData}
            profileData={profileData}
          />
        ),
      },
      ...showSpouseSection
        ? [
          {
            key: 'spouseInfo',
            label: 'Spouse / Common-Law',
            content: loadingProfileData ? (
              <ProfileDataLoader />
            ) : (
              <SpouseFields
                onChange={handleSpouseDataChange}
                maritalStatus={profileData.maritalStatus}
                spouseData={profileData.spouseData ?? {}}
              />
            ),
          },
        ]
        : [],
      {
        key: 'educationInfo',
        label: 'Educational Experience',
        content: loadingProfileData ? (
          <ProfileDataLoader />
        ) : (
          <EducationalInformationFields
            onChange={handleEducationalChange}
            maritalStatus={formData.maritalStatus}
            profileData={profileData}
          />
        ),
      },
      {
        key: 'workInfo',
        label: 'Work Experience',
        content: loadingProfileData ? (
          <ProfileDataLoader />
        ) : (
          <WorkExperienceFields
            onChange={handleWorkExperienceChange}
            maritalStatus={formData.maritalStatus}
            profileData={profileData}
          />
        ),
      },
      {
        key: 'travelInfo',
        label: 'Travel History',
        content: loadingProfileData ? (
          <ProfileDataLoader />
        ) : (
          <TravelHistoryFields
            travelHistories={profileData.travelHistories || []}
            onTravelHistoryChange={handleTravelHistoryChange}
            ref={travelInfoRef}
          />
        ),
      },
      {
        key: 'engCredentialInfo',
        label: 'Proficiency Test',
        content: loadingProfileData ? (
          <ProfileDataLoader />
        ) : (
          <EnglishCredentialFields
            onChange={handleEnglishCredentialChange}
            onExperiencesChange={handleEnglishCredentialExperiencesChange} // Add this prop
            profileData={profileData.englishCredentialInfo ?? []}
          />
        ),
      },
      {
        key: 'visaHistoryInfo',
        label: 'Visa History',
        content: loadingProfileData ? (
          <ProfileDataLoader />
        ) : (
          <VisaHistoryField onChange={handleVisaHistoryChange} experiencesData={profileData.visaHistories || []} />
        ),
      },
      {
        key: 'addInfo',
        label: 'Additional Information',
        content: loadingProfileData ? (
          <ProfileDataLoader />
        ) : (
          <AdditionalInformationFields
            onChange={handleAdditionalInformationChange}
            data={profileData.additionalInformation ?? {}}
          />
        ),
      },
    ];
  };

  const sectionData = getSectionData();

  const renderSectionWithContent = () => {
    return sectionData.map((section) => {
      return (
        <React.Fragment key={section.key}>
          <SectionButton sectionKey={section.key} label={section.label} />
          {activeSection === section.key && isSectionVisible && (
            <div className={`${style.sectionContent} block lg:hidden`}>{section.content}</div>
          )}
        </React.Fragment>
      );
    });
  };

  const renderActiveSection = () => {
    switch (activeSection) {
    case 'personalInfo':
      if (loadingProfileData) {
        return <ProfileDataLoader />;
      }
      return (
        <PersonalInformationFields
          onChange={(field: any, value: any) => {
            return handleFormChange('personalInfo', field, value);
          }}
          value={formData}
          profileData={profileData}
        />
      );
    case 'spouseInfo':
      return (
      // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {showSpouseSection && (
            <SpouseFields
              onChange={handleSpouseDataChange}
              maritalStatus={profileData.maritalStatus}
              spouseData={profileData.spouseData ?? {}}
            />
          )}
        </>
      );
    case 'educationInfo':
      if (loadingProfileData) {
        return <ProfileDataLoader />;
      }
      return (
        <EducationalInformationFields
          onChange={handleEducationalChange}
          maritalStatus={formData.maritalStatus}
          profileData={profileData}
        />
      );
    case 'workInfo':
      if (loadingProfileData) {
        return <ProfileDataLoader />;
      }
      return (
        <WorkExperienceFields
          onChange={handleWorkExperienceChange}
          maritalStatus={formData.maritalStatus}
          profileData={profileData}
        />
      );
    case 'travelInfo':
      if (loadingProfileData) {
        return <ProfileDataLoader />;
      }
      return (
        <TravelHistoryFields
          travelHistories={profileData.travelHistories || []}
          onTravelHistoryChange={handleTravelHistoryChange}
          ref={travelInfoRef}
        />
      );
    case 'engCredentialInfo':
      if (loadingProfileData) {
        return <ProfileDataLoader />;
      }
      return (
        <EnglishCredentialFields
          onChange={handleEnglishCredentialChange}
          onExperiencesChange={handleEnglishCredentialExperiencesChange} // Add this prop
          profileData={profileData.englishCredentialInfo ?? []}
        />
      );
    case 'visaHistoryInfo':
      if (loadingProfileData) {
        return <ProfileDataLoader />;
      }
      return (
        <VisaHistoryField onChange={handleVisaHistoryChange} experiencesData={profileData.visaHistories || []} />
      );
    case 'addInfo':
      if (loadingProfileData) {
        return <ProfileDataLoader />;
      }
      return (
        <AdditionalInformationFields
          onChange={handleAdditionalInformationChange}
          data={profileData.additionalInformation ?? {}}
        />
      );
    default:
      return null;
    }
  };

  const sectionOrder = [
    'personalInfo',
    'spouseInfo',
    'educationInfo',
    'workInfo',
    'travelInfo',
    'engCredentialInfo',
    'visaHistoryInfo',
    'addInfo',
  ];

  const setNextSection = () => {
    const currentIndex = sectionOrder.indexOf(activeSection);
    let nextIndex = (currentIndex + 1) % sectionOrder.length;
    let nextSection = sectionOrder[nextIndex];

    // Check if we should skip the Spouse section based on the marital status
    if (nextSection === 'spouseInfo' && !showSpouseSection) {
      // Skip the spouseInfo section
      nextIndex = (nextIndex + 1) % sectionOrder.length;
      nextSection = sectionOrder[nextIndex];
    }

    setActiveSection(nextSection);
  };

  const apiCall = async (actionType: any, payload: any, callback: () => void) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    try {
      setSnackbarOpen(false);
      await axios.put(`${process.env.NEXT_SERVER_API_BASE_URL}/api/update-profile-info`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSaveStatus('Saved !');
      setFormEdited(false);
      callback();
      updateProfileState('UPDATED');
    } catch (error: any) {
      setLoadingSaveAndNext(false);
      setLoadingSave(false);
      setSnackbarOpen(true);
      if (axios.isAxiosError(error) && error.response) {
        const apiErrorMessage = error?.response?.data?.detail || error?.message || error;
        setErrorMessage(apiErrorMessage);
        // Check for 404 status code and handle accordingly
        if (error?.response?.status === 404) {
          localStorage.clear();
          const loginUrl = params.lang ? `/${params.lang}/login` : '/login';
          window.location.href = loginUrl;
        }
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
      updateProfileState('');
    }
  };

  const handleSave = () => {
    setLoadingSave(true);
    const payload: Payload = {
      email: formData.email,
      profileInfo: {
        ...formData,
        educationalExperiences: profileData.educationalExperiences ?? [],
        spouseEducationalExperiences: showSpouseSection ? profileData.spouseEducationalExperiences ?? [] : [],
        workExperiences: profileData.workExperiences ?? [],
        spouseWorkExperiences: showSpouseSection ? profileData.spouseWorkExperiences ?? [] : [],
        travelHistories: profileData.travelHistories ?? [],
        visaHistories: profileData.visaHistories ?? [],
        englishCredentialInfo: profileData.englishCredentialInfo ?? [],
        additionalInformation: profileData.additionalInformation,
        spouseData: profileData.spouseData ?? {},
      },
    };

    delete payload.profileInfo._id;

    apiCall('SAVE', payload, () => {
      setLoadingSave(false);
      fetchProfileData();
    });
  };

  const handleSaveAndNext = () => {
    setLoadingSaveAndNext(true);

    const payload: Payload = {
      email: formData.email,
      profileInfo: {
        ...formData,
        educationalExperiences: profileData.educationalExperiences ?? [],
        spouseEducationalExperiences: showSpouseSection ? profileData.spouseEducationalExperiences ?? [] : [],
        workExperiences: profileData.workExperiences ?? [],
        spouseWorkExperiences: showSpouseSection ? profileData.spouseWorkExperiences ?? [] : [],
        travelHistories: profileData.travelHistories ?? [],
        visaHistories: profileData.visaHistories ?? [],
        englishCredentialInfo: profileData.englishCredentialInfo ?? [],
        additionalInformation: profileData.additionalInformation,
        spouseData: profileData.spouseData ?? {},
      },
    };

    delete payload.profileInfo._id;

    apiCall('SAVE_AND_NEXT', payload, () => {
      setLoadingSaveAndNext(false);
      setNextSection();
      fetchProfileData();
    });
  };

  return (
    <>
      {/* About Us Banner Section */}
      <div className={`${style.container} bg-[#FFF6E7]`}>
        <aside className={`${style.scrollableSidebar} mb-4 lg:mb-0`}>{renderSectionWithContent()}</aside>
        <div
          className={`${style.mainContainer} md:w-3/4 pl-4 pb-4 bg-[#FFF6E7] hidden lg:block`}
          style={{ width: '-webkit-fill-available' }}
        >
          <div className={`${style.scrollableContent} ${style.mainContent} hidden lg:block`}>
            {renderActiveSection()}
          </div>
          <div className={`${style.buttonContainer} flex flex-col sm:flex-row justify-between`}>
            <button
              onClick={handleSave}
              className="bg-[#000] text-white py-3 px-6 focus:outline-none w-[11rem] min-w-[11rem] max-w-[11rem] focus:shadow-outline mt-4"
              type="submit"
              disabled={!formEdited || loadingSave}
            >
              {loadingSave ? <Loader /> : saveStatus}
            </button>
            <button
              onClick={toggleModal}
              className="bg-[#000] text-white py-3 px-6 focus:outline-none w-[11rem] min-w-[11rem] max-w-[11rem] focus:shadow-outline mt-4"
              type="button"
            >
              <div className='flex items-center justify-center gap-2 w-max'>Onboard to <VistoIcon /></div>
            </button>
            <button
              onClick={handleSaveAndNext}
              className="bg-[#000] text-white py-3 px-6 focus:outline-none w-[11rem] min-w-[11rem] max-w-[11rem] focus:shadow-outline mt-4 hidden lg:block"
              type="submit"
              disabled={!formEdited || loadingSaveAndNext}
            >
              {loadingSaveAndNext ? <Loader /> : 'Save and Next'}
            </button>
          </div>
        </div>
      </div>
      <SignRetainerAgreementModal
        toggleModal={toggleModal}
        docShorthand='sv'
        email={formData.email}
        isModalOpen={isModalOpen}
      />

      <SnackbarAlert open={snackbarOpen} message={errorMessage} />
    </>
  );
};

export default ProfilePageComponent;
