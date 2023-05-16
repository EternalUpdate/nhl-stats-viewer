/**
 * Player information as presented in the people endpoint in the NHL API.
 */
export type PlayerInfo = {
    id: number;
    fullName: string;
    firstName: string;
    lastName: string;
    primaryNumber: number;
    birthDate: string;
    currentAge: number;
    birthCity: string;
    birthStateProvince: string;
    birthCountry: string;
    nationality: string;
    height: string;
    weight: number;
    active: boolean;
    alternateCaptain: boolean;
    captain: boolean;
    rookie: boolean;
    shootsCatches: string;
    rosterStatus: string;
    currentTeam: {
      id: number;
      name: string;
      abbreviation: string;
    };
    primaryPosition: {
      code: string;
      name: string;
      type: string;
      abbreviation: string;
    };
  };
  