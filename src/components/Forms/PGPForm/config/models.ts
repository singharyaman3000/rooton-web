/* eslint-disable no-unused-vars */
import { OptionType } from './formConfig';

export type FormItem = {
  name: string;
  value: string;
};

export interface IPropsAdditionalType {
  onchange: (key: string, value: string) => void;
  isInValid?: (value: boolean) => void;
  formNumber: number;
  formData: Record<string, string>;
  countries?: OptionType[];
  filledFields: number;
  setFilledFields: (value: number) => void;
  additionalQuestionsData: Record<string, string>[];
  setAdditionalQuestionsData: (value: Record<string, string>[]) => void;
  occupations?: OptionType[];
  currencies?: OptionType[];
}

export interface IPropsType {
  onchange: (key: string, value: string) => void;
  isInValid?: (value: boolean) => void;
  formNumber: number;
  formData: Record<string, string>;
  countries?: OptionType[];
  occupations?: OptionType[];
  currencies?: OptionType[];
}

export type AdditionalPropsType = {
  id: number;
  close: (index: number) => void;
  state: Record<string, string>[];
  data?: OptionType[] | undefined;
  onchange: (key: string, value: string, index: number, state: Record<string, string>[]) => void;
};

export type AddEducationKeyMap = {
  educationType: 'type_of_education_or_training_';
  educationDuration: 'duration_of_education_or_training_';
  educationCompletedOrNot: 'completed_the_education_or_training_';
  educationPlace: 'location_of_education_or_training_';
  educationPlaceInCanada: 'province_of_education_or_training_';
  territoryCheckAtlantic: 'have_you_lived_in_one_of_canada_s_atlantic_provinces_for_education_or_training_';
};

export type AddChildGrandchildKeyMap = {
  yourChildGrandchildAge: 'your_child_grandchild_age_';
  yourChildGrandchildMaritalStatus: 'your_child_grandchild_marial_status_';
  yourChildGrandchildSubstantially: 'your_child_grandchild_dependeds_substantially_on_your_financial_support_';
};

export type AddWorkKeyMap = {
  occupation: 'occupation_';
  typeOfJob: 'type_of_job_';
  whenWasWork: 'when_was_work_';
  lengthOfWork: 'length_of_work_';
  locationOfWork: 'location_of_work_';
  workHours: 'work_hours_for_work_';
  provinceOrTerritoryOfWork: 'province_or_territory_of_work_';
  workPermitType: 'what_type_of_work_permit_do_you_currently_hold_for_work_';
};

export type AddFamilyKeyMap = {
  relationship: 'relationship_with_relative_';
  residencyStatus: 'residency_status_of_relative_';
  livingIn: 'living_in_relative_';
  livingInSince: 'living_there_for_relative_';
};
