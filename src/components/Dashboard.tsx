import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/wellness-button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  Heart, 
  TrendingUp, 
  Target, 
  Calendar,
  Award,
  Smile,
  Brain,
  Activity,
  Users,
  Clock
} from 'lucide-react';
import wellnessHero from '../assets/wellness-hero.jpg';

interface DashboardProps {
  onNavigate: (path: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const wellnessStats = {
    weeklyMoodAverage: 4.2,
    completedGoals: 7,
    totalGoals: 10,
    streakDays: 12,
    sessionsThisWeek: 3,
  };

  const recentActivities = [
    { id: 1, type: 'mood', description: 'Logged mood as "Happy"', time: '2 hours ago', icon: Heart },
    { id: 2, type: 'goal', description: 'Completed meditation goal', time: '5 hours ago', icon: Target },
    { id: 3, type: 'journal', description: 'Added journal entry', time: '1 day ago', icon: Brain },
    { id: 4, type: 'session', description: 'Attended therapy session', time: '2 days ago', icon: Users },
  ];

  const todaysGoals = [
    { id: 1, title: '10 minutes of meditation', completed: true, category: 'mindfulness' },
    { id: 2, title: 'Log mood 3 times', completed: false, category: 'tracking' },
    { id: 3, title: 'Write in journal', completed: false, category: 'reflection' },
    { id: 4, title: 'Practice gratitude', completed: true, category: 'positivity' },
  ];

  const completedGoalsCount = todaysGoals.filter(goal => goal.completed).length;
  const goalProgress = (completedGoalsCount / todaysGoals.length) * 100;

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative rounded-lg overflow-hidden shadow-soft">
        <img 
          src={wellnessHero} 
          alt="Wellness journey" 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center">
          <div className="p-6 text-white">
            <h1 className="text-2xl font-bold mb-2">Welcome back to your wellness journey</h1>
            <p className="text-white/90 mb-4">You're doing great! Keep up the positive momentum.</p>
            <div className="flex gap-2">
              <Button 
                variant="floating" 
                onClick={() => onNavigate('/mood')}
                className="text-white border-white/30"
              >
                <Heart className="h-4 w-4" />
                Log Mood
              </Button>
              <Button 
                variant="floating" 
                onClick={() => onNavigate('/mindfulness')}
                className="text-white border-white/30"
              >
                <Brain className="h-4 w-4" />
                Start Session
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-soft hover:shadow-glow transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Mood Average</p>
                <p className="text-2xl font-bold text-primary">{wellnessStats.weeklyMoodAverage}/5</p>
                <p className="text-xs text-success">+0.3 from last week</p>
              </div>
              <div className="h-12 w-12 bg-gradient-wellness rounded-full flex items-center justify-center">
                <Smile className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-glow transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Streak</p>
                <p className="text-2xl font-bold text-primary">{wellnessStats.streakDays} days</p>
                <p className="text-xs text-success">Keep it up!</p>
              </div>
              <div className="h-12 w-12 bg-gradient-primary rounded-full flex items-center justify-center">
                <Award className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-glow transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Goals Progress</p>
                <p className="text-2xl font-bold text-primary">{wellnessStats.completedGoals}/{wellnessStats.totalGoals}</p>
                <p className="text-xs text-muted-foreground">This month</p>
              </div>
              <div className="h-12 w-12 bg-success rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-glow transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sessions</p>
                <p className="text-2xl font-bold text-primary">{wellnessStats.sessionsThisWeek}</p>
                <p className="text-xs text-muted-foreground">This week</p>
              </div>
              <div className="h-12 w-12 bg-accent rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-accent-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Goals */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Today's Goals
            </CardTitle>
            <CardDescription>
              Complete your daily wellness objectives
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{completedGoalsCount}/{todaysGoals.length}</span>
              </div>
              <Progress value={goalProgress} className="h-2" />
            </div>
            
            <div className="space-y-3">
              {todaysGoals.map((goal) => (
                <div key={goal.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                    goal.completed 
                      ? 'bg-success border-success' 
                      : 'border-muted-foreground'
                  }`}>
                    {goal.completed && <div className="h-2 w-2 bg-white rounded-full" />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${goal.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {goal.title}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {goal.category}
                  </Badge>
                </div>
              ))}
            </div>
            
            <Button 
              variant="wellness" 
              className="w-full" 
              onClick={() => onNavigate('/goals')}
            >
              View All Goals
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your latest wellness interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.description}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <Button 
              variant="outline" 
              className="w-full mt-4" 
              onClick={() => onNavigate('/progress')}
            >
              View Full History
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Jump into your wellness activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="calm" 
              className="h-20 flex-col gap-2" 
              onClick={() => onNavigate('/mood')}
            >
              <Heart className="h-6 w-6" />
              <span className="text-sm">Log Mood</span>
            </Button>
            <Button 
              variant="calm" 
              className="h-20 flex-col gap-2" 
              onClick={() => onNavigate('/journal')}
            >
              <Brain className="h-6 w-6" />
              <span className="text-sm">Journal</span>
            </Button>
            <Button 
              variant="calm" 
              className="h-20 flex-col gap-2" 
              onClick={() => onNavigate('/mindfulness')}
            >
              <Activity className="h-6 w-6" />
              <span className="text-sm">Meditate</span>
            </Button>
            <Button 
              variant="calm" 
              className="h-20 flex-col gap-2" 
              onClick={() => onNavigate('/progress')}
            >
              <TrendingUp className="h-6 w-6" />
              <span className="text-sm">Progress</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;