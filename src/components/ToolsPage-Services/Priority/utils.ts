/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable indent */

function convertDurationToMonths(duration: string): number {
  // Regular expressions to find years and months in the string
  const yearsRegex = /(\d+)\s+Years/;
  const monthsRegex = /(\d+)\s+Months/;

  // Extract years and months using the regular expressions
  const yearsMatch = duration.match(yearsRegex);
  const monthsMatch = duration.match(monthsRegex);

  // Parse the matched years and months to integers
  const years = yearsMatch ? parseInt(yearsMatch[1], 10) : 0;
  const months = monthsMatch ? parseInt(monthsMatch[1], 10) : 0;

  // Calculate total months
  const totalMonths = years * 12 + months;
  return totalMonths;
}

export function sortDataByCriteria(data: any[], criterias: string[]) {
  criterias.map((criteria) => {
    switch (criteria) {
      case 'Course Fee - from low to high':
        data.sort((a, b) => {
          return (
            parseFloat(parseFloat(a.FeeText.split(' ')[0]).toFixed(2)) -
            parseFloat(parseFloat(b.FeeText.split(' ')[0]).toFixed(2))
          );
        });
        break;
      case 'Course Fee - from high to low':
        data.sort((a, b) => {
          return (
            parseFloat(parseFloat(b.FeeText.split(' ')[0]).toFixed(2)) -
            parseFloat(parseFloat(a.FeeText.split(' ')[0]).toFixed(2))
          );
        });
        break;
      case 'Application Fee - from low to high':
        data.sort((a, b) => {
          return (
            parseFloat(parseFloat(a.ApplicationFee.split(' ')[0]).toFixed(2)) -
            parseFloat(parseFloat(b.ApplicationFee.split(' ')[0]).toFixed(2))
          );
        });
        break;
      case 'Application Fee - from high to low':
        data.sort((a, b) => {
          return (
            parseFloat(parseFloat(b.ApplicationFee.split(' ')[0]).toFixed(2)) -
            parseFloat(parseFloat(a.ApplicationFee.split(' ')[0]).toFixed(2))
          );
        });
        break;
      case 'Duration - from low to high':
        data.sort((a, b) => {
          return convertDurationToMonths(a.Length) - convertDurationToMonths(b.Length);
        });
        break;
      case 'Duration - from high to low':
        data.sort((a, b) => {
          return convertDurationToMonths(b.Length) - convertDurationToMonths(a.Length);
        });
        break;
      default:
        break;
    }
    return data;
  });
}
