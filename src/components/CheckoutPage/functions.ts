function cleanseServiceName(serviceName:string){
  let stringToBeReturned:string='';
  stringToBeReturned = serviceName.replaceAll('<span>','');
  stringToBeReturned = stringToBeReturned.replaceAll('</span>','');
  return stringToBeReturned;
}

function checkForNumber(stringToBeChecked:string){
  const latestAddition = stringToBeChecked.charAt(stringToBeChecked.length - 1);
  return Number.isNaN(parseFloat(latestAddition));
}

function extractNumbersFromInput(inputString:string) {
  // Use a regular expression to match all digits in the string
  const matches = inputString.match(/\d+/g);

  // If there are no digits, return an empty string
  if (matches === null) {
    return '';
  }

  // Join all matched digit strings into one string
  return matches.join('');
}
export { cleanseServiceName, checkForNumber, extractNumbersFromInput };