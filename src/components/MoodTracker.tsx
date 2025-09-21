import React, { useState } from 'react';
import { Button } from './ui/wellness-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Smile, Meh, Frown, Angry, Laugh } from 'lucide-react';
import { cn } from '@/lib/utils';

const moods = [
  { name: 'Excellent', icon: Laugh, color: 'text-green-500', value: 5 },
  { name: 'Good', icon: Smile, color: 'text-blue-500', value: 4 },
  { name: 'Okay', icon: Meh, color: 'text-yellow-500', value: 3 },
  { name: 'Poor', icon: Frown, color: 'text-orange-500', value: 2 },
  { name: 'Terrible', icon: Angry, color: 'text-red-500', value: 1 },
];

const moodTags = [
  'Anxious', 'Happy', 'Stressed', 'Calm', 'Energetic', 'Tired', 
  'Focused', 'Overwhelmed', 'Grateful', 'Sad', 'Excited', 'Peaceful'
];

interface MoodEntry {
  id: string;
  mood: number;
  tags: string[];
  note: string;
  timestamp: Date;
}

const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [recentEntries] = useState<MoodEntry[]>([
    {
      id: '1',
      mood: 4,
      tags: ['Happy', 'Energetic'],
      note: 'Had a great workout this morning!',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: '2',
      mood: 3,
      tags: ['Stressed', 'Focused'],
      note: 'Busy day at work but making progress.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    },
  ]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    if (!selectedMood) return;
    
    const moodData = {
      mood: selectedMood,
      tags: selectedTags,
      note: note.trim(),
      timestamp: new Date().toISOString(),
    };
    
    // This would connect to your backend API
    console.log('Submitting mood entry:', moodData);
    
    // Reset form
    setSelectedMood(null);
    setSelectedTags([]);
    setNote('');
    
    // You would typically show a success toast here
  };

  const getMoodData = (value: number) => moods.find(m => m.value === value);

  return (
    <div className="space-y-6">
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            How are you feeling right now?
          </CardTitle>
          <CardDescription>
            Track your mood to understand patterns and improve your wellbeing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mood Selection */}
          <div className="grid grid-cols-5 gap-3">
            {moods.map((mood) => {
              const Icon = mood.icon;
              const isSelected = selectedMood === mood.value;
              
              return (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all hover:scale-105",
                    isSelected 
                      ? "border-primary bg-primary/10 shadow-glow" 
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <Icon className={cn("h-8 w-8", mood.color)} />
                  <span className="text-sm font-medium">{mood.name}</span>
                </button>
              );
            })}
          </div>

          {/* Tags Selection */}
          {selectedMood && (
            <div className="space-y-3 animate-fade-in">
              <h4 className="font-medium">What's contributing to this feeling?</h4>
              <div className="flex flex-wrap gap-2">
                {moodTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className={cn(
                      "cursor-pointer transition-all hover:scale-105",
                      selectedTags.includes(tag) 
                        ? "bg-primary hover:bg-primary/90" 
                        : "hover:bg-accent"
                    )}
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Note Input */}
          {selectedMood && (
            <div className="space-y-2 animate-fade-in">
              <label htmlFor="note" className="text-sm font-medium">
                Add a note (optional)
              </label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="How was your day? Any specific thoughts or experiences?"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring min-h-[80px] resize-none"
              />
            </div>
          )}

          {/* Submit Button */}
          {selectedMood && (
            <Button 
              onClick={handleSubmit}
              variant="wellness" 
              size="lg" 
              className="w-full animate-scale-in"
            >
              Save Mood Entry
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Recent Entries */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Recent Entries</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentEntries.map((entry) => {
            const moodData = getMoodData(entry.mood);
            if (!moodData) return null;
            
            const Icon = moodData.icon;
            
            return (
              <div key={entry.id} className="flex items-start gap-3 p-3 rounded-lg bg-accent/30">
                <div className="flex flex-col items-center gap-1">
                  <Icon className={cn("h-6 w-6", moodData.color)} />
                  <span className="text-xs text-muted-foreground">
                    {entry.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {entry.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {entry.note && (
                    <p className="text-sm text-muted-foreground">{entry.note}</p>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodTracker;