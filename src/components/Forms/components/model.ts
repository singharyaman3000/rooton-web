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
