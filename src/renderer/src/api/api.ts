import axios from 'axios'

export async function getScoreByTeam(
  apiUrl: string,
  teams: { firstTeam: string; secondTeam: string }
): Promise<any> {
  try {
    const response = await axios.post(
      apiUrl,
      {
        teams
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`HTTP error ${error.response?.status || 'unknown'}`)
    }
    throw error
  }
}

export async function getTeamsList(apiUrl: string): Promise<string[]> {
    try {
        const response = await axios.get(
          'https://api.football-data.org/v4/competitions/PL',
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Auth-Token': '08b4becd5ec4458f851f529c019aca36'
            }
          }
        )
        return response.data.teams;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`HTTP error ${error.response?.status || 'unknown'}`);
        }
        throw error;
    }
}