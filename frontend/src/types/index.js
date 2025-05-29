// Tournament Types

// Example Tournament object structure
export const Tournament = {
  id: "",
  name: "",
  date: "",
  time: "",
  map: "",
  mode: "Solo", // or 'Duo' or 'Squad'
  entryFee: 0,
  prizePools: [],
  slots: 0,
  registeredPlayers: 0,
  isRegistrationOpen: true,
  rules: []
};

export const PrizePool = {
  position: 1,
  amount: 0
};

// Player/Team Types

export const Player = {
  id: "",
  name: "",
  bgmiUID: "",
  contactNumber: "",
  email: "",
  registeredTournaments: []
};

export const Team = {
  id: "",
  name: "",
  players: [],
  registeredTournaments: []
};

// Tournament Results Types

export const TournamentResult = {
  tournamentId: "",
  tournamentName: "",
  date: "",
  winners: []
};

export const Winner = {
  position: 1,
  playerOrTeamId: "",
  playerOrTeamName: "",
  prizeWon: 0,
  kills: 0
};

// Registration Types

export const RegistrationFormData = {
  playerName: "",
  teamName: "",
  bgmiUID: "",
  contactNumber: "",
  email: "",
  paymentMethod: "UPI", // or 'PayTM' or 'Razorpay'
  tournamentId: ""
};

// Admin Types

export const AdminUser = {
  id: "",
  username: "",
  role: "admin" // or 'moderator'
};

// Notification Types

export const Notification = {
  id: "",
  title: "",
  message: "",
  date: "",
  read: false
};
