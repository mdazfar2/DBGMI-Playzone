// Mock tournament results data
export const tournamentResults = [
  {
    tournamentId: 'pt1',
    tournamentName: 'DBGMI Winter Solo Cup',
    date: '2025-05-20',
    winners: [
      {
        position: 1,
        playerOrTeamId: 'p1',
        playerOrTeamName: 'GodSlayer420',
        prizeWon: 2000,
        kills: 15,
      },
      {
        position: 2,
        playerOrTeamId: 'p2',
        playerOrTeamName: 'SniperKing',
        prizeWon: 1000,
        kills: 8,
      },
      {
        position: 3,
        playerOrTeamId: 'p3',
        playerOrTeamName: 'HeadHunterX',
        prizeWon: 500,
        kills: 6,
      },
    ],
  },
  {
    tournamentId: 'pt2',
    tournamentName: 'DBGMI Pro Squad Invitational',
    date: '2025-05-15',
    winners: [
      {
        position: 1,
        playerOrTeamId: 't1',
        playerOrTeamName: 'ShadowSquad',
        prizeWon: 5000,
        kills: 32,
      },
      {
        position: 2,
        playerOrTeamId: 't2',
        playerOrTeamName: 'Death Dealers',
        prizeWon: 3000,
        kills: 26,
      },
      {
        position: 3,
        playerOrTeamId: 't3',
        playerOrTeamName: 'CyberNinjas',
        prizeWon: 1500,
        kills: 18,
      },
    ],
  },
];

// Get tournament results by tournament ID
export const getResultsByTournamentId = (tournamentId) => {
  return tournamentResults.find(result => result.tournamentId === tournamentId);
};
