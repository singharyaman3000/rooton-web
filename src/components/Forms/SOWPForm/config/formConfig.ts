/* eslint-disable quotes */
/* eslint-disable max-len */
import { IFormFieldOptions, IFormField, OptionType } from '../../components/model';

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
  { name: 'mobilephone', label: 'Telephone' },
];

export const consultationType: IFormFieldOptions[] = [
  {
    name: 'preferred_consultation_type_',
    label: 'Preferred Consultation Type',
    options: [
      {
        id: 'free',
        value: 'Counselling Specialist (Free)',
      },
      {
        id: 'paid',
        value: 'Consultation with RCIC (Paid)',
      },
    ],
  },
];

export const spouseStatus: IFormFieldOptions[] = [
  {
    name: 'is_your_spouse_in_canada_',
    label: 'Is your spouse in Canada?',
    options: [
      { id: 'Yes', value: 'Yes' },
      { id: 'No', value: 'No' },
    ],
  },
];

export const spouseStatusDetails: IFormFieldOptions[] = [
  {
    name: 'what_is_the_status_of_your_spouse_in_canada_',
    label: 'What is the status of your Spouse in Canada?',
    options: [
      { id: 'Study Visa', value: 'Study Visa' },
      { id: 'PGWP', value: 'PGWP' },
      { id: 'Closed Work Permit', value: 'Closed Work Permit' },
      { id: 'Implied Status', value: 'Implied Status' },
      { id: 'Other', value: 'Other' },
    ],
  },
  { name: 'when_does_your_spouse_s_visa_expire_', label: `When does your spouse's visa expire?`, options: [] },
];

export const currentOccupationStatus: IFormFieldOptions[] = [
  {
    name: 'current_employment_status_',
    label: 'Current Employment Status:',
    options: [
      { id: 'Employed', value: 'Employed' },
      { id: 'Unemployed', value: 'Unemployed' },
      { id: 'Student', value: 'Student' },
      { id: 'Business', value: 'Business' },
      { id: 'Homemaker', value: 'Homemaker' },
      { id: 'Other', value: 'Other' },
    ],
  },
];

export const maritalStatus: IFormFieldOptions[] = [
  {
    name: 'marital_status_rooton_web',
    label: 'Marital Status',
    options: [
      { id: 'Single', value: 'Single' },
      { id: 'Married', value: 'Married' },
      { id: 'Engaged', value: 'Engaged' },
      { id: 'Common-law partner', value: 'Common-law partner' },
      { id: 'Divorced', value: 'Divorced' },
      { id: 'Single Parent', value: 'Single Parent' },
      { id: 'Others', value: 'Others' },
    ],
  },
];

export const extendedFamily: IFormFieldOptions[] = [
  {
    name: 'do_you_have_any_immediate_family_members__close_friends_or_extended_family_in_canada_',
    label: 'Do you have any family or friends in Canada?',
    options: [
      { id: 'Brother/Sister-in-law', value: 'Brother/Sister-in-law' },
      { id: 'Spouse', value: 'Spouse' },
      { id: 'Girlfriend/Boyfriend', value: 'Girlfriend/Boyfriend' },
      { id: 'Uncle', value: 'Uncle' },
      { id: 'Aunt', value: 'Aunt' },
    ],
  },
];

export const visaRefusal: IFormFieldOptions[] = [
  {
    name: 'do_you_have_any_previous_visa_refusals_in_any_country_',
    label: 'Do you have any previous visa refusals in any country?',
    options: [
      { id: 'Yes', value: 'Yes' },
      { id: 'No', value: 'No' },
    ],
  },
  {
    name: 'please_provide_details',
    label: 'Please provide details',
    options: [],
  },
];

export const anySpecificQuestion: IFormField[] = [
  { name: 'any_specific_questions_or_comments_', label: 'Any specific questions or comments' },
];
