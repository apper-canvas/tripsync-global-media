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

  return {
    trip,
    participants,
    activities,
    updates,
    documents,
    loading,
    error,
    addActivity,
    updateTrip,
    addDocument,
    deleteDocument
  };
};