// Mock upcoming tournaments data
export const upcomingTournaments = [
  {
    id: 't1',
    name: 'DBGMI Solo Cup',
    date: '2025-06-15',
    time: '18:00',
    map: 'Erangel',
    mode: 'Solo',
    entryFee: 50,
    prizePools: [
      { position: 1, amount: 2000 },
      { position: 2, amount: 1000 },
      { position: 3, amount: 500 },
    ],
    slots: 100,
    registeredPlayers: 45,
    isRegistrationOpen: true,
    rules: [
      'No hackers or emulators allowed',
      'Players must be on time',
      'Match will be streamed live',
      'Tournament room ID and password will be shared 15 minutes before the match',
    ]
  },
  {
    id: 't2',
    name: 'DBGMI Squad Showdown',
    date: '2025-06-18',
    time: '20:00',
    map: 'Livik',
    mode: 'Squad',
    entryFee: 200,
    prizePools: [
      { position: 1, amount: 5000 },
      { position: 2, amount: 3000 },
      { position: 3, amount: 1500 },
    ],
    slots: 25,
    registeredPlayers: 12,
    isRegistrationOpen: true,
    rules: [
      'No hackers or emulators allowed',
      'Teams must be on time',
      'Match will be streamed live',
      'Tournament room ID and password will be shared 15 minutes before the match',
      'Maximum 4 players per squad',
    ]
  },
  {
    id: 't3',
    name: 'DBGMI Duo Challenge',
    date: '2025-06-20',
    time: '19:00',
    map: 'Miramar',
    mode: 'Duo',
    entryFee: 100,
    prizePools: [
      { position: 1, amount: 3000 },
      { position: 2, amount: 1500 },
      { position: 3, amount: 750 },
    ],
    slots: 50,
    registeredPlayers: 22,
    isRegistrationOpen: true,
    rules: [
      'No hackers or emulators allowed',
      'Players must be on time',
      'Match will be streamed live',
      'Tournament room ID and password will be shared 15 minutes before the match',
    ]
  },
];

// Mock past tournaments data
export const pastTournaments = [
  {
    id: 'pt1',
    name: 'DBGMI Winter Solo Cup',
    date: '2025-05-20',
    time: '18:00',
    map: 'Erangel',
    mode: 'Solo',
    entryFee: 50,
    prizePools: [
      { position: 1, amount: 2000 },
      { position: 2, amount: 1000 },
      { position: 3, amount: 500 },
    ],
    slots: 100,
    registeredPlayers: 100,
    isRegistrationOpen: false,
    rules: [
      'No hackers or emulators allowed',
      'Players must be on time',
      'Match will be streamed live',
    ]
  },
  {
    id: 'pt2',
    name: 'DBGMI Pro Squad Invitational',
    date: '2025-05-15',
    time: '20:00',
    map: 'Livik',
    mode: 'Squad',
    entryFee: 200,
    prizePools: [
      { position: 1, amount: 5000 },
      { position: 2, amount: 3000 },
      { position: 3, amount: 1500 },
    ],
    slots: 25,
    registeredPlayers: 25,
    isRegistrationOpen: false,
    rules: [
      'No hackers or emulators allowed',
      'Teams must be on time',
      'Match will be streamed live',
    ]
  },
];

// Get tournament by ID
export const getTournamentById = (id) => {
  return [...upcomingTournaments, ...pastTournaments].find(
    tournament => tournament.id === id
  );
};
