interface EducationalExperience {
  id: string;
  startdate: string;
  end_date: string;
  percentage: string;
  backlog: string;
  educationLevel: string;
  institutionName: string;
}

export interface IUserDetails {
  _id: string;
  email: string;
  Firstname: string;
  Lastname: string;
  Phone: string;
  profileFilled: boolean;
  Role: string;
  countryOfCitizenship: string;
  countryorterritory: string;
  countryorterritory_endDate: string;
  countryorterritory_other: string;
  countryorterritory_startDate: string;
  countryorterritory_status: string;
  currentCountry_or_territoryofResidence: string;
  dob: string;
  educationalExperiences: EducationalExperience[];
  gender: string;
  maritalStatus: string;
}

async function getCurrentUserDetails(): Promise<IUserDetails | null> {
  try {
    const token = localStorage.getItem('token');
    if (token === null) return null;
    const response = await fetch(`${process.env.NEXT_SERVER_API_BASE_URL}/api/profile-info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data as IUserDetails;
  } catch (error) {
    return null;
  }
}

export { getCurrentUserDetails };
