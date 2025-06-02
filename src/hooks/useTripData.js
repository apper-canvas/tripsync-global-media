import { useState, useEffect } from 'react';

/**
 * @ai-context Custom hook for managing trip data with real-time updates
 * @dependencies useState, useEffect for state management
 * @modifiable-sections data-fetching, real-time-updates, error-handling
 * @config-driven Uses API endpoints from constants/apiConfig
 */
export const useTripData = (tripId) => {
  const [trip, setTrip] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [activities, setActivities] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState({
    total: 5000,
    categories: {
      accommodation: { budget: 2000, spent: 0 },
      transportation: { budget: 1500, spent: 0 },
      food: { budget: 1000, spent: 0 },
      activities: { budget: 500, spent: 0 }
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tripId) return;

    // Simulate API calls with mock data
    const fetchTripData = async () => {
      try {
        setLoading(true);
        
// Mock trip data
        const tripData = {
          id: tripId,
          name: 'Bali Adventure',
          destination: 'Bali, Indonesia',
          startDate: '2024-03-15',
          endDate: '2024-03-25',
          creatorId: 'user1',
          status: 'planning'
        };

        // Mock documents data
        const documentsData = [
          {
            id: 'doc1',
            name: 'Flight Tickets.pdf',
            size: 2048576,
            type: 'application/pdf',
            uploadedBy: 'user1',
            uploadedByName: 'Sarah Johnson',
            uploadedAt: '2024-03-10T10:30:00Z',
            url: '/mock-files/flight-tickets.pdf',
            category: 'pdf'
          },
          {
            id: 'doc2',
            name: 'Hotel Confirmation.pdf',
            size: 1024768,
            type: 'application/pdf',
            uploadedBy: 'user2',
            uploadedByName: 'Mike Chen',
            uploadedAt: '2024-03-08T14:20:00Z',
            url: '/mock-files/hotel-confirmation.pdf',
            category: 'pdf'
          },
          {
            id: 'doc3',
            name: 'Bali_Beach_Photos.jpg',
            size: 3145728,
            type: 'image/jpeg',
            uploadedBy: 'user3',
            uploadedByName: 'Emma Wilson',
            uploadedAt: '2024-03-05T16:45:00Z',
            url: '/mock-files/bali-beach.jpg',
            category: 'image'
          }
        ];

        setTrip(tripData);
        setDocuments(documentsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTripData();
  }, [tripId]);

  const addActivity = (activityData) => {
    const newActivity = {
      id: Date.now().toString(),
      tripId,
      ...activityData,
      createdBy: 'user1' // Should come from auth context
    };
    
    setActivities(prev => [...prev, newActivity]);
    
    // Add update to feed
    const update = {
      id: Date.now().toString(),
      userId: 'user1',
      userName: 'Current User',
      action: 'activity_added',
      message: `added ${activityData.title} to Day ${activityData.day}`,
      timestamp: new Date().toISOString(),
      type: 'itinerary'
    };
    
    setUpdates(prev => [update, ...prev]);
  };

const updateTrip = (updates) => {
    setTrip(prev => ({ ...prev, ...updates }));
  };

  const addDocument = (documentData) => {
    setDocuments(prev => [...prev, documentData]);
    
    // Add update to feed
    const update = {
      id: Date.now().toString(),
      userId: documentData.uploadedBy,
      userName: documentData.uploadedByName,
      action: 'document_uploaded',
      message: `uploaded ${documentData.name}`,
      timestamp: new Date().toISOString(),
      type: 'document'
    };
    
    setUpdates(prev => [update, ...prev]);
  };

  const deleteDocument = (documentId) => {
    const document = documents.find(doc => doc.id === documentId);
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
    
    if (document) {
      // Add update to feed
      const update = {
        id: Date.now().toString(),
        userId: 'user1',
        userName: 'Current User',
        action: 'document_deleted',
        message: `deleted ${document.name}`,
        timestamp: new Date().toISOString(),
        type: 'document'
      };
      
setUpdates(prev => [update, ...prev]);
    }
  };
  const addExpense = (expenseData) => {
    const newExpense = {
      id: Date.now().toString(),
      ...expenseData,
      addedBy: 'user1',
      addedByName: 'Current User',
      createdAt: new Date().toISOString()
    };
    
    setExpenses(prev => [...prev, newExpense]);
    
    // Update budget spent amount
    setBudget(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [expenseData.category]: {
          ...prev.categories[expenseData.category],
          spent: prev.categories[expenseData.category].spent + expenseData.amount
        }
      }
    }));
    
    // Add update to feed
    const update = {
      id: Date.now().toString(),
      userId: 'user1',
      userName: 'Current User',
      action: 'expense_added',
      message: `added $${expenseData.amount} expense for ${expenseData.description}`,
      timestamp: new Date().toISOString(),
      type: 'budget'
    };
    
    setUpdates(prev => [update, ...prev]);
  };

  const updateExpense = (expenseId, updatedData) => {
    const oldExpense = expenses.find(exp => exp.id === expenseId);
    if (!oldExpense) return;

    setExpenses(prev => prev.map(exp => 
      exp.id === expenseId ? { ...exp, ...updatedData } : exp
    ));

    // Update budget calculations
    setBudget(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [oldExpense.category]: {
          ...prev.categories[oldExpense.category],
          spent: prev.categories[oldExpense.category].spent - oldExpense.amount
        },
        [updatedData.category]: {
          ...prev.categories[updatedData.category],
          spent: prev.categories[updatedData.category].spent + updatedData.amount
        }
      }
    }));

    const update = {
      id: Date.now().toString(),
      userId: 'user1',
      userName: 'Current User',
      action: 'expense_updated',
      message: `updated expense: ${updatedData.description}`,
      timestamp: new Date().toISOString(),
      type: 'budget'
    };
    
    setUpdates(prev => [update, ...prev]);
  };

  const deleteExpense = (expenseId) => {
    const expense = expenses.find(exp => exp.id === expenseId);
    if (!expense) return;

    setExpenses(prev => prev.filter(exp => exp.id !== expenseId));
    
    // Update budget spent amount
    setBudget(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [expense.category]: {
          ...prev.categories[expense.category],
          spent: prev.categories[expense.category].spent - expense.amount
        }
      }
    }));

    const update = {
      id: Date.now().toString(),
      userId: 'user1',
      userName: 'Current User',
      action: 'expense_deleted',
      message: `deleted expense: ${expense.description}`,
      timestamp: new Date().toISOString(),
      type: 'budget'
    };
    
    setUpdates(prev => [update, ...prev]);
  };

return {
    trip,
    participants,
    activities,
    updates,
    documents,
    budget,
    expenses,
    loading,
    error,
    addActivity,
    updateTrip,
    addDocument,
    deleteDocument,
    addExpense,
    updateExpense,
    deleteExpense
  };
};