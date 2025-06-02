import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import ApperIcon from '../ApperIcon';

/**
 * @ai-context Manages trip participants display with role indicators and invite functionality
 * @dependencies Avatar components, Tooltip for hover effects
 * @modifiable-sections participant-cards, role-logic, invite-button
 * @config-driven Uses participantConfig for role definitions
 */
const ParticipantListSection = ({ tripId }) => {
  const [participants] = useState([
    {
      id: '1',
      userId: 'user1',
      name: 'Sarah Johnson',
      role: 'creator',
      avatar: null,
      status: 'online',
      joinedAt: '2024-01-15'
    },
    {
      id: '2',
      userId: 'user2',
      name: 'Mike Chen',
      role: 'member',
      avatar: null,
      status: 'offline',
      joinedAt: '2024-01-16'
    },
    {
      id: '3',
      userId: 'user3',
      name: 'Emily Rodriguez',
      role: 'member',
      avatar: null,
      status: 'online',
      joinedAt: '2024-01-17'
    },
    {
      id: '4',
      userId: 'user4',
      name: 'David Kim',
      role: 'guest',
      avatar: null,
      status: 'away',
      joinedAt: '2024-01-18'
    }
  ]);

  const getRoleColor = (role) => {
    const colors = {
      creator: 'bg-travel-600 text-white',
      member: 'bg-blue-100 text-blue-800',
      guest: 'bg-gray-100 text-gray-700'
    };
    return colors[role] || colors.guest;
  };

  const getStatusColor = (status) => {
    const colors = {
      online: 'bg-green-500',
      offline: 'bg-gray-400',
      away: 'bg-yellow-500'
    };
    return colors[status] || colors.offline;
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="travel-card h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Trip Participants</CardTitle>
          <Badge variant="secondary">{participants.length} members</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {participants.map((participant) => (
            <TooltipProvider key={participant.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-travel-50/50 transition-colors cursor-pointer">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={participant.avatar} />
                        <AvatarFallback className="travel-gradient text-white text-sm">
                          {getInitials(participant.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div 
                        className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(participant.status)}`}
                      ></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{participant.name}</p>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getRoleColor(participant.role)}`}
                        >
                          {participant.role}
                        </Badge>
                        <span className="text-xs text-muted-foreground capitalize">
                          {participant.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Joined on {new Date(participant.joinedAt).toLocaleDateString()}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        <div className="pt-2 border-t border-travel-200/50">
          <Button variant="outline" className="w-full">
            <ApperIcon name="UserPlus" className="h-4 w-4 mr-2" />
            Invite More People
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ParticipantListSection;