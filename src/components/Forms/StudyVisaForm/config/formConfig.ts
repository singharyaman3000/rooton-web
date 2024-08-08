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
  { name: 'desired_test_date', label: 'Desired Test Date' },
];

export const perferredIntake: IFormField[] = [
  { name: 'what_is_your_preferred_intake_', label: 'May 2024' },
  { name: 'what_is_your_preferred_intake_1', label: 'Sept 2024' },
  { name: 'what_is_your_preferred_intake_2', label: 'Jan 2025' },
  { name: 'what_is_your_preferred_intake_3', label: 'May 2025' },
];

export const programType: IFormField[] = [
  { name: 'what_type_of_study_program_are_you_interested_in_taking_in_canada_', label: 'Diploma' },
  { name: 'what_type_of_study_program_are_you_interested_in_taking_in_canada__1', label: 'Advanced Diploma' },
  { name: 'what_type_of_study_program_are_you_interested_in_taking_in_canada__2', label: `Bachelor's Degree` },
  { name: 'what_type_of_study_program_are_you_interested_in_taking_in_canada__3', label: `Master’s Degree` },
  { name: 'what_type_of_study_program_are_you_interested_in_taking_in_canada__4', label: 'PhD' },
  { name: 'what_type_of_study_program_are_you_interested_in_taking_in_canada__5', label: 'Others' },
  {
    name: 'what_type_of_study_program_are_you_interested_in_taking_in_canada__6',
    label: 'Not decided (Looking for Root On’s advice)',
  },
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

export const currentOccupation: IFormFieldOptions[] = [
  {
    name: 'current_occupation',
    label: 'Current Occupation',
    options: [
      { id: 'Student', value: 'Student' },
      { id: 'Working Professional', value: 'Working Professional' },
      { id: 'Business', value: 'Business' },
      { id: 'Unemployed', value: 'Unemployed' },
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

export const rootOnHelp: IFormField[] = [
  { name: 'how_can_root_on_help_you_', label: 'Course shortlist' },
  { name: 'how_can_root_on_help_you_1', label: 'Language coaching (ielts, pte, toefl, etc.)' },
  { name: 'how_can_root_on_help_you_2', label: 'Admission assistance' },
  { name: 'how_can_root_on_help_you_3', label: 'Visa application/ Resubmission' },
  { name: 'how_can_root_on_help_you_4', label: 'Statement of purpose (SOP)/ Letter of Support' },
  { name: 'how_can_root_on_help_you_5', label: 'Others' },
];
