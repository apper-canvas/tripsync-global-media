import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import ApperIcon from '../ApperIcon';
import { formatDistanceToNow } from 'date-fns';

/**
 * @ai-context Real-time activity feed showing trip updates and participant actions
 * @dependencies formatDistanceToNow for relative timestamps, ScrollArea for scrollable content
 * @modifiable-sections update-types, activity-icons, timeline-display
 * @config-driven Uses updateConfig for action type definitions
 */
const UpdatesFeedSection = ({ tripId }) => {
  const [updates] = useState([
    {
      id: '1',
      userId: 'user2',
      userName: 'Mike Chen',
      action: 'activity_added',
      message: 'added Temple Hopping tour to Day 3',
      timestamp: '2024-01-20T10:30:00Z',
      type: 'itinerary'
    },
    {
      id: '2',
      userId: 'user3',
      userName: 'Emily Rodriguez',
      action: 'vote_cast',
      message: 'voted for snorkeling activity',
      timestamp: '2024-01-20T09:15:00Z',
      type: 'voting'
    },
    {
      id: '3',
      userId: 'user1',
      userName: 'Sarah Johnson',
      action: 'budget_updated',
      message: 'updated trip budget to $2,500',
      timestamp: '2024-01-20T08:45:00Z',
      type: 'budget'
    },
    {
      id: '4',
      userId: 'user4',
      userName: 'David Kim',
      action: 'note_added',
      message: 'added notes about local customs',
      timestamp: '2024-01-19T16:20:00Z',
      type: 'notes'
    },
    {
      id: '5',
      userId: 'user2',
      userName: 'Mike Chen',
      action: 'accommodation_booked',
      message: 'booked resort for nights 3-5',
      timestamp: '2024-01-19T14:10:00Z',
      type: 'accommodation'
    },
    {
      id: '6',
      userId: 'user3',
      userName: 'Emily Rodriguez',
      action: 'participant_joined',
      message: 'joined the trip',
      timestamp: '2024-01-17T12:00:00Z',
      type: 'participants'
    }
  ]);

  const getActivityIcon = (type) => {
    const icons = {
      itinerary: 'Calendar',
      voting: 'Vote',
      budget: 'DollarSign',
      notes: 'FileText',
      accommodation: 'Home',
      participants: 'Users',
      transport: 'Car'
    };
    return icons[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colors = {
      itinerary: 'text-blue-600 bg-blue-100',
      voting: 'text-purple-600 bg-purple-100',
      budget: 'text-green-600 bg-green-100',
      notes: 'text-orange-600 bg-orange-100',
      accommodation: 'text-pink-600 bg-pink-100',
      participants: 'text-travel-600 bg-travel-100',
      transport: 'text-indigo-600 bg-indigo-100'
    };
    return colors[type] || 'text-gray-600 bg-gray-100';
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="travel-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Recent Updates</CardTitle>
          <Badge variant="secondary" className="flex items-center space-x-1">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {updates.map((update) => (
              <div key={update.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-travel-50/30 transition-colors">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={null} />
                    <AvatarFallback className="text-xs travel-gradient text-white">
                      {getInitials(update.userName)}
                    </AvatarFallback>
                  </Avatar>
                  <div 
                    className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center ${getActivityColor(update.type)}`}
                  >
                    <ApperIcon name={getActivityIcon(update.type)} className="h-3 w-3" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{update.userName}</span>
                    {' '}
                    <span className="text-muted-foreground">{update.message}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(new Date(update.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default UpdatesFeedSection;