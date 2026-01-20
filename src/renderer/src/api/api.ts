const api = 'http://localhost:8080/score-prediction'

export async function getScoreByTeam(team: string): Promise<any> {
  const response = await fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ team })
  })

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`)
  }

  const data = await response.json()

  return data as any
}