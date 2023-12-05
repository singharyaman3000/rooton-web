export type OptionType = {
  id: string;
  value: string;
};
export interface IFormField {
  label: string;
  name: string;
}

export interface IFormFieldOptions {
  label: string;
  name: string;
  options: OptionType[];
}

// =================================== COMMON CONSTANTS ====================================================

const placesInCanada = [
  { id: 'ca-ab', value: 'Alberta, Canada' },
  { id: 'ca-bc', value: 'British Columbia, Canada' },
  { id: 'ca-mb', value: 'Manitoba, Canada' },
  { id: 'ca-nb', value: 'New Brunswick, Canada' },
  { id: 'ca-nl', value: 'Newfoundland and Labrador, Canada' },
  { id: 'ca-nt', value: 'Northwest Territories, Canada' },
  { id: 'ca-ns', value: 'Nova Scotia, Canada' },
  { id: 'ca-nu', value: 'Nunavut, Canada' },
  { id: 'ca-on', value: 'Ontario, Canada' },
  { id: 'ca-pe', value: 'Prince Edward Island, Canada' },
  { id: 'ca-qc', value: 'Quebec, Canada' },
  { id: 'ca-sk', value: 'Saskatchewan, Canada' },
  { id: 'ca-yt', value: 'Yukon, Canada' },
];

const educationTypeOptions = [
  { id: 'PhD', value: 'PhD' },
  { id: 'Master', value: 'Master\'s' },
  { id: 'Bachelor', value: 'Bachelor\'s' },
  { id: 'Diploma', value: 'College or Non-University' },
  { id: 'Technical_Diploma', value: 'Professional or Vocational' },
  { id: 'Apprenticeship', value: 'Apprenticeship' },
  { id: 'Trade_Certificate', value: 'Trade Certificate' },
  { id: 'Associates_Degree', value: 'Associate\'s Degree' },
  { id: 'Other', value: 'Other' },
];

const workHistoryDurationOptions = [
  { id: '0.25', value: '3 months' },
  { id: '0.5', value: '6 months' },
  { id: '0.75', value: '9 months' },
  { id: '1', value: '1 Year' },
  { id: '2', value: '2 Years' },
  { id: '3', value: '3 Years' },
  { id: '4', value: '4 Years' },
  { id: '5', value: '5 Years' },
  { id: '6', value: '6 Years' },
  { id: '7', value: '7 Years' },
  { id: '8', value: '8 Years' },
  { id: '9', value: '9 Years' },
  { id: '10', value: '10 Years or more' },
];

const workHistoryTimeframeOptions = [
  { id: '0', value: 'Currently Working' },
  { id: '1', value: 'Finished less than 1 year ago' },
  { id: '2', value: 'Finished less than 2 years ago' },
  { id: '3', value: 'Finished less than 3 years ago' },
  { id: '4', value: 'Finished less than 4 years ago' },
  { id: '5', value: 'Finished less than 5 years ago' },
  { id: '6', value: 'Finished less than 6 years ago' },
  { id: '7', value: 'Finished less than 7 years ago' },
  { id: '8', value: 'Finished less than 8 years ago' },
  { id: '9', value: 'Finished less than 9 years ago' },
  { id: '10', value: 'Finished MORE than 9 years ago' },
];

const relationships = [
  { id: 'father', value: 'Father' },
  { id: 'mother', value: 'Mother' },
  { id: 'brother', value: 'Brother' },
  { id: 'sister', value: 'Sister' },
  { id: 'uncle', value: 'Uncle' },
  { id: 'aunt', value: 'Aunt' },
  { id: 'grandfather', value: 'Grandfather' },
  { id: 'grandmother', value: 'Grandmother' },
  { id: 'cousin', value: 'Cousin' },
  { id: 'nephew', value: 'Nephew' },
  { id: 'niece', value: 'Niece' },
  { id: 'son', value: 'Son' },
  { id: 'daughter', value: 'Daughter' },
];

const residentStatus = [
  { id: 'citizen', value: 'Citizen' },
  { id: 'permanentResident', value: 'Permanent Resident' },
  { id: 'temporaryResident', value: 'Temporary Resident' },
  { id: 'workPermitHolder', value: 'Work Permit Holder' },
  { id: 'studyPermitHolder', value: 'Study Permit Holder' },
  { id: 'Other', value: 'Other' },
];

const britishColumbiaDistricts = [
  { id: 'Stikine', value: 'Stikine' },
  { id: 'Central Coast', value: 'Central Coast' },
  { id: 'Northern Rockies', value: 'Northern Rockies' },
  { id: 'Mount Waddington', value: 'Mount Waddington' },
  { id: 'Skeena-Queen Charlotte', value: 'Skeena-Queen Charlotte' },
  { id: 'Powell River', value: 'Powell River' },
  { id: 'Sunshine Coast', value: 'Sunshine Coast' },
  { id: 'Kootenay-Boundary', value: 'Kootenay-Boundary' },
  { id: 'Alberni-Clayoquot', value: 'Alberni-Clayoquot' },
  { id: 'Kitimat-Stikine', value: 'Kitimat-Stikine' },
  { id: 'Bulkley-Nechako', value: 'Bulkley-Nechako' },
  { id: 'Squamish-Lillooet', value: 'Squamish-Lillooet' },
  { id: 'Strathcona', value: 'Strathcona' },
  { id: 'Columbia-Shuswap', value: 'Columbia-Shuswap' },
  { id: 'East Kootenay', value: 'East Kootenay' },
  { id: 'Peace River', value: 'Peace River' },
  { id: 'Comox Valley', value: 'Comox Valley' },
  { id: 'Cariboo', value: 'Cariboo' },
  { id: 'Central Kootenay', value: 'Central Kootenay' },
  { id: 'Okanagan-Similkameen', value: 'Okanagan-Similkameen' },
  { id: 'Cowichan Valley', value: 'Cowichan Valley' },
  { id: 'North Okanagan', value: 'North Okanagan' },
  { id: 'Fraser-Fort George', value: 'Fraser-Fort George' },
  { id: 'Thompson-Nicola', value: 'Thompson-Nicola' },
  { id: 'Nanaimo', value: 'Nanaimo' },
  { id: 'Central Okanagan', value: 'Central Okanagan' },
  { id: 'Capital', value: 'Capital' },
  { id: 'Fraser Valley', value: 'Fraser Valley' },
  { id: 'Greater Vancouver', value: 'Greater Vancouver' },
];

const incomeOptions = [
  { id: '9999', value: 'Less than 10,000' },
  { id: '10000', value: 'Between 10,000 and 25,000' },
  { id: '25000', value: 'Between 25,000 and 100,000' },
  { id: '100000', value: 'Between 100,000 and 500,000' },
  { id: '500000', value: 'Between 500,000 and 1,000,000' },
  { id: '1000000', value: 'Between 1,000,000 and 2,000,000' },
  { id: '2000000', value: 'More than 2,000,000' },
];

const canadaIncomeOptions = [
  { id: '100000', value: '$100,000 and above' },
  { id: '97500', value: '$97,500 to $99,999' },
  { id: '95000', value: '$95,000 to $97,499' },
  { id: '92500', value: '$92,500 to $94,999' },
  { id: '90000', value: '$90,000 to $92,499' },
  { id: '87500', value: '$87,500 to $89,999' },
  { id: '85000', value: '$85,000 to $87,499' },
  { id: '82500', value: '$82,500 to $84,999' },
  { id: '80000', value: '$80,000 to $82,499' },
  { id: '77500', value: '$77,500 to $79,999' },
  { id: '75000', value: '$75,000 to $77,499' },
  { id: '72500', value: '$72,500 to $74,999' },
  { id: '70000', value: '$70,000 to $72,499' },
  { id: '67500', value: '$67,500 to $69,999' },
  { id: '65000', value: '$65,000 to $67,499' },
  { id: '62500', value: '$62,500 to $64,999' },
  { id: '60000', value: '$60,000 to $62,499' },
  { id: '57500', value: '$57,500 to $59,999' },
  { id: '55000', value: '$55,000 to $57,499' },
  { id: '52500', value: '$52,500 to $54,999' },
  { id: '50000', value: '$50,000 to $52,499' },
  { id: '47500', value: '$47,500 to $49,999' },
  { id: '45000', value: '$45,000 to $47,499' },
  { id: '42500', value: '$42,500 to $44,999' },
  { id: '40000', value: '$40,000 to $42,499' },
  { id: '38750', value: '$38,750 to $39,999' },
  { id: '37500', value: '$37,500 to $38,749' },
  { id: '36250', value: '$36,250 to $37,499' },
  { id: '35000', value: '$35,000 to $36,249' },
  { id: '33750', value: '$33,750 to $34,999' },
  { id: '32500', value: '$32,500 to $33,749' },
  { id: '31250', value: '$31,250 to $32,499' },
  { id: '30000', value: '$30,000 to $31,249' },
  { id: '28750', value: '$28,750 to $29,999' },
  { id: '27500', value: '$27,500 to $28,749' },
  { id: '26250', value: '$26,250 to $27,499' },
  { id: '25000', value: '$25,000 to $26,249' },
  { id: '24999', value: 'less than $25,000' },
];

// ===================================== PERSONAL PROFILE ==================================================

const childCount13 = [
  { id: 'cc1-13', value: '1' },
  { id: 'cc2-13', value: '2' },
  { id: 'cc3-13', value: '3' },
  { id: 'cc4-13', value: '4 or more' },
];

const childCount21 = [
  { id: 'cc1-22', value: '1' },
  { id: 'cc2-22', value: '2' },
  { id: 'cc3-22', value: '3' },
  { id: 'cc4-22', value: '4 or more' },
];

export const ageGroups: IFormFieldOptions[] = [
  {
    name: 'age',
    label: 'Age',
    options: [
      { id: 'under18', value: 'Under 18' },
      ...Array.from({ length: 43 }, (_, index) => {
        return {
          id: `${index + 18}`,
          value: `${index + 18}`,
        };
      }),
      { id: 'over60', value: 'Over 60' },
    ],
  },
];

export const countriesOfCitizenship: IFormFieldOptions[] = [
  {
    name: 'country_of_citizenship',
    label: 'Country of Citizenship',
    options: [] as OptionType[],
  },
];

export const countriesOfResidence: IFormFieldOptions[] = [
  {
    name: 'country_of_residence',
    label: 'Country of Residence',
    options: [] as OptionType[],
  },
];

export const maritalStatusForm: IFormFieldOptions[] = [
  {
    name: 'martial_status',
    label: 'Marital Status',
    options: [
      { id: 'married', value: 'Married' },
      { id: 'single', value: 'Single' },
      { id: 'common-law-partner', value: 'Common-law-partner' },
    ],
  },
];

export const children: IFormFieldOptions[] = [
  {
    name: 'children_under_22',
    label: 'Do you have any children under the age of 22?',
    options: [
      { id: 'cu-yes', value: 'Yes' },
      { id: 'cu-no', value: 'No' },
    ],
  },
];

export const childCountUnder22: IFormFieldOptions[] = [
  {
    name: 'children_count_13_to_21',
    label: 'How many children do you have aged 13 to 21?',
    options: childCount21,
  },
];

export const childCountUnder13: IFormFieldOptions[] = [
  {
    name: 'children_count_under_13',
    label: 'How many children do you have under the age of 13?',
    options: childCount13,
  },
];

export const destinationInCanada: IFormFieldOptions[] = [
  {
    name: 'preferred_destination_in_canada ',
    label: 'Preferred Destination in Canada  ',
    options: placesInCanada,
  },
];

export const manitobaPreference: IFormFieldOptions[] = [
  {
    name: 'where_in_manitoba_wish_to_reside',
    label: 'Where in Manitoba you wish to reside',
    options: [
      { id: 'inside_winnipeg', value: 'Inside Winnipeg' },
      { id: 'outside_winnipeg', value: 'Outside Winnipeg' },
      { id: 'no_preference', value: 'No preference/I don\'t know' },
    ],
  },
];

export const quebecHistory: IFormFieldOptions[] = [
  {
    name: 'ever_been_to_quebec_before',
    label: 'Have you ever been to Quebec Before?',
    options: [
      { id: 'quebec_yes', value: 'Yes' },
      { id: 'quebec_no', value: 'No' },
    ],
  },
];

// =================================== LANGUAGE SKILLS SECTION ===========================================

const languageLevels = [
  { id: 'lvl10', value: 'Expert' },
  { id: 'lvl9', value: 'Very good' },
  { id: 'lvl8', value: 'Good' },
  { id: 'lvl7', value: 'Competent' },
  { id: 'lvl6', value: 'Modest' },
  { id: 'lvl5', value: 'Limited' },
  { id: 'lvl0', value: 'None at all' },
];

export const englishWritingLevels = [
  {
    name: 'english_write',
    label: 'English Writing',
    options: languageLevels,
  },
];

export const englishReadingLevels = [
  {
    name: 'english_reading',
    label: 'English Reading',
    options: languageLevels,
  },
];

export const englishSpeakingLevels = [
  {
    name: 'english_speak',
    label: 'English Speaking',
    options: languageLevels,
  },
];
export const englishListeningLevels = [
  {
    name: 'english_listen',
    label: 'English Listening',
    options: languageLevels,
  },
];

export const frenchWritingLevels = [
  {
    name: 'french_write',
    label: 'French Writing',
    options: languageLevels,
  },
];

export const frenchReadingLevels = [
  {
    name: 'french_reading',
    label: 'French Reading',
    options: languageLevels,
  },
];

export const frenchSpeakingLevels = [
  {
    name: 'french_speak',
    label: 'French Speaking',
    options: languageLevels,
  },
];
export const frenchListeningLevels = [
  {
    name: 'french_listen',
    label: 'French Listening',
    options: languageLevels,
  },
];

// ============================================== EDUCATION AND TRAINING ===================================

export const highSchool: IFormFieldOptions[] = [
  {
    name: 'highschool_completed',
    label: 'Have you completed high school (secondary school)?',
    options: [
      { id: 'et-hc-yes', value: 'Yes' },
      { id: 'et-hc-no', value: 'No' },
    ],
  },
];

export const training: IFormFieldOptions[] = [
  {
    name: 'training_attended',
    label: 'Have you received any education or training other than high school (secondary school)? ',
    options: [
      { id: 'et-ta-yes', value: 'Yes' },
      { id: 'et-ta-no', value: 'No' },
    ],
  },
];

const degreeDurationOptions = [
  { id: '0', value: 'Less than 3 months' },
  { id: '0.5', value: '3 months and less than 6 months' },
  { id: '0.9', value: '6 months and less than 12 months' },
  { id: '1', value: '1 Academic year' },
  { id: '2', value: '2 Academic years' },
  { id: '3', value: '3 Academic years' },
  { id: '4', value: '4 Academic years or more' },
];
export const educationType: IFormFieldOptions[] = [
  {
    name: 'education_type',
    label: 'Type of Program',
    options: educationTypeOptions,
  },
];
export const educationDuration: IFormFieldOptions[] = [
  {
    name: 'program_duration',
    label: 'Program Duration',
    options: degreeDurationOptions,
  },
];

export const educationCompletedOrNot: IFormFieldOptions[] = [
  {
    name: 'education_completed',
    label: 'Did you complete this program? ',
    options: [
      { id: 'et-ec-yes', value: 'Yes' },
      { id: 'et-ec-no', value: 'No' },
    ],
  },
];

export const educationPlace: IFormFieldOptions[] = [
  {
    name: 'education_place',
    label: 'Education Location',
    options: [
      { id: 'et-ec-yes', value: 'Inside Canada' },
      { id: 'et-ec-no', value: 'Outside Canada' },
    ],
  },
];

export const educationPlaceInCanada: IFormFieldOptions[] = [
  {
    name: 'education_place_in_canada',
    label: 'Education Province or Territory in Canada',
    options: placesInCanada,
  },
];

export const territoryCheck: IFormFieldOptions[] = [
  {
    name: 'have_you_lived_in_canada_atlantic_provinces',
    label:
      'Have you lived in one of Canada’s Atlantic provinces (New Brunswick, Newfoundland and Labrador, Nova Scotia, or Prince Edward Island) for at least 16 months in the 2 years before getting your degree, diploma or educational credential?',
    options: [
      { id: 'ca-atl-yes', value: 'Yes' },
      { id: 'ca-atl-no', value: 'No' },
    ],
  },
];

// ================================================ WORK HISTORY ===============================================

const workPermitOptions = [
  { id: 'LMIA', value: 'LMIA (previously LMO) based work permit' },
  {
    id: 'NAFTA',
    value: 'NAFTA Work Permit (including Professionals, Traders and Investors)',
  },
  { id: 'Treaty', value: 'Treaty Permit (other than NAFTA)' },
  { id: 'Intra-Company', value: 'Intra-Company Transfer Work Permit' },
  { id: 'Post-Graduate', value: 'Post-Graduate Work Permit' },
  { id: 'Co-op', value: 'Co-op Work Permit' },
  {
    id: 'IEC',
    value: 'International Experience Canada (IEC) / Working Holiday Work Permit',
  },
  { id: 'Congugal', value: 'Spousal Open Work Permit' },
  { id: 'Seasonal-Agriculture', value: 'Seasonal Agriculture Work Permit' },
  { id: 'Don\'t-know', value: 'I am not sure / Other' },
];

export const workHistoryOrNot: IFormFieldOptions[] = [
  {
    name: 'work_history_paid?',
    label: 'Have you done any paid work during the last 10 years?',
    options: [
      { id: 'wh-whp-yes', value: 'Yes' },
      { id: 'wh-whp-no', value: 'No' },
    ],
  },
];

export const workHistoryOccupation: IFormFieldOptions[] = [
  {
    name: 'work_history_occupation',
    label: 'Occupation',
    options: [] as OptionType[],
  },
];

export const workHistoryLength: IFormFieldOptions[] = [
  {
    name: 'work_history_length',
    label: 'Length of Work',
    options: workHistoryDurationOptions,
  },
];

export const workHistoryWhen: IFormFieldOptions[] = [
  {
    name: 'work_history_when',
    label: 'When',
    options: workHistoryTimeframeOptions,
  },
];

export const workHistoryWorkHour: IFormFieldOptions[] = [
  {
    name: 'work_history_work_hour',
    label: 'Work hours ',
    options: [
      { id: 'wh-whwh-full', value: 'Full Time (At least 30 hours per week)' },
      { id: 'wh-whwh-part', value: 'Part Time (At least 15 hours per week)' },
      { id: 'wh-whwh-less', value: 'Less than 15 hours per week' },
    ],
  },
];

export const workHistoryType: IFormFieldOptions[] = [
  {
    name: 'work_history_type',
    label: 'Type of Job  ',
    options: [
      {
        id: 'wh-wht-yes',
        value: 'On the payroll of any organization (i.e. commercial, governmental or other)',
      },
      {
        id: 'wh-wht-no',
        value: 'Self-Employed or working for your own company or business',
      },
    ],
  },
];

export const workHistoryPlace: IFormFieldOptions[] = [
  {
    name: 'work_history__place',
    label: 'Work History Location',
    options: [
      { id: 'wh-whc-yes', value: 'Inside Canada' },
      { id: 'wh-whc-no', value: 'Outside Canada' },
    ],
  },
];

export const workHistoryPlaceInCanada: IFormFieldOptions[] = [
  {
    name: 'work_history_place_in_canada',
    label: 'Work History Province or Territory',
    options: placesInCanada,
  },
];

export const workHistoryWorkPermit: IFormFieldOptions[] = [
  {
    name: 'work_history_work_permit',
    label: 'What type of Work Permit do you currently hold?  ',
    options: workPermitOptions,
  },
];

// ================================= EXPRESS ENTRY PROFILE =======================================

export const expressEntrySubmitted: IFormFieldOptions[] = [
  {
    name: 'submittedProfile_expressEntry',
    label: 'Have you already submitted an Express Entry profile to the Government of Canada within the past 12 months?',
    options: [
      { id: 'ee-sp-yes', value: 'Yes' },
      { id: 'ee-sp-no', value: 'No' },
    ],
  },
];

export const expressEntryInvitation = [
  {
    name: 'receivedInvitation_expressEntry',
    label:
      'Have you already received an Invitation to Apply for permanent residence from the Government of Canada through the Express Entry system?',
    options: [
      { id: 'ee-ri-yes', value: 'Yes' },
      { id: 'ee-ri-no', value: 'No' },
    ],
  },
];

// ================================== CANADIAN JOB OFFER ===============================================

export const haveWrittenOffer: IFormFieldOptions[] = [
  {
    name: 'written_job_offer_from_a_Canadian_employer? ',
    label: 'Do you have a written job offer from a Canadian employer? ',
    options: [
      { id: 'hwo-yes', value: 'Yes' },
      { id: 'hwo-no', value: 'No' },
    ],
  },
];

export const occupation: IFormFieldOptions[] = [
  {
    name: 'occupation_canada ',
    label: 'Occupation',
    options: [] as OptionType[],
  },
];

export const workProvinceTerritory: IFormFieldOptions[] = [
  {
    name: 'work_province or_territory   ',
    label: 'Province or Territory   ',
    options: placesInCanada,
  },
];

export const contractDurationOptions: IFormFieldOptions[] = [
  {
    name: 'job_contract_duration',
    label: 'What is the contract duration?',
    options: [
      { id: 'twoYearsOrLonger', value: 'Two years or longer' },
      { id: 'betweenOneAndTwoYears', value: 'Between one and two years' },
      {
        id: 'betweenSixMonthsAndOneYear',
        value: 'Between six months and one year',
      },
      { id: 'lessThanSixMonths', value: 'Less than six months' },
    ],
  },
];

export const workHoursOptions: IFormFieldOptions[] = [
  {
    name: 'work_hour_options',
    label: 'Work hours',
    options: [
      { id: 'fullTime', value: 'Full Time (At least 30 hours per week)' },
      { id: 'partTime', value: 'Part Time (At least 15 hours per week)' },
      { id: 'lessThan15Hours', value: 'Less than 15 hours per week' },
    ],
  },
];

export const jobOfferUnderLIMA: IFormFieldOptions[] = [
  {
    name: 'is_job_offer_under_LIMA',
    label: 'Is this Job Offer supported by a Labour Market Impact Assessment (LMIA)?  ',
    options: [
      { id: 'jou-yes', value: 'Yes' },
      { id: 'jou-no', value: 'No' },
      { id: 'jou-dont', value: 'I don\'t know' },
    ],
  },
];

export const jobOfferUnderAtlanticProvince: IFormFieldOptions[] = [
  {
    name: 'Has_the_employer_offering_this_job_been_designated_as_an_employer_taking_part_in_the_Atlantic_Immigration_Pilot_by_the_Atlantic_province',
    label:
      'Has the employer offering this job been designated as an employer taking part in the Atlantic Immigration Pilot by the Atlantic province?  ',
    options: [
      { id: 'jouap-yes', value: 'Yes' },
      { id: 'jouap-no', value: 'No' },
      { id: 'jouap-dont', value: 'I don\'t know' },
    ],
  },
];

export const jobOfferFieldSaskatchewan: IFormFieldOptions[] = [
  {
    name: 'is_job_offer_related_to_your_field_of_study',
    label: 'Is this job offer related to your field of study? ',
    options: [
      { id: 'jof-yes', value: 'Yes' },
      { id: 'jof-no', value: 'No' },
      { id: 'jof-dont', value: 'I don\'t know' },
    ],
  },
];

export const jobOfferFieldManitoba: IFormFieldOptions[] = [
  {
    name: 'you_received_an_Invitation_to_Apply_from_the_Manitoba_Provincial_Nominee_Program',
    label: 'Have you received an Invitation to Apply from the Manitoba Provincial Nominee Program?  ? ',
    options: [
      { id: 'jofm-yes', value: 'Yes' },
      { id: 'jofm-no', value: 'No' },
      { id: 'jofm-dont', value: 'I don\'t know' },
    ],
  },
];

export const jobOfferFieldAlberta: IFormFieldOptions[] = [
  {
    name: 'Do_you_have_related_education,_training,_previous_work_experience_and_any_Alberta_licensing_needed_for_this_position?  ',
    label:
      'Do you have related education, training, previous work experience and any Alberta licensing needed for this position? ',
    options: [
      { id: 'jofa-yes', value: 'Yes' },
      { id: 'jofa-no', value: 'No' },
      { id: 'jofa-dont', value: 'I don\'t know' },
    ],
  },
];
export const jobOfferFieldBCDistrict: IFormFieldOptions[] = [
  {
    label: 'In what region is the job that is being offered?',
    name: 'which_district_in British_Columbia_was_the_job_offered?',
    options: britishColumbiaDistricts,
  },
];

export const jobOfferFieldBC: IFormFieldOptions[] = [
  {
    name: 'Are_you_currently_working_in_the_Northeast_Development_Region_of_British_Columbia?',
    label: 'Are you currently working in the Northeast Development Region of British Columbia? ',
    options: [
      { id: 'jofbc-yes', value: 'Yes' },
      { id: 'jofbc-no', value: 'No' },
      { id: 'jofbc-dont', value: 'I don\'t know' },
    ],
  },
];

export const canadianJobOfferWages: IFormFieldOptions[] = [
  {
    label: 'What is the annual wage of the job offer?  ',
    name: 'wage_for_the_job_offered_in British_Columbia',
    options: canadaIncomeOptions,
  },
];

export const jobOfferFieldBCExperience: IFormFieldOptions[] = [
  {
    label:
      'How many years of full-time, or part-time equivalent, work experience do you have that is directly related to the job offer?',
    name: 'root_canadian_job_offer_job_offer_related_experience_years',
    options: [
      { id: '0', value: 'no related experience' },
      { id: '0.5', value: 'less than a year' },
      { id: '1', value: '1 year' },
      { id: '2', value: '2 years' },
      { id: '3', value: '3 years' },
      { id: '4', value: '4 years' },
      { id: '5', value: '5 years or more' },
      { id: '0', value: 'I don\'t know' },
    ],
  },
];

export const jobOfferFieldBCTraining: IFormFieldOptions[] = [
  {
    name: 'Have_you_Successfully_completed_the_Industry_Training_Authority_British_Columbia_(ITABC\'s)_challenge_certification_process??',
    label:
      'Have you Successfully completed the Industry Training Authority British Columbia (ITABC\'s) challenge certification process?',
    options: [
      { id: 'jofbct-yes', value: 'Yes' },
      { id: 'jofbct-no', value: 'No' },
      { id: 'jofbct-dont', value: 'I don\'t know' },
    ],
  },
];

// ======================================= FAMILY AND FRIENDS ==============================================

export const familyFriendsManitoba: IFormFieldOptions[] = [
  {
    name: 'family_friends_manitoba',
    label: 'Do you have a close friend living in the province of Manitoba who is 18 years or older?',
    options: [
      { id: 'ffm-yes', value: 'Yes' },
      { id: 'ffm-no', value: 'No' },
    ],
  },
];

export const familyFriendsCanada: IFormFieldOptions[] = [
  {
    name: 'family_friends_canada',
    label: 'Do you have any family members or relatives living in Canada and who are 18 years or older? ',
    options: [
      { id: 'ffc-yes', value: 'Yes' },
      { id: 'ffc-no', value: 'No' },
    ],
  },
];

export const familyRelationshipOptions: IFormFieldOptions[] = [
  {
    name: 'family_relations',
    label: 'Relationship',
    options: relationships,
  },
];

export const residencyStatusOptions: IFormFieldOptions[] = [
  {
    name: 'relative_resident_status',
    label: 'Resident Status',
    options: residentStatus,
  },
];

export const livingIn: IFormFieldOptions[] = [
  {
    name: 'relative_living_place',
    label: 'Living in',
    options: placesInCanada,
  },
];

export const relativeSince: IFormFieldOptions[] = [
  {
    name: 'relative_living_place_since',
    label: 'Since',
    options: [
      {
        id: 'less1',
        value: 'Less than 1 year',
      },
      {
        id: 'more1',
        value: 'More than 1 year but less than 2 years',
      },
      {
        id: 'more2',
        value: '2 years or longer',
      },
    ],
  },
];

// =============================================== PERSONAL NET WORTH ========================================

export const currency = [
  {
    name: 'currency_type',
    label: 'Currency',
    options: [] as OptionType[],
  },
];

export const netWorth = [
  {
    name: 'net_worth_amount',
    label: 'Amount',
    options: incomeOptions,
  },
];

// ======================================= CONTACT INFORMATION ================================

export const contactInfo: IFormField[] = [
  { name: 'firstname', label: 'First Name' },
  { name: 'lastname', label: 'Last Name' },
  { name: 'email', label: 'Email' },
  { name: 'telephone', label: 'Telephone' },
];
