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