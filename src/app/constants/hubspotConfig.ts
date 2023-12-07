export const FormConstants = {
  NEWS_LETTER: {
    region: 'na1',
    portalId: '7535538',
    formId: '6c79b7c2-a0bc-4f4e-a8ce-322859294240',
  },
  SERVICE: {
    hubspotSrc: 'https://js.hsforms.net/forms/embed/v2.js',
  },
};

export const servicesForm = {
  form1: 'c0a0d9c3-2cc1-4c4a-acab-bff28496cdf7',
};

interface AdditionalStateWork {
  [key: string]: {
    occupation: string;
    typeOfJob: string;
    whenWasWork: string;
    lengthOfWork: string;
    locationOfWork: string;
    workHours: string;
    provinceOrTerritoryOfWork: string;
    workPermitType: string;
  };
}

interface AdditionalStateEducation {
  [key: string]: {
    educationType: string;
    educationDuration: string;
    educationCompletedOrNot: string;
    educationPlace: string;
    educationPlaceInCanada: string;
    territoryCheckAtlantic: string;
  };
}

export const generateAdditionalStateWork = (): AdditionalStateWork => {
  const additionalStateWork: AdditionalStateWork = {};
  let i = 1;
  while (i <= 6) {
    const workKey = `work${i}`;
    additionalStateWork[workKey] = {
      occupation: `occupation_${i}`,
      typeOfJob: `type_of_job_${i}`,
      whenWasWork: `when_was_work_${i}`,
      lengthOfWork: `length_of_work_${i}`,
      locationOfWork: `location_of_work_${i}`,
      workHours: `work_hours_for_work_${i}`,
      provinceOrTerritoryOfWork: `province_or_territory_of_work_${i}`,
      workPermitType: `what_type_of_work_permit_do_you_currently_hold_for_work_${i}`,
    };
    i += 1;
  }
  return additionalStateWork;
};

export const generateAdditionalStateEducation = (): AdditionalStateEducation => {
  const additionalStateEducation: AdditionalStateEducation = {};
  let i = 1;
  while (i <= 6) {
    const eduKey = `edu${i}` as keyof AdditionalStateEducation;
    additionalStateEducation[eduKey] = {
      educationType: `type_of_education_or_training_${i}`,
      educationDuration: `duration_of_education_or_training_${i}`,
      educationCompletedOrNot: `completed_the_education_or_training_${i}`,
      educationPlace: `location_of_education_or_training_${i}`,
      educationPlaceInCanada: `province_of_education_or_training_${i}`,
      territoryCheckAtlantic: `have_you_lived_in_one_of_canada_s_atlantic_provinces_for_education_or_training_${i}`,
    };
    i += 1;
  }
  return additionalStateEducation;
};
