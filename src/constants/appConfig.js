export const participantRoles = {
  creator: {
    label: 'Creator',
    permissions: ['edit_trip', 'invite_participants', 'manage_budget', 'delete_activities']
  },
  member: {
    label: 'Member',
    permissions: ['add_activities', 'vote', 'add_notes', 'view_budget']
  },
  guest: {
    label: 'Guest',
    permissions: ['view_itinerary', 'add_notes']
  }
};

export const activityTypes = {
  transport: {
    label: 'Transportation',
    icon: 'Car',
    color: 'blue'
  },
  accommodation: {
    label: 'Accommodation',
    icon: 'Home',
    color: 'green'
  },
  dining: {
    label: 'Dining',
    icon: 'UtensilsCrossed',
    color: 'orange'
  },
  activity: {
    label: 'Activity',
    icon: 'MapPin',
    color: 'purple'
  },
  sightseeing: {
    label: 'Sightseeing',
    icon: 'Camera',
    color: 'pink'
  },
  shopping: {
    label: 'Shopping',
    icon: 'ShoppingBag',
    color: 'indigo'
  }
};

export const updateTypes = {
  itinerary: {
    label: 'Itinerary',
    icon: 'Calendar',
    color: 'blue'
  },
  voting: {
    label: 'Voting',
    icon: 'Vote',
    color: 'purple'
  },
  budget: {
    label: 'Budget',
    icon: 'DollarSign',
    color: 'green'
  },
  notes: {
    label: 'Notes',
    icon: 'FileText',
    color: 'orange'
  },
  accommodation: {
    label: 'Accommodation',
    icon: 'Home',
    color: 'pink'
  },
participants: {
    label: 'Participants',
    icon: 'Users',
    color: 'travel'
  },
  payment: {
    label: 'Payment',
    icon: 'CreditCard',
    color: 'emerald'
  }
};

export const paymentMethods = {
  cash: {
    label: 'Cash',
    icon: 'Banknote'
  },
  venmo: {
    label: 'Venmo',
    icon: 'CreditCard'
  },
  paypal: {
    label: 'PayPal',
    icon: 'CreditCard'
  },
  zelle: {
    label: 'Zelle',
    icon: 'CreditCard'
  },
  splitwise: {
    label: 'Splitwise',
    icon: 'CreditCard'
  }
};

export const paymentStatuses = {
  pending: {
    label: 'Pending',
    color: 'orange'
  },
  completed: {
    label: 'Completed',
    color: 'green'
  },
  failed: {
    label: 'Failed',
    color: 'red'
  }
};
export const tripStatuses = {
  planning: {
    label: 'Planning',
    color: 'blue'
  },
  confirmed: {
    label: 'Confirmed',
    color: 'green'
  },
  ongoing: {
    label: 'Ongoing',
    color: 'orange'
  },
  completed: {
    label: 'Completed',
    color: 'gray'
  }
};

export const destinationThemes = {
  bali: {
    name: 'Bali',
    landmark: 'Uluwatu Temple',
    colors: {
      primary: 'bali-500',
      secondary: 'bali-200',
      accent: 'bali-600'
    },
    gradient: 'bali-gradient',
    description: 'Temple oranges and tropical vibes',
    landmarks: ['Uluwatu Temple', 'Rice Terraces', 'Sacred Monkey Forest'],
    culturalElements: ['Hindu temples', 'Rice paddies', 'Traditional architecture']
  },
  paris: {
    name: 'Paris',
    landmark: 'Eiffel Tower',
    colors: {
      primary: 'paris-500',
      secondary: 'paris-200',
      accent: 'paris-600'
    },
    gradient: 'paris-gradient',
    description: 'Romantic golds and elegant grays',
    landmarks: ['Eiffel Tower', 'Louvre', 'Notre-Dame', 'Arc de Triomphe'],
    culturalElements: ['Gothic architecture', 'Café culture', 'Art museums']
  },
  tokyo: {
    name: 'Tokyo',
    landmark: 'Mount Fuji',
    colors: {
      primary: 'tokyo-500',
      secondary: 'tokyo-200',
      accent: 'tokyo-600'
    },
    gradient: 'tokyo-gradient',
    description: 'Cherry blossom pinks and modern blues',
    landmarks: ['Mount Fuji', 'Tokyo Tower', 'Senso-ji Temple', 'Shibuya Crossing'],
    culturalElements: ['Cherry blossoms', 'Modern skyscrapers', 'Traditional temples']
  },
  newyork: {
    name: 'New York',
    landmark: 'Statue of Liberty',
    colors: {
      primary: 'newyork-500',
      secondary: 'newyork-200',
      accent: 'newyork-600'
    },
    gradient: 'newyork-gradient',
    description: 'Liberty greens and urban sophistication',
    landmarks: ['Statue of Liberty', 'Empire State Building', 'Central Park', 'Brooklyn Bridge'],
    culturalElements: ['Skyscrapers', 'Urban parks', 'Cultural diversity']
  },
  travel: {
    name: 'Default',
    landmark: 'World',
    colors: {
      primary: 'travel-500',
      secondary: 'travel-200',
      accent: 'travel-600'
    },
    gradient: 'travel-gradient',
    description: 'Universal travel theme',
    landmarks: ['Global destinations'],
    culturalElements: ['Travel inspiration']
  }
};