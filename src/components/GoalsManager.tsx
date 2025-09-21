import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/wellness-button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Plus, 
  Target, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Circle, 
  Edit,
  Trash2,
  Star,
  TrendingUp,
  Heart,
  Brain,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'completed' | 'paused';
  targetDate: string;
  progress: number;
  createdAt: string;
  completedAt?: string;
}

const GoalsManager: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Daily Meditation Practice',
      description: 'Meditate for 10 minutes every morning',
      category: 'mindfulness',
      priority: 'high',
      status: 'active',
      targetDate: '2024-02-29',
      progress: 75,
      createdAt: '2024-01-01',
    },
    {
      id: '2',
      title: 'Exercise 3x per Week',
      description: 'Maintain regular physical activity for better mental health',
      category: 'physical',
      priority: 'medium',
      status: 'active',
      targetDate: '2024-03-31',
      progress: 60,
      createdAt: '2024-01-05',
    },
    {
      id: '3',
      title: 'Read 2 Self-Help Books',
      description: 'Expand knowledge on personal development',
      category: 'learning',
      priority: 'low',
      status: 'active',
      targetDate: '2024-06-30',
      progress: 25,
      createdAt: '2024-01-10',
    },
    {
      id: '4',
      title: 'Practice Gratitude Daily',
      description: 'Write 3 things I\'m grateful for each day',
      category: 'mindfulness',
      priority: 'high',
      status: 'completed',
      targetDate: '2024-01-31',
      progress: 100,
      createdAt: '2024-01-01',
      completedAt: '2024-01-25',
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium' as const,
    targetDate: '',
  });

  const categories = [
    { value: 'mindfulness', label: 'Mindfulness', icon: Brain, color: 'bg-blue-500' },
    { value: 'physical', label: 'Physical Health', icon: Activity, color: 'bg-green-500' },
    { value: 'emotional', label: 'Emotional', icon: Heart, color: 'bg-pink-500' },
    { value: 'social', label: 'Social', icon: Target, color: 'bg-purple-500' },
    { value: 'learning', label: 'Learning', icon: TrendingUp, color: 'bg-orange-500' },
  ];

  const priorityColors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500',
  };

  const statusColors = {
    active: 'bg-blue-500',
    completed: 'bg-green-500',
    paused: 'bg-gray-500',
  };

  const filteredGoals = goals.filter(goal => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'active') return goal.status === 'active';
    if (selectedFilter === 'completed') return goal.status === 'completed';
    if (selectedFilter === 'paused') return goal.status === 'paused';
    return goal.category === selectedFilter;
  });

  const handleCreateGoal = () => {
    if (!newGoal.title.trim()) return;

    const goal: Goal = {
      id: Date.now().toString(),
      ...newGoal,
      status: 'active',
      progress: 0,
      createdAt: new Date().toISOString(),
    };

    setGoals([...goals, goal]);
    setNewGoal({
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      targetDate: '',
    });
    setIsDialogOpen(false);
  };

  const handleToggleGoal = (goalId: string) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { 
            ...goal, 
            status: goal.status === 'completed' ? 'active' : 'completed',
            progress: goal.status === 'completed' ? goal.progress : 100,
            completedAt: goal.status === 'completed' ? undefined : new Date().toISOString()
          }
        : goal
    ));
  };

  const handleDeleteGoal = (goalId: string) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const getCategoryInfo = (category: string) => {
    return categories.find(cat => cat.value === category) || categories[0];
  };

  const activeGoals = goals.filter(g => g.status === 'active');
  const completedGoals = goals.filter(g => g.status === 'completed');
  const totalProgress = activeGoals.length > 0 
    ? activeGoals.reduce((sum, goal) => sum + goal.progress, 0) / activeGoals.length 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Goals Manager</h1>
          <p className="text-muted-foreground">Set, track, and achieve your wellness objectives</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="wellness" className="gap-2">
              <Plus className="h-4 w-4" />
              Create Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
              <DialogDescription>
                Set a new wellness goal to work towards
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Goal Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Meditate daily for 10 minutes"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Why is this goal important to you?"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={newGoal.category} onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select value={newGoal.priority} onValueChange={(value: any) => setNewGoal({ ...newGoal, priority: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetDate">Target Date</Label>
                <Input
                  id="targetDate"
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="wellness" onClick={handleCreateGoal}>
                Create Goal
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
                <p className="text-sm text-muted-foreground">Active Goals</p>
                <p className="text-2xl font-bold text-primary">{activeGoals.length}</p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-success">{completedGoals.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Progress</p>
                <p className="text-2xl font-bold text-primary">{Math.round(totalProgress)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-primary">{completedGoals.filter(g => g.completedAt && new Date(g.completedAt).getMonth() === new Date().getMonth()).length}</p>
              </div>
              <Star className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Tabs value={selectedFilter} onValueChange={setSelectedFilter}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All Goals</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          {categories.slice(0, 3).map(category => (
            <TabsTrigger key={category.value} value={category.value}>
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedFilter} className="space-y-4">
          {filteredGoals.length === 0 ? (
            <Card className="shadow-soft">
              <CardContent className="p-12 text-center">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">No goals found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {selectedFilter === 'all' 
                    ? 'Create your first wellness goal to get started'
                    : `No ${selectedFilter} goals yet`
                  }
                </p>
                <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Goal
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredGoals.map((goal) => {
                const categoryInfo = getCategoryInfo(goal.category);
                const Icon = categoryInfo.icon;
                
                return (
                  <Card key={goal.id} className={cn(
                    "shadow-soft transition-all hover:shadow-glow",
                    goal.status === 'completed' && "bg-success/5 border-success/20"
                  )}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={cn("h-10 w-10 rounded-full flex items-center justify-center", categoryInfo.color)}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className={cn(
                              "text-lg",
                              goal.status === 'completed' && "line-through text-muted-foreground"
                            )}>
                              {goal.title}
                            </CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge 
                                variant="outline" 
                                className={cn("text-xs", `${priorityColors[goal.priority]} text-white border-0`)}
                              >
                                {goal.priority}
                              </Badge>
                              <Badge 
                                variant="outline"
                                className={cn("text-xs", `${statusColors[goal.status]} text-white border-0`)}
                              >
                                {goal.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => handleDeleteGoal(goal.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div 
                            className={cn(
                              "h-2 rounded-full transition-all duration-300",
                              goal.status === 'completed' ? "bg-success" : "bg-primary"
                            )}
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Due: {new Date(goal.targetDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left</span>
                        </div>
                      </div>

                      <Button 
                        variant={goal.status === 'completed' ? 'outline' : 'wellness'}
                        className="w-full"
                        onClick={() => handleToggleGoal(goal.id)}
                      >
                        {goal.status === 'completed' ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Completed
                          </>
                        ) : (
                          <>
                            <Circle className="h-4 w-4 mr-2" />
                            Mark as Complete
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GoalsManager;