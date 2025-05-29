// Format date to display in a user-friendly way
export const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('en-IN', options);
};

// Format time to display in a user-friendly way
export const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

// Calculate remaining time for tournament in days, hours, minutes
export const calculateTimeRemaining = (dateString, timeString) => {
  const [year, month, day] = dateString.split('-').map(Number);
  const [hours, minutes] = timeString.split(':').map(Number);

  const tournamentDate = new Date(year, month - 1, day, hours, minutes);
  const currentDate = new Date();

  const diffTime = tournamentDate.getTime() - currentDate.getTime();
  const isExpired = diffTime <= 0;

  if (isExpired) {
    return { days: 0, hours: 0, minutes: 0, isExpired: true };
  }

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

  return {
    days: diffDays,
    hours: diffHours,
    minutes: diffMinutes,
    isExpired: false,
  };
};

// Generate a random transaction ID (for mock payment simulation)
export const generateTransactionId = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Simulate payment processing delay
export const simulatePaymentProcessing = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return Math.random() < 0.9;
};

// Format currency (INR)
export const formatCurrency = (amount) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

// Validate BGMI UID (should be numeric and 10-12 digits)
export const isValidBgmiUid = (uid) => {
  return /^\d{10,12}$/.test(uid);
};

// Validate Indian phone number
export const isValidIndianPhoneNumber = (phone) => {
  return /^[6-9]\d{9}$/.test(phone);
};

// Parse session storage data
export const getSessionData = (key, defaultValue) => {
  try {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(`Error retrieving ${key} from session storage:`, error);
    return defaultValue;
  }
};

// Save data to session storage
export const saveSessionData = (key, data) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to session storage:`, error);
  }
};
