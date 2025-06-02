import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import ApperIcon from '../ApperIcon';
import { toast } from 'react-toastify';

/**
 * @ai-context Day-wise itinerary timeline with drag-and-drop functionality for activities
 * @dependencies Dialog components for activity editing, toast for notifications
 * @modifiable-sections activity-cards, time-slots, add-activity-modal
 * @config-driven Could use itineraryConfig for activity types and time slots
 */
const DayTimeline = ({ selectedDay, dayInfo }) => {
  const [activities, setActivities] = useState([
    {
      id: '1',
      tripId: '1',
      title: 'Airport Pickup',
      description: 'Arrival at Ngurah Rai International Airport',
      day: 1,
      startTime: '14:00',
      endTime: '15:00',
      createdBy: 'user1',
      type: 'transport'
    },
    {
      id: '2',
      tripId: '1',
      title: 'Check-in at Resort',
      description: 'Check into beachfront resort in Seminyak',
      day: 1,
      startTime: '15:30',
      endTime: '16:30',
      createdBy: 'user1',
      type: 'accommodation'
    },
    {
      id: '3',
      tripId: '1',
      title: 'Sunset Dinner',
      description: 'Traditional Balinese dinner with ocean view',
      day: 1,
      startTime: '18:00',
      endTime: '20:00',
      createdBy: 'user2',
      type: 'dining'
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    type: 'activity'
  });

  const dayActivities = activities.filter(activity => activity.day === selectedDay);

  const getActivityIcon = (type) => {
    const icons = {
      transport: 'Car',
      accommodation: 'Home',
      dining: 'UtensilsCrossed',
      activity: 'MapPin',
      sightseeing: 'Camera',
      shopping: 'ShoppingBag'
    };
    return icons[type] || 'MapPin';
  };

  const getActivityColor = (type) => {
    const colors = {
      transport: 'border-l-blue-500 bg-blue-50',
      accommodation: 'border-l-green-500 bg-green-50',
      dining: 'border-l-orange-500 bg-orange-50',
      activity: 'border-l-purple-500 bg-purple-50',
      sightseeing: 'border-l-pink-500 bg-pink-50',
      shopping: 'border-l-indigo-500 bg-indigo-50'
    };
    return colors[type] || 'border-l-gray-500 bg-gray-50';
  };

  const handleAddActivity = () => {
    const activity = {
      id: Date.now().toString(),
      tripId: '1',
      title: newActivity.title,
      description: newActivity.description,
      day: selectedDay,
      startTime: newActivity.startTime,
      endTime: newActivity.endTime,
      createdBy: 'user1',
      type: newActivity.type
    };

    setActivities(prev => [...prev, activity]);
    setNewActivity({
      title: '',
      description: '',
      startTime: '',
      endTime: '',
      type: 'activity'
    });
    setIsAddModalOpen(false);
    toast.success('Activity added successfully!');
  };

  return (
    <Card className="travel-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">
              Day {selectedDay}: {dayInfo?.title}
            </CardTitle>
            <p className="text-muted-foreground">{dayInfo?.date}</p>
          </div>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="travel-gradient">
                <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
                Add Activity
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Activity</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Activity Title</Label>
                  <Input
                    id="title"
                    value={newActivity.title}
                    onChange={(e) => setNewActivity(prev => ({...prev, title: e.target.value}))}
                    placeholder="Enter activity title"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newActivity.description}
                    onChange={(e) => setNewActivity(prev => ({...prev, description: e.target.value}))}
                    placeholder="Enter activity description"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={newActivity.startTime}
                      onChange={(e) => setNewActivity(prev => ({...prev, startTime: e.target.value}))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={newActivity.endTime}
                      onChange={(e) => setNewActivity(prev => ({...prev, endTime: e.target.value}))}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddActivity} className="travel-gradient">
                    Add Activity
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dayActivities.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <ApperIcon name="Calendar" className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No activities planned for this day</p>
              <p className="text-sm">Add your first activity to get started!</p>
            </div>
          ) : (
            dayActivities
              .sort((a, b) => a.startTime.localeCompare(b.startTime))
              .map((activity) => (
                <div 
                  key={activity.id}
                  className={`activity-card border-l-4 p-4 rounded-lg ${getActivityColor(activity.type)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                          <ApperIcon name={getActivityIcon(activity.type)} className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{activity.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {activity.startTime} - {activity.endTime}
                          </Badge>
                          <Badge variant="outline" className="text-xs capitalize">
                            {activity.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ApperIcon name="MoreVertical" className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DayTimeline;