import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/wellness-button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Heart, 
  Brain,
  Activity,
  ChevronRight,
  Star
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const ProgressTracker: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  // Mock data - replace with API calls
  const moodData = [
    { date: '2024-01-15', mood: 4, energy: 3, stress: 2, sleep: 7 },
    { date: '2024-01-16', mood: 3, energy: 4, stress: 3, sleep: 6 },
    { date: '2024-01-17', mood: 5, energy: 5, stress: 1, sleep: 8 },
    { date: '2024-01-18', mood: 4, energy: 3, stress: 2, sleep: 7 },
    { date: '2024-01-19', mood: 3, energy: 2, stress: 4, sleep: 5 },
    { date: '2024-01-20', mood: 4, energy: 4, stress: 2, sleep: 8 },
    { date: '2024-01-21', mood: 5, energy: 5, stress: 1, sleep: 9 },
  ];

  const goalProgress = [
    { category: 'Meditation', completed: 18, total: 21, percentage: 86 },
    { category: 'Exercise', completed: 15, total: 21, percentage: 71 },
    { category: 'Journaling', completed: 12, total: 21, percentage: 57 },
    { category: 'Sleep', completed: 19, total: 21, percentage: 90 },
  ];

  const weeklyStats = {
    avgMood: 4.0,
    avgEnergy: 3.7,
    avgStress: 2.1,
    avgSleep: 7.1,
    totalSessions: 8,
    completedGoals: 64,
    longestStreak: 12
  };

  const moodDistribution = [
    { name: 'Excellent', value: 25, color: '#22c55e' },
    { name: 'Good', value: 40, color: '#3b82f6' },
    { name: 'Okay', value: 20, color: '#f59e0b' },
    { name: 'Poor', value: 10, color: '#f97316' },
    { name: 'Terrible', value: 5, color: '#ef4444' },
  ];

  const milestones = [
    { id: 1, title: '7-day meditation streak', date: '2024-01-20', type: 'streak', icon: Brain },
    { id: 2, title: '50 mood entries logged', date: '2024-01-18', type: 'milestone', icon: Heart },
    { id: 3, title: 'First therapy session completed', date: '2024-01-15', type: 'session', icon: Star },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Progress Tracker</h1>
          <p className="text-muted-foreground">Track your wellness journey and celebrate your growth</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant={selectedTimeframe === 'week' ? 'wellness' : 'outline'}
            onClick={() => setSelectedTimeframe('week')}
          >
            This Week
          </Button>
          <Button 
            variant={selectedTimeframe === 'month' ? 'wellness' : 'outline'}
            onClick={() => setSelectedTimeframe('month')}
          >
            This Month
          </Button>
          <Button 
            variant={selectedTimeframe === 'year' ? 'wellness' : 'outline'}
            onClick={() => setSelectedTimeframe('year')}
          >
            This Year
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Mood</p>
                <p className="text-2xl font-bold text-primary">{weeklyStats.avgMood}/5</p>
                <p className="text-xs text-success flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +0.2 from last week
                </p>
              </div>
              <Heart className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sleep Quality</p>
                <p className="text-2xl font-bold text-primary">{weeklyStats.avgSleep}h</p>
                <p className="text-xs text-success flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Improving
                </p>
              </div>
              <Activity className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Goals Completed</p>
                <p className="text-2xl font-bold text-primary">{weeklyStats.completedGoals}%</p>
                <p className="text-xs text-muted-foreground">This week</p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-2xl font-bold text-primary">{weeklyStats.longestStreak}</p>
                <p className="text-xs text-muted-foreground">Days</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Mood Trends</TabsTrigger>
          <TabsTrigger value="goals">Goal Progress</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Mood & Wellness Trends</CardTitle>
              <CardDescription>Track your emotional patterns over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={moodData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="mood" stroke="#3b82f6" strokeWidth={3} name="Mood" />
                  <Line type="monotone" dataKey="energy" stroke="#10b981" strokeWidth={2} name="Energy" />
                  <Line type="monotone" dataKey="stress" stroke="#f59e0b" strokeWidth={2} name="Stress" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Mood Distribution</CardTitle>
              <CardDescription>How you've been feeling overall</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={moodDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name} ${value}%`}
                  >
                    {moodDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Goal Completion Rate</CardTitle>
              <CardDescription>Your progress across different wellness categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={goalProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="percentage" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goalProgress.map((goal) => (
              <Card key={goal.category} className="shadow-soft">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{goal.category}</h3>
                      <Badge variant="outline">{goal.percentage}%</Badge>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${goal.percentage}%` }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {goal.completed} of {goal.total} completed
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">📈 Positive Trends</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                  <div className="h-2 w-2 bg-success rounded-full" />
                  <p className="text-sm">Your mood has improved 15% this week</p>
                </div>
                <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                  <div className="h-2 w-2 bg-success rounded-full" />
                  <p className="text-sm">Sleep quality is consistently above 7 hours</p>
                </div>
                <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                  <div className="h-2 w-2 bg-success rounded-full" />
                  <p className="text-sm">Meditation streak of 7 days achieved</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">🎯 Areas for Growth</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-warning/10 rounded-lg">
                  <div className="h-2 w-2 bg-warning rounded-full" />
                  <p className="text-sm">Try to log your mood more consistently</p>
                </div>
                <div className="flex items-center gap-3 p-3 bg-warning/10 rounded-lg">
                  <div className="h-2 w-2 bg-warning rounded-full" />
                  <p className="text-sm">Consider adding more exercise to your routine</p>
                </div>
                <div className="flex items-center gap-3 p-3 bg-warning/10 rounded-lg">
                  <div className="h-2 w-2 bg-warning rounded-full" />
                  <p className="text-sm">Stress levels were higher on weekdays</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>💡 Personalized Recommendations</CardTitle>
              <CardDescription>Based on your recent patterns and progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 border border-primary/20 rounded-lg bg-primary/5">
                <Brain className="h-8 w-8 text-primary" />
                <div className="flex-1">
                  <h4 className="font-medium">Try morning meditation</h4>
                  <p className="text-sm text-muted-foreground">Your mood tends to be higher on days when you meditate early</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
              
              <div className="flex items-center gap-4 p-4 border border-primary/20 rounded-lg bg-primary/5">
                <Activity className="h-8 w-8 text-primary" />
                <div className="flex-1">
                  <h4 className="font-medium">Evening wind-down routine</h4>
                  <p className="text-sm text-muted-foreground">Better sleep correlates with improved next-day mood</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
              <CardDescription>Celebrate your wellness journey milestones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {milestones.map((milestone) => {
                const Icon = milestone.icon;
                return (
                  <div key={milestone.id} className="flex items-center gap-4 p-4 border border-primary/20 rounded-lg bg-gradient-to-r from-primary/5 to-transparent">
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{milestone.title}</h4>
                      <p className="text-sm text-muted-foreground">{milestone.date}</p>
                    </div>
                    <Badge variant="outline">{milestone.type}</Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Next Milestones</CardTitle>
              <CardDescription>Keep going to unlock these achievements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 border border-muted rounded-lg">
                <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center">
                  <Target className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-muted-foreground">100 mood entries</h4>
                  <div className="w-full bg-secondary rounded-full h-2 mt-2">
                    <div className="bg-primary h-2 rounded-full w-1/2" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">50/100 completed</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 border border-muted rounded-lg">
                <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-muted-foreground">30-day streak</h4>
                  <div className="w-full bg-secondary rounded-full h-2 mt-2">
                    <div className="bg-primary h-2 rounded-full w-2/5" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">12/30 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProgressTracker;