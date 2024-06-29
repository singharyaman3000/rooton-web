/* eslint-disable @typescript-eslint/no-explicit-any */
import { Country, State, City } from 'country-state-city';

function cleanseServiceName(serviceName: string) {
  let stringToBeReturned: string = '';
  stringToBeReturned = serviceName.replaceAll('<span>', '');
  stringToBeReturned = stringToBeReturned.replaceAll('</span>', '');
  return stringToBeReturned;
}

function checkForNumber(stringToBeChecked: string) {
  const latestAddition = stringToBeChecked.charAt(stringToBeChecked.length - 1);
  return Number.isNaN(parseFloat(latestAddition));
}

function extractNumbersFromInput(inputString: string) {
  // Use a regular expression to match all digits in the string
  const matches = inputString.match(/\d+/g);

  // If there are no digits, return an empty string
  if (matches === null) {
    return '';
  }

  // Join all matched digit strings into one string
  return matches.join('');
}

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
  extractNumbersFromInput,
  findCountryListByName,
  findStateListByName,
  findCityListByName,
};
