import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import ApperIcon from '../ApperIcon';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

/**
 * @ai-context Displays trip overview with editable details for trip creators
 * @dependencies format from date-fns, toast for notifications
 * @modifiable-sections trip-display, edit-modal, date-formatting
 * @config-driven Could use tripConfig for field definitions
 */
const TripOverviewSection = ({ trip, currentUser }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: trip.name,
    destination: trip.destination,
    startDate: trip.startDate,
    endDate: trip.endDate
  });

  const isCreator = currentUser.id === trip.creatorId;
  const tripDuration = Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24)) + 1;

  const handleSaveChanges = () => {
    // Simulate API call
    toast.success('Trip details updated successfully!');
    setIsEditModalOpen(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      planning: 'bg-blue-100 text-blue-800',
      confirmed: 'bg-green-100 text-green-800',
      ongoing: 'bg-orange-100 text-orange-800',
      completed: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || colors.planning;
  };

  return (
    <Card className="travel-card relative overflow-hidden">
      <div className="absolute inset-0 travel-gradient opacity-5"></div>
      <CardHeader className="relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <CardTitle className="text-3xl font-bold text-foreground">
                {trip.name}
              </CardTitle>
              <Badge className={getStatusColor(trip.status)}>
                {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
              </Badge>
            </div>
            <div className="flex items-center space-x-6 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <ApperIcon name="MapPin" className="h-4 w-4 text-travel-600" />
                <span className="font-medium">{trip.destination}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Calendar" className="h-4 w-4 text-travel-600" />
                <span>
                  {format(new Date(trip.startDate), 'MMM dd')} - {format(new Date(trip.endDate), 'MMM dd, yyyy')}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Clock" className="h-4 w-4 text-travel-600" />
                <span>{tripDuration} days</span>
              </div>
            </div>
          </div>

          {isCreator && (
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2">
                  <ApperIcon name="Edit3" className="h-4 w-4" />
                  <span>Edit Trip Details</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit Trip Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="tripName">Trip Name</Label>
                    <Input
                      id="tripName"
                      value={editForm.name}
                      onChange={(e) => setEditForm(prev => ({...prev, name: e.target.value}))}
                      placeholder="Enter trip name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="destination">Destination</Label>
                    <Input
                      id="destination"
                      value={editForm.destination}
                      onChange={(e) => setEditForm(prev => ({...prev, destination: e.target.value}))}
                      placeholder="Enter destination"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={editForm.startDate}
                        onChange={(e) => setEditForm(prev => ({...prev, startDate: e.target.value}))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={editForm.endDate}
                        onChange={(e) => setEditForm(prev => ({...prev, endDate: e.target.value}))}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
<Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveChanges} className="travel-gradient">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
    </Card>
  );
};

export default TripOverviewSection;