import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/wellness-button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Plus, 
  BookOpen, 
  Search, 
  Calendar, 
  Heart, 
  Brain,
  Smile,
  Meh,
  Frown,
  Filter,
  Edit,
  Trash2,
  Eye,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isPrivate: boolean;
  wordCount: number;
}

const JournalFeature: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      title: 'Morning Reflection',
      content: 'Today I woke up feeling grateful for the small things in life. The sun was shining through my window, and I could hear birds chirping outside. It reminded me to slow down and appreciate these peaceful moments. I\'ve been trying to practice mindfulness more regularly, and I think it\'s starting to make a difference in how I approach each day.',
      mood: 4,
      tags: ['gratitude', 'mindfulness', 'morning'],
      createdAt: '2024-01-21T08:00:00Z',
      updatedAt: '2024-01-21T08:00:00Z',
      isPrivate: false,
      wordCount: 67,
    },
    {
      id: '2',
      title: 'Challenging Day at Work',
      content: 'Work was particularly stressful today. We had a big presentation, and I felt overwhelmed with all the preparation. But I managed to get through it, and the feedback was actually positive. I\'m learning that my anxiety often makes things seem worse than they are. Deep breathing exercises really helped me stay centered during the most intense moments.',
      mood: 3,
      tags: ['work', 'stress', 'anxiety', 'achievement'],
      createdAt: '2024-01-20T18:30:00Z',
      updatedAt: '2024-01-20T18:30:00Z',
      isPrivate: false,
      wordCount: 78,
    },
    {
      id: '3',
      title: 'Weekend Adventures',
      content: 'Spent the weekend hiking with friends. There\'s something magical about being in nature that instantly lifts my mood. We reached the summit after a challenging climb, and the view was absolutely breathtaking. These moments remind me why it\'s so important to step away from technology and connect with the natural world.',
      mood: 5,
      tags: ['nature', 'friends', 'adventure', 'happiness'],
      createdAt: '2024-01-19T16:00:00Z',
      updatedAt: '2024-01-19T16:00:00Z',
      isPrivate: false,
      wordCount: 65,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: 3,
    tags: [] as string[],
    isPrivate: false,
  });

  const moodIcons = {
    1: { icon: Frown, color: 'text-red-500', label: 'Terrible' },
    2: { icon: Frown, color: 'text-orange-500', label: 'Poor' },
    3: { icon: Meh, color: 'text-yellow-500', label: 'Okay' },
    4: { icon: Smile, color: 'text-blue-500', label: 'Good' },
    5: { icon: Smile, color: 'text-green-500', label: 'Excellent' },
  };

  const popularTags = [
    'gratitude', 'mindfulness', 'work', 'family', 'friends', 'anxiety', 
    'happiness', 'stress', 'achievement', 'reflection', 'nature', 'growth'
  ];

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'recent') return matchesSearch && 
      new Date(entry.createdAt).getTime() > Date.now() - (7 * 24 * 60 * 60 * 1000);
    if (selectedFilter === 'positive') return matchesSearch && entry.mood >= 4;
    if (selectedFilter === 'challenging') return matchesSearch && entry.mood <= 2;
    
    return matchesSearch;
  });

  const handleCreateEntry = () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      ...newEntry,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      wordCount: newEntry.content.trim().split(/\s+/).length,
    };

    setEntries([entry, ...entries]);
    setNewEntry({
      title: '',
      content: '',
      mood: 3,
      tags: [],
      isPrivate: false,
    });
    setIsDialogOpen(false);
  };

  const handleDeleteEntry = (entryId: string) => {
    setEntries(entries.filter(entry => entry.id !== entryId));
    setSelectedEntry(null);
  };

  const handleTagInput = (tagInput: string) => {
    const tags = tagInput.split(',').map(tag => tag.trim()).filter(tag => tag);
    setNewEntry({ ...newEntry, tags });
  };

  const getMoodIcon = (mood: number) => {
    const moodData = moodIcons[mood as keyof typeof moodIcons];
    if (!moodData) return { icon: Meh, color: 'text-gray-500', label: 'Unknown' };
    return moodData;
  };

  const totalEntries = entries.length;
  const totalWords = entries.reduce((sum, entry) => sum + entry.wordCount, 0);
  const avgMood = entries.length > 0 
    ? entries.reduce((sum, entry) => sum + entry.mood, 0) / entries.length 
    : 0;
  const thisWeekEntries = entries.filter(entry => 
    new Date(entry.createdAt).getTime() > Date.now() - (7 * 24 * 60 * 60 * 1000)
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Journal</h1>
          <p className="text-muted-foreground">Reflect, process, and grow through writing</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="wellness" className="gap-2">
              <Plus className="h-4 w-4" />
              New Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Journal Entry</DialogTitle>
              <DialogDescription>
                Express your thoughts and feelings in a safe space
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Entry Title</label>
                <Input
                  placeholder="What's on your mind today?"
                  value={newEntry.title}
                  onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">How are you feeling?</label>
                <div className="flex gap-3">
                  {Object.entries(moodIcons).map(([value, data]) => {
                    const Icon = data.icon;
                    const isSelected = newEntry.mood === parseInt(value);
                    
                    return (
                      <button
                        key={value}
                        onClick={() => setNewEntry({ ...newEntry, mood: parseInt(value) })}
                        className={cn(
                          "flex flex-col items-center gap-1 p-2 rounded-lg border transition-all",
                          isSelected 
                            ? "border-primary bg-primary/10" 
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <Icon className={cn("h-6 w-6", data.color)} />
                        <span className="text-xs">{data.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Your thoughts</label>
                <Textarea
                  placeholder="Write about your day, your feelings, or anything that comes to mind..."
                  value={newEntry.content}
                  onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                  className="min-h-[200px] resize-none"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{newEntry.content.trim().split(/\s+/).filter(word => word).length} words</span>
                  <span>Keep writing - there's no limit!</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tags (comma-separated)</label>
                <Input
                  placeholder="e.g., gratitude, work, family, anxiety"
                  onChange={(e) => handleTagInput(e.target.value)}
                />
                <div className="flex flex-wrap gap-1">
                  {popularTags.map(tag => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-accent text-xs"
                      onClick={() => {
                        if (!newEntry.tags.includes(tag)) {
                          setNewEntry({ ...newEntry, tags: [...newEntry.tags, tag] });
                        }
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="private"
                  checked={newEntry.isPrivate}
                  onChange={(e) => setNewEntry({ ...newEntry, isPrivate: e.target.checked })}
                  className="rounded border-input"
                />
                <label htmlFor="private" className="text-sm">
                  Make this entry private
                </label>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="wellness" onClick={handleCreateEntry}>
                Save Entry
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
                <p className="text-sm text-muted-foreground">Total Entries</p>
                <p className="text-2xl font-bold text-primary">{totalEntries}</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Words Written</p>
                <p className="text-2xl font-bold text-primary">{totalWords.toLocaleString()}</p>
              </div>
              <Edit className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Mood</p>
                <p className="text-2xl font-bold text-primary">{avgMood.toFixed(1)}/5</p>
              </div>
              <Heart className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold text-primary">{thisWeekEntries}</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-soft">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search entries by title, content, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Tabs value={selectedFilter} onValueChange={setSelectedFilter}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="positive">Positive</TabsTrigger>
                <TabsTrigger value="challenging">Challenging</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Entries List */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <Card className="shadow-soft">
            <CardContent className="p-12 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                {searchTerm ? 'No entries found' : 'No journal entries yet'}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchTerm 
                  ? 'Try adjusting your search terms or filters'
                  : 'Start your journaling journey by writing your first entry'
                }
              </p>
              <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Write First Entry
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredEntries.map((entry) => {
            const moodData = getMoodIcon(entry.mood);
            const MoodIcon = moodData.icon;
            
            return (
              <Card key={entry.id} className="shadow-soft hover:shadow-glow transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{entry.title}</h3>
                        <div className="flex items-center gap-1">
                          <MoodIcon className={cn("h-4 w-4", moodData.color)} />
                          <span className="text-xs text-muted-foreground">{moodData.label}</span>
                        </div>
                        {entry.isPrivate && (
                          <Badge variant="outline" className="text-xs">Private</Badge>
                        )}
                      </div>
                      
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-3">
                        {entry.content}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {entry.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(entry.createdAt).toLocaleDateString()}
                        </span>
                        <span>{entry.wordCount} words</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-1 ml-4">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => setSelectedEntry(entry)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDeleteEntry(entry.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Entry Detail Modal */}
      {selectedEntry && (
        <Dialog open={!!selectedEntry} onOpenChange={() => setSelectedEntry(null)}>
          <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <DialogTitle>{selectedEntry.title}</DialogTitle>
                <div className="flex items-center gap-1">
                  {(() => {
                    const moodData = getMoodIcon(selectedEntry.mood);
                    const MoodIcon = moodData.icon;
                    return (
                      <>
                        <MoodIcon className={cn("h-4 w-4", moodData.color)} />
                        <span className="text-sm text-muted-foreground">{moodData.label}</span>
                      </>
                    );
                  })()}
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{new Date(selectedEntry.createdAt).toLocaleDateString()}</span>
                <span>{selectedEntry.wordCount} words</span>
                {selectedEntry.isPrivate && <Badge variant="outline">Private</Badge>}
              </div>
            </DialogHeader>
            
            <div className="py-4 space-y-4">
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                  {selectedEntry.content}
                </p>
              </div>
              
              {selectedEntry.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {selectedEntry.tags.map(tag => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default JournalFeature;