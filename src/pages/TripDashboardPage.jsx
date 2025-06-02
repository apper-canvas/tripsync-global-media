import { useState } from 'react';
import TripOverviewSection from '../components/features/TripOverviewSection';
import ParticipantListSection from '../components/features/ParticipantListSection';
import UpdatesFeedSection from '../components/features/UpdatesFeedSection';
import DocumentsSection from '../components/features/DocumentsSection';
import BudgetSection from '../components/features/BudgetSection';
import { motion } from 'framer-motion';

const TripDashboardPage = () => {
const [trip] = useState({
    id: '1',
    name: 'Bali Adventure',
    destination: 'Bali, Indonesia',
    startDate: '2024-03-15',
    endDate: '2024-03-25',
    creatorId: 'user1',
    status: 'planning'
  });

  const [currentUser] = useState({
    id: 'user1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com'
  });

  const getDestinationTheme = (destination) => {
    const lowercaseDestination = destination.toLowerCase();
    
    if (lowercaseDestination.includes('bali') || lowercaseDestination.includes('indonesia')) {
      return 'emerald';
    } else if (lowercaseDestination.includes('japan') || lowercaseDestination.includes('tokyo')) {
      return 'pink';
    } else if (lowercaseDestination.includes('paris') || lowercaseDestination.includes('france')) {
      return 'blue';
    } else if (lowercaseDestination.includes('italy') || lowercaseDestination.includes('rome')) {
      return 'amber';
    } else if (lowercaseDestination.includes('greece') || lowercaseDestination.includes('santorini')) {
      return 'sky';
    } else if (lowercaseDestination.includes('thailand') || lowercaseDestination.includes('bangkok')) {
      return 'orange';
    } else {
      return 'indigo';
    }
  };

  const destinationTheme = getDestinationTheme(trip.destination);

  return (
    <div className={`max-w-7xl mx-auto space-y-8 ${destinationTheme}-theme`}>
      {/* Landmark Background */}
      <div className="fixed inset-0 z-0 opacity-5">
        <div className={`h-full w-full bg-gradient-to-br from-${destinationTheme}-200 via-${destinationTheme}-100 to-${destinationTheme}-50`}></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <TripOverviewSection 
          trip={trip} 
          currentUser={currentUser}
          destinationTheme={destinationTheme}
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {/* Left Column - Participants & Budget */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1 space-y-8"
        >
          <ParticipantListSection tripId={trip.id} destinationTheme={destinationTheme} />
          <BudgetSection tripId={trip.id} destinationTheme={destinationTheme} />
        </motion.div>

        {/* Right Column - Documents */}
        <motion.div 
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <DocumentsSection tripId={trip.id} destinationTheme={destinationTheme} />
        </motion.div>
      </div>

      {/* Updates Feed - Full Width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative z-10"
      >
        <UpdatesFeedSection tripId={trip.id} destinationTheme={destinationTheme} />
      </motion.div>
    </div>
  );
};

export default TripDashboardPage;