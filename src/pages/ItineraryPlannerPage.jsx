import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import ApperIcon from '../components/ApperIcon';
import DayTimeline from '../components/features/DayTimeline';
import { motion } from 'framer-motion';

const ItineraryPlannerPage = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [tripDays] = useState([
    { day: 1, date: '2024-03-15', title: 'Arrival Day' },
    { day: 2, date: '2024-03-16', title: 'Ubud Exploration' },
    { day: 3, date: '2024-03-17', title: 'Temple Tours' },
    { day: 4, date: '2024-03-18', title: 'Beach Day' },
    { day: 5, date: '2024-03-19', title: 'Cultural Activities' }
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="travel-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Trip Itinerary</CardTitle>
                <p className="text-muted-foreground">Plan your daily activities and experiences</p>
              </div>
              <Button className="travel-gradient">
                <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
                Add Activity
              </Button>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Day Selector */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <Card className="travel-card">
            <CardHeader>
              <CardTitle className="text-lg">Trip Days</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {tripDays.map((day) => (
                <Button
                  key={day.day}
                  variant={selectedDay === day.day ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedDay(day.day)}
                >
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="min-w-[24px] h-6 rounded-full">
                      {day.day}
                    </Badge>
                    <div className="text-left">
                      <div className="font-medium">{day.title}</div>
                      <div className="text-xs text-muted-foreground">{day.date}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Day Timeline */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-3"
        >
          <DayTimeline 
            selectedDay={selectedDay} 
            dayInfo={tripDays.find(d => d.day === selectedDay)}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ItineraryPlannerPage;