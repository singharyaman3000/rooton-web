/* eslint-disable no-unused-vars */
import { OptionType } from './formConfig';

export type FormItem = {
  name: string;
  value: string;
};

export interface IPropsType {
  onchange: (key: string, value: string) => void;
  isInValid?: (value: boolean) => void;
  formNumber: number;
  formData: Record<string, string>;
  countries?: OptionType[];
  occupations?: OptionType[];
  currencies?: OptionType[];
}
