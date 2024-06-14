const map = [
  { key: 'Study Visa', value: 'sp' },
  { key: 'Closed Work Permit', value: 'wp' },
  { key: 'Super Visa', value: 'sv' },
  { key: 'Post Graduation Work Permit', value: 'pgwp' },
  { key: 'Bridging Open Work Permit', value: 'bowp' },
  { key: 'Co-op Work Permit', value: 'co-op' },
  { key: 'Work Permit Inside Canada (Initial and Extension)', value: 'wpext' },
  { key: 'Visitor Visa', value: 'vv' },
  { key: 'Study Permit Extension', value: 'spext' },
  { key: 'CAQ Extension', value: 'caqext' },
  { key: 'TRV for Inside Canada Permit', value: 'TRV' },
  { key: 'Spousal Open Work Permit', value: 'sowp' },
  { key: 'Express Entry - FSW (Federal Skilled Worker)', value: 'fsw' },
  { key: 'Express Entry - CEC (Canadian Experience Class)', value: 'cec' },
  { key: 'Express Entry - FSTP (Federal Skilled Trade Program)', value: 'fstp' },
  { key: 'Provincial Nominee Program (PNP)', value: 'pnp' },
  { key: 'Quebec Skilled Worker', value: 'qsw' },
  { key: 'Parents and Grandparents', value: 'pgss' },
  { key: 'Spousal Sponsorship', value: 'ss' },
];

export const getShortHand = () => {
  const value = map.find((item) => {
    // Select the span within the h1
    const spanElement = document.querySelector('h1.banner-text span');

    if (spanElement) {
      // Get the text content of the span
      const spanText = spanElement.textContent;
      // Return true if the span text matches the key
      if (item.key.toLowerCase() === spanText?.toLowerCase()) {
        return true;
      }

      // Return false if the span element is not found
      return false;
    }
    return false;
  });
  // return the value if found, otherwise return undefined
  return value ? value.value : undefined;
};
