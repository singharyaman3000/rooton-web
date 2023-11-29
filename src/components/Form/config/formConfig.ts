export interface IFormField {
  label: string;
  name: string;
}

export interface IFormFieldOptions {
  label: string;
  name: string;
  options: {
    id: string;
    value: string;
  }[];
}

// ===================================== PERSONAL PROFILE ===================================================

const countriesArray = [
  { id: 'af', value: 'Afghanistan' },
  { id: 'al', value: 'Albania' },
  { id: 'dz', value: 'Algeria' },
  { id: 'as', value: 'American Samoa' },
  { id: 'ad', value: 'Andorra' },
  { id: 'vn', value: 'Vietnam' },
  { id: 'ye', value: 'Yemen' },
  { id: 'zm', value: 'Zambia' },
  { id: 'zw', value: 'Zimbabwe' },
];

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
      ...Array.from({ length: 43 }, (_, index) => ({
        id: `${index + 18}`,
        value: `${index + 18}`,
      })),
      { id: 'over60', value: 'Over 60' },
    ],
  },
];

export const countriesOfCitizenship: IFormFieldOptions[] = [
  {
    name: 'country_of_citizenship',
    label: 'Country of Citizenship',
    options: countriesArray,
  },
];

export const countriesOfResidence: IFormFieldOptions[] = [
  {
    name: 'country_of_residence',
    label: 'Country of Residence',
    options: countriesArray,
  },
];

export const martialStatusForm: IFormFieldOptions[] = [
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
    label: 'Writing',
    options: languageLevels,
  },
];

export const englishReadingLevels = [
  {
    name: 'english_reading',
    label: 'Reading',
    options: languageLevels,
  },
];

export const englishSpeakingLevels = [
  {
    name: 'english_speak',
    label: 'Speaking',
    options: languageLevels,
  },
];
export const englishListeningLevels = [
  {
    name: 'english_listen',
    label: 'Listening',
    options: languageLevels,
  },
];

export const frenchWritingLevels = [
  {
    name: 'french_write',
    label: 'Writing',
    options: languageLevels,
  },
];

export const frenchReadingLevels = [
  {
    name: 'french_reading',
    label: 'Reading',
    options: languageLevels,
  },
];

export const frenchSpeakingLevels = [
  {
    name: 'french_speak',
    label: 'Speaking',
    options: languageLevels,
  },
];
export const frenchListeningLevels = [
  {
    name: 'french_listen',
    label: 'Listening',
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
    name: 'have_you_lived_in_canadas_atlantic_provinces',
    label:
      'Have you lived in one of Canada’s Atlantic provinces (New Brunswick, Newfoundland and Labrador, Nova Scotia, or Prince Edward Island) for at least 16 months in the 2 years before getting your degree, diploma or educational credential?',
    options: [
      { id: 'ca-atl-yes', value: 'Yes' },
      { id: 'ca-atl-no', value: 'No' },
    ],
  },
];

// ================================================ WORK HISTORY ===============================================

const occupations = [
  { id: 'homemaker', value: 'Homemaker' },
  { id: 'privateSector', value: 'Private Sector' },
  { id: 'government', value: 'Government' },
  { id: 'unemployed', value: 'Unemployed' },
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
    options: occupations,
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

export const occupation: IFormFieldOptions[] = [
  {
    name: 'occupation_canada ',
    label: 'Occupation',
    options: occupations,
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

// ======================================= FAMILY AND FRIENDS ==============================================

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

const currencyOptions = [
  { id: 'AFN', value: 'Afghanistan Afghani (؋)' },
  { id: 'ALL', value: 'Albania Lek (Lek)' },
  { id: 'DZD', value: 'Algeria Dinar (DA)' },
  { id: 'AOA', value: 'Angola Kwanza (Kz)' },
  { id: 'ARS', value: 'Argentina Peso ($)' },
  { id: 'AMD', value: 'Armenia Dram (դր.)' },
  { id: 'AWG', value: 'Aruba Guilder ()' },
  { id: 'AUD', value: 'Australia Dollar ($)' },
  { id: 'AZN', value: 'Azerbaijan Manat (ман.)' },
  { id: 'BSD', value: 'Bahamas Dollar ($)' },
];

export const incomeOptions = [
  { id: '9999', value: 'Less than 10,000' },
  { id: '10000', value: 'Between 10,000 and 25,000' },
  { id: '25000', value: 'Between 25,000 and 100,000' },
  { id: '100000', value: 'Between 100,000 and 500,000' },
  { id: '500000', value: 'Between 500,000 and 1,000,000' },
  { id: '1000000', value: 'Between 1,000,000 and 2,000,000' },
  { id: '2000000', value: 'More than 2,000,000' },
];

export const currency = [
  {
    name: 'currency_type',
    label: 'Currency',
    options: currencyOptions,
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
