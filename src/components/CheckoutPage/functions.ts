/* eslint-disable @typescript-eslint/no-explicit-any */
import { Country, State, City } from 'country-state-city';

function cleanseServiceName(serviceName: string) {
  let stringToBeReturned: string = '';
  stringToBeReturned = serviceName.replaceAll('<span>', '');
  stringToBeReturned = stringToBeReturned.replaceAll('</span>', '');
  return stringToBeReturned;
}

function checkForGSTNumber(gstNumber: string) {
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
  return gstRegex.test(gstNumber);
}

const checkForNumber = (value:string) => {
  // Allow numbers and one decimal point
  return !/^\d*\.?\d*$/.test(value);
};

const extractNumbersFromInput = (value:string) => {
  // Remove all characters except numbers and the first decimal point
  const numberWithDecimal = value.replace(/[^0-9.]/g, '');
  const decimalIndex = numberWithDecimal.indexOf('.');

  if (decimalIndex !== -1) {
    // Allow only one decimal point
    const integerPart = numberWithDecimal.slice(0, decimalIndex).replace(/\./g, '');
    const decimalPart = numberWithDecimal.slice(decimalIndex + 1).replace(/\./g, '');
    return `${integerPart}.${decimalPart}`;
  }

  return numberWithDecimal;
};

const findCountryListByName = (name: string) => {
  return Country.getAllCountries().find((list: any) => {
    return list.name === name;
  });
};

const findStateListByName = (name: string, isoCode: string) => {
  return State.getStatesOfCountry(isoCode).find((list: any) => {
    return list.name === name;
  });
};

const findCityListByName = (name: string, countryCode: string, isoCode: string) => {
  return City?.getCitiesOfState(countryCode, isoCode).find((list: any) => {
    return list.name === name;
  });
};

export {
  cleanseServiceName,
  checkForNumber,
  checkForGSTNumber,
  extractNumbersFromInput,
  findCountryListByName,
  findStateListByName,
  findCityListByName,
};
