import { OptionType } from './formConfig';

export interface IPropsType {
  // eslint-disable-next-line no-unused-vars
  onchange?: (value: boolean) => void;
  formNumber?: number;
  countries?: OptionType[];
  occupations?: OptionType[];
  currencies?: OptionType[];
}
