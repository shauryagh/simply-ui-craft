import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/wellness-button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { 
  Plus, 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Video, 
  Phone,
  MapPin,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Session {
  id: string;
  title: string;
  description: string;
  type: 'therapy' | 'counseling' | 'group' | 'workshop' | 'checkup';
  provider: {
    name: string;
    specialization: string;
    avatar?: string;
  };
  dateTime: string;
  duration: number; // in minutes
  location: {
    type: 'online' | 'in-person';
    details: string;
  };
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
  reminders: boolean;
  cost?: number;
  createdAt: string;
}

const SessionScheduler: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: '1',
      title: 'Individual Therapy Session',
      description: 'Weekly therapy session focusing on anxiety management and coping strategies',
      type: 'therapy',
      provider: {
        name: 'Dr. Sarah Johnson',
        specialization: 'Anxiety & Depression Specialist',
      },
      dateTime: '2024-01-25T14:00:00Z',
      duration: 60,
      location: {
        type: 'online',
        details: 'Zoom meeting link will be provided',
      },
      status: 'scheduled',
      reminders: true,
      cost: 120,
      createdAt: '2024-01-20T10:00:00Z',
    },
    {
      id: '2',
      title: 'Group Support Meeting',
      description: 'Weekly support group for individuals dealing with workplace stress',
      type: 'group',
      provider: {
        name: 'MindWell Community Center',
        specialization: 'Group Therapy & Support',
      },
      dateTime: '2024-01-23T18:30:00Z',
      duration: 90,
      location: {
        type: 'in-person',
        details: '123 Wellness Street, Suite 200, City, State 12345',
      },
      status: 'completed',
      notes: 'Great session today. Learned new breathing techniques.',
      reminders: true,
      cost: 25,
      createdAt: '2024-01-15T09:00:00Z',
    },
    {
      id: '3',
      title: 'Mindfulness Workshop',
      description: 'Introduction to mindfulness meditation and stress reduction techniques',
      type: 'workshop',
      provider: {
        name: 'Zen Wellness Studio',
        specialization: 'Mindfulness & Meditation',
      },
      dateTime: '2024-01-28T10:00:00Z',
      duration: 120,
      location: {
        type: 'in-person',
        details: '456 Peace Avenue, Meditation Center',
      },
      status: 'scheduled',
      reminders: true,
      cost: 40,
      createdAt: '2024-01-18T15:30:00Z',
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [newSession, setNewSession] = useState({
    title: '',
    description: '',
    type: 'therapy' as const,
    providerName: '',
    providerSpecialization: '',
    date: '',
    time: '',
    duration: 60,
    locationType: 'online' as const,
    locationDetails: '',
    cost: 0,
    reminders: true,
  });

  const sessionTypes = [
    { value: 'therapy', label: 'Individual Therapy', color: 'bg-blue-500' },
    { value: 'counseling', label: 'Counseling', color: 'bg-green-500' },
    { value: 'group', label: 'Group Session', color: 'bg-purple-500' },
    { value: 'workshop', label: 'Workshop', color: 'bg-orange-500' },
    { value: 'checkup', label: 'Check-up', color: 'bg-pink-500' },
  ];

  const statusConfig = {
    scheduled: { icon: Clock, color: 'text-blue-500', bg: 'bg-blue-100', label: 'Scheduled' },
    completed: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100', label: 'Completed' },
    cancelled: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-100', label: 'Cancelled' },
    rescheduled: { icon: AlertCircle, color: 'text-yellow-500', bg: 'bg-yellow-100', label: 'Rescheduled' },
  };

  const upcomingSessions = sessions.filter(session => 
    new Date(session.dateTime) > new Date() && session.status === 'scheduled'
  );
  
  const completedSessions = sessions.filter(session => session.status === 'completed');
  const totalCost = sessions.reduce((sum, session) => sum + (session.cost || 0), 0);
  const thisMonthSessions = sessions.filter(session => 
    new Date(session.dateTime).getMonth() === new Date().getMonth()
  );

  const handleCreateSession = () => {
    if (!newSession.title.trim() || !newSession.date || !newSession.time) return;

    const session: Session = {
      id: Date.now().toString(),
      title: newSession.title,
      description: newSession.description,
      type: newSession.type,
      provider: {
        name: newSession.providerName,
        specialization: newSession.providerSpecialization,
      },
      dateTime: new Date(`${newSession.date}T${newSession.time}`).toISOString(),
      duration: newSession.duration,
      location: {
        type: newSession.locationType,
        details: newSession.locationDetails,
      },
      status: 'scheduled',
      reminders: newSession.reminders,
      cost: newSession.cost,
      createdAt: new Date().toISOString(),
    };

    setSessions([...sessions, session]);
    setNewSession({
      title: '',
      description: '',
      type: 'therapy',
      providerName: '',
      providerSpecialization: '',
      date: '',
      time: '',
      duration: 60,
      locationType: 'online',
      locationDetails: '',
      cost: 0,
      reminders: true,
    });
    setIsDialogOpen(false);
  };

  const handleStatusChange = (sessionId: string, newStatus: Session['status']) => {
    setSessions(sessions.map(session => 
      session.id === sessionId ? { ...session, status: newStatus } : session
    ));
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions(sessions.filter(session => session.id !== sessionId));
    setSelectedSession(null);
  };

  const getTypeConfig = (type: string) => {
    return sessionTypes.find(t => t.value === type) || sessionTypes[0];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Session Scheduler</h1>
          <p className="text-muted-foreground">Manage your therapy sessions and wellness appointments</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="wellness" className="gap-2">
              <Plus className="h-4 w-4" />
              Schedule Session
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Schedule New Session</DialogTitle>
              <DialogDescription>
                Book a new therapy session or wellness appointment
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="title">Session Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Weekly Therapy Session"
                    value={newSession.title}
                    onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="What will this session focus on?"
                    value={newSession.description}
                    onChange={(e) => setNewSession({ ...newSession, description: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Session Type</Label>
                  <Select value={newSession.type} onValueChange={(value: any) => setNewSession({ ...newSession, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sessionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Duration (minutes)</Label>
                  <Select value={newSession.duration.toString()} onValueChange={(value) => setNewSession({ ...newSession, duration: parseInt(value) })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="providerName">Provider Name</Label>
                  <Input
                    id="providerName"
                    placeholder="Dr. Smith"
                    value={newSession.providerName}
                    onChange={(e) => setNewSession({ ...newSession, providerName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="providerSpecialization">Specialization</Label>
                  <Input
                    id="providerSpecialization"
                    placeholder="Anxiety Specialist"
                    value={newSession.providerSpecialization}
                    onChange={(e) => setNewSession({ ...newSession, providerSpecialization: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newSession.date}
                    onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newSession.time}
                    onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Location Type</Label>
                  <Select value={newSession.locationType} onValueChange={(value: any) => setNewSession({ ...newSession, locationType: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="in-person">In-Person</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cost">Cost ($)</Label>
                  <Input
                    id="cost"
                    type="number"
                    placeholder="0"
                    value={newSession.cost || ''}
                    onChange={(e) => setNewSession({ ...newSession, cost: parseFloat(e.target.value) || 0 })}
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <Label htmlFor="locationDetails">
                    {newSession.locationType === 'online' ? 'Meeting Link/Platform' : 'Address'}
                  </Label>
                  <Input
                    id="locationDetails"
                    placeholder={newSession.locationType === 'online' ? 'Zoom, Google Meet, etc.' : '123 Main St, City, State'}
                    value={newSession.locationDetails}
                    onChange={(e) => setNewSession({ ...newSession, locationDetails: e.target.value })}
                  />
                </div>

                <div className="flex items-center space-x-2 col-span-2">
                  <input
                    type="checkbox"
                    id="reminders"
                    checked={newSession.reminders}
                    onChange={(e) => setNewSession({ ...newSession, reminders: e.target.checked })}
                  />
                  <Label htmlFor="reminders">Enable reminders</Label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="wellness" onClick={handleCreateSession}>
                Schedule Session
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Upcoming</p>
                <p className="text-2xl font-bold text-primary">{upcomingSessions.length}</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-success">{completedSessions.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-primary">{thisMonthSessions.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Cost</p>
                <p className="text-2xl font-bold text-primary">${totalCost}</p>
              </div>
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Sessions */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Upcoming Sessions
          </CardTitle>
          <CardDescription>Your scheduled appointments</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingSessions.length === 0 ? (
            <div className="text-center py-8">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No upcoming sessions</h3>
              <p className="text-sm text-muted-foreground mb-4">Schedule your next therapy session or wellness appointment</p>
              <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Schedule Session
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingSessions.map((session) => {
                const typeConfig = getTypeConfig(session.type);
                const statusInfo = statusConfig[session.status];
                const StatusIcon = statusInfo.icon;
                
                return (
                  <div key={session.id} className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{session.title}</h4>
                          <Badge className={cn("text-white", typeConfig.color)}>
                            {typeConfig.label}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <StatusIcon className={cn("h-4 w-4", statusInfo.color)} />
                            <span className="text-sm text-muted-foreground">{statusInfo.label}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">{session.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{session.provider.name}</p>
                              <p className="text-muted-foreground text-xs">{session.provider.specialization}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{new Date(session.dateTime).toLocaleDateString()}</p>
                              <p className="text-muted-foreground text-xs">
                                {new Date(session.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({session.duration} min)
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {session.location.type === 'online' ? (
                              <Video className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                            )}
                            <div>
                              <p className="font-medium capitalize">{session.location.type}</p>
                              <p className="text-muted-foreground text-xs line-clamp-1">{session.location.details}</p>
                            </div>
                          </div>
                        </div>
                        
                        {session.cost && (
                          <div className="mt-3 text-sm">
                            <span className="text-muted-foreground">Cost: </span>
                            <span className="font-medium">${session.cost}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-1 ml-4">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => handleDeleteSession(session.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleStatusChange(session.id, 'completed')}
                      >
                        Mark Complete
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleStatusChange(session.id, 'rescheduled')}
                      >
                        Reschedule
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleStatusChange(session.id, 'cancelled')}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Session History */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Session History</CardTitle>
          <CardDescription>Your completed and past sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sessions.filter(s => s.status !== 'scheduled').map((session) => {
              const typeConfig = getTypeConfig(session.type);
              const statusInfo = statusConfig[session.status];
              const StatusIcon = statusInfo.icon;
              
              return (
                <div key={session.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <StatusIcon className={cn("h-5 w-5", statusInfo.color)} />
                    <div>
                      <p className="font-medium">{session.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(session.dateTime).toLocaleDateString()} • {session.provider.name}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={cn("text-white text-xs", typeConfig.color)}>
                      {typeConfig.label}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {statusInfo.label}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionScheduler;