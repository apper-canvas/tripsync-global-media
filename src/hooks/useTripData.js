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

        setTrip(tripData);
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

  return {
    trip,
    participants,
    activities,
    updates,
    loading,
    error,
    addActivity,
    updateTrip
  };
};