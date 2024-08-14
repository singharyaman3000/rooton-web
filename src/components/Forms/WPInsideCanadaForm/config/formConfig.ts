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

export const countriesOfCitizenship: IFormFieldOptions[] = [
  {
    name: 'country_of_citizenship',
    label: 'Country of Citizenship',
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
    name: 'current_employment_status_',
    label: 'Current Employment Status',
    options: [
      { id: 'Employed', value: 'Employed' },
      { id: 'Unemployed', value: 'Unemployed' },
      { id: 'Self-employed', value: 'Self-employed' },
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
    name: 'have_you_ever_applied_for_any_visa_for_any_category_to_any_country_',
    label: 'Do you have any previous visa refusals in any country?',
    options: [
      { id: 'Yes', value: 'Yes' },
      { id: 'No', value: 'No' },
    ],
  },
  {
    name: 'detailed_description_2',
    label: 'Please provide details',
    options: [],
  },
];

export const rootOnHelp: IFormFieldOptions[] = [
  {
    name: 'how_can_root_on_help_you',
    label: 'How can Root On help you',
    options: [
      {
        id: 'Visa application/Resubmission',
        value: 'Visa application/Resubmission',
      },
      {
        id: 'Others',
        value: 'Others',
      },
    ],
  },
];

export const highestLevelOfEducation: IFormFieldOptions[] = [
  {
    name: 'highest_level_of_education_ro_form',
    label: 'Highest Level of Education',
    options: [
      { id: 'High School', value: 'High School' },
      { id: "Bachelor's Degree", value: "Bachelor's Degree" },
      { id: "Master's Degree", value: "Master's Degree" },
      { id: 'PhD', value: 'PhD' },
      { id: 'PG', value: 'PG' },
    ],
  },
];

export const fieldOfStudy: IFormField[] = [{ name: 'field_of_study_', label: 'Field of study' }];

export const IntendedOccupation: IFormField[] = [
  { name: 'intended_occupation_in_canada_', label: 'Intended Occupation in Canada' },
];

export const workingInCanada: IFormFieldOptions[] = [
  {
    name: 'are_you_currently_working_in_canada_',
    label: 'Are you currently working in Canada?',
    options: [
      { id: 'Yes', value: 'Yes' },
      { id: 'No', value: 'No' },
    ],
  },
];

export const previousCanadaExperience: IFormFieldOptions[] = [
  {
    name: 'previous_canadian_work_experience_',
    label: 'Previous Canadian Work Experience',
    options: [
      { id: 'None', value: 'None' },
      { id: 'Less than 1 year', value: 'Less than 1 year' },
      { id: '1-2 years', value: '1-2 years' },
      { id: 'More than 2 years', value: 'More than 2 years' },
    ],
  },
];

export const criminalHistory: IFormField[] = [
  {
    name: 'to_ensure_accurate_assessment_and_eligibility_for_immigration_to_canada__please_provide_any_relevan',
    label:
      'Provide any relevant information regarding past or ongoing criminal cases, legal proceedings, or activities that may affect your immigration process',
  },
];
