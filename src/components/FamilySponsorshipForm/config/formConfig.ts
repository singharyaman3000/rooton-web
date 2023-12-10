/* eslint-disable max-len */
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

// ===================================== PERSONAL PROFILE ==================================================

const sponsor_Relationship = [
  { id: 'sp', value: 'Spouse' },
  { id: 'cp', value: 'Common-Law Partner' },
  { id: 'pa', value: 'Parent' },
  { id: 'ch', value: 'Child' },
  { id: 'gr', value: 'Grandchild' },
];

const sponsor_canadian_status = [
  { id: 'ci', value: 'Citizen' },
  { id: 'pe', value: 'Permanent Resident' },
  { id: 'ne', value: 'Neither' },
];

const your_canadian_status = [
  { id: 'ci', value: 'Citizen' },
  { id: 'pe', value: 'Permanent Resident' },
  { id: 'ne', value: 'Neither' },
];

const your_sponsor = [
  { id: 'sp', value: 'Spouse' },
  { id: 'cp', value: 'Common-Law Partner' },
  { id: 'mf', value: 'Mother & Father' },
  { id: 'mo', value: 'Mother' },
  { id: 'fa', value: 'Father' },
  { id: 'gr', value: 'Grandmother & Grandfather' },
  { id: 'gm', value: 'Grandmother' },
  { id: 'gf', value: 'GrandFather' },
  { id: 'ch', value: 'Child' },
  { id: 'gc', value: 'Grandchild' },
];

const your_child_maritalstatus = [
  { id: 'ch_si', value: 'Single' },
  { id: 'ch_ma', value: 'Married' },
  { id: 'ch_co', value: 'Common-Law' },
];

const your_child_grandchild_substantially = [
  { id: 'ch_gr_substantially_ye', value: 'Yes' },
  { id: 'ch_gr_substantially_no', value: 'No' },
];

export const likeToDo: IFormFieldOptions[] = [
  {
    name: 'What_would_you_like_to_do ',
    label: 'What would you like to do?  ',
    options: [
      { id: 'wa_to_sponsor', value: 'I want to Sponsor' },
      { id: 'wa_be_sponsored', value: 'I want be Sponsored' },
    ],
  },
];

export const sponsorRelationship: IFormFieldOptions[] = [
  {
    name: 'What_is_your_relationship_person ',
    label: 'What is your relationship to the person who will sponsor you?  ',
    options: sponsor_Relationship,
  },
];

export const sponsorStatus: IFormFieldOptions[] = [
  {
    name: 'What_is_your_sponsor_Status',
    label: 'What is your sponsor Canadian Status? ',
    options: sponsor_canadian_status,
  },
];

export const yourStatus: IFormFieldOptions[] = [
  {
    name: 'Are_you_a_citizen_or_permanent ',
    label: 'Are you a citizen or permanent resident of Canada? ',
    options: your_canadian_status,
  },
];

export const yourAge: IFormFieldOptions[] = [
  {
    name: 'How_old_are_you ',
    label: 'How old are you? ',
    options: [
      { id: 'age_ab_17', value: '17 or above' },
      { id: 'age_un_17', value: 'Under 17' },
    ],
  },
];

export const residingInCanada: IFormFieldOptions[] = [
  {
    name: 'currently_residing_in_Canada ',
    label: 'Are you currently residing in Canada?',
    options: [
      { id: 'currently_residing_yes', value: 'Yes' },
      { id: 'currently_residing_no', value: 'No' },
    ],
  },
];

export const yourSponsor: IFormFieldOptions[] = [
  {
    name: 'my_sponsor ',
    label: 'Who would you like to sponsor?',
    options: your_sponsor,
  },
];

const your_child_grandchild_age = Array.from({ length: 23 }, (v, k) => {return {
  id: String(k + 1),
  value: String(k + 1),
};}).concat([{ id: 'ov', value: '24 or over' }]);

export const yourChildGrandchildAge: IFormFieldOptions[] = [
  {
    name: 'your_child_grandchild_age',
    label: 'What is your Child/Grandchild\'s age?',
    options: your_child_grandchild_age,
  },
];

export const yourChildGrandchildMaritalStatus: IFormFieldOptions[] = [
  {
    name: 'your_child_grandchild_marial_status ',
    label: 'What is your Child/Grandchild\'s marial status?   ',
    options: your_child_maritalstatus,
  },
];

export const yourChildGrandchildSubstantially: IFormFieldOptions[] = [
  {
    name: 'your_child_grandchild_dependeds_substantially_on_your_financial_support ',
    label: 'Does your Child/Grandchild dependeds substantially on your financial support since before the age of 22 and be unable to support her/him self financially due to a physical or mental condition? ',
    options: your_child_grandchild_substantially,
  },
];

export const countriesOfResidence: IFormFieldOptions[] = [
  {
    name: 'country_of_residence',
    label: 'Country of Residence',
    options: [] as OptionType[],
  },
];

// ======================================= CONTACT INFORMATION ================================

export const contactInfo: IFormField[] = [
  { name: 'firstname', label: 'First Name' },
  { name: 'lastname', label: 'Last Name' },
  { name: 'email', label: 'Email' },
  { name: 'mobilephone', label: 'Mobile Phone' },
];

// ======================================= QUESTIONS AND COMMENTS & IMMIGRATION NEWSLETTER ================================

export const additionalInformation: IFormFieldOptions[] = [
  {
    name: 'additional_information_for_immigration_assessment ',
    label: 'You may provide additional information that you think would be relevant to your immigration assessment. Would you like to add information at this time?  ',
    options: [
      { id: 'ad_info_yes', value: 'Yes' },
      { id: 'ad_info_no', value: 'No' },
    ],
  },
];

export const additionalInformationField: IFormField[] = [
  { name: 'ad_info', label: 'Additional Information' },
];

export const freeCanadianImmigration: IFormFieldOptions[] = [
  {
    name: 'free_Canadian_Immigration_Newsletter_by_email ',
    label: 'Yes, please send me the free Canadian Immigration Newsletter by email. ',
    options: [
      { id: 'fr_ca_immigration_yes', value: 'Yes' },
      { id: 'fr_ca_immigration_no', value: 'No' },
    ],
  },
];

export const receiveImmigrationInformation: IFormFieldOptions[] = [
  {
    name: 'receive_immigration_information ',
    label: 'Yes, I would like to receive timely immigration information and special offers from CanadaVisa.com and trusted partners. ',
    options: [
      { id: 're_im_info_yes', value: 'Yes' },
      { id: 're_im_info_no', value: 'No' },
    ],
  },
];