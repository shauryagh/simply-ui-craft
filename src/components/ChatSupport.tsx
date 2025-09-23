import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Heart, Brain, Smile } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/wellness-button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  emotion?: string;
}

const ChatSupport = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm MindWell, your personal mental health companion. How are you feeling today? I'm here to listen and support you.",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const botResponses = {
    greeting: [
      "Hello! I'm glad you're here. How can I support you today?",
      "Hi there! It's wonderful to connect with you. What's on your mind?",
      "Welcome! I'm here to listen and help. How are you feeling right now?"
    ],
    anxiety: [
      "I understand you're feeling anxious. Let's try some deep breathing together. Breathe in for 4 counts, hold for 4, and out for 4. You're safe right now.",
      "Anxiety can feel overwhelming, but remember - you've gotten through difficult moments before. What usually helps you feel more grounded?",
      "I hear that you're struggling with anxiety. Would you like to try a quick mindfulness exercise, or would you prefer to talk about what's triggering these feelings?"
    ],
    depression: [
      "I'm really glad you're reaching out. Depression can make everything feel heavy, but taking this step to connect shows incredible strength.",
      "Thank you for sharing that with me. Depression affects many people, and you're not alone in this. What's one small thing that brought you even a tiny bit of comfort recently?",
      "I want you to know that your feelings are valid, and it's okay to not be okay. Have you been able to maintain any of your daily routines?"
    ],
    stress: [
      "Stress can be really challenging to manage. Let's break this down together - what's the biggest source of stress for you right now?",
      "I understand you're feeling stressed. Sometimes it helps to focus on what we can control. What's one small action you could take today to care for yourself?",
      "Stress affects us all differently. Would you like to explore some stress-management techniques, or would you prefer to talk about what's causing the stress?"
    ],
    positive: [
      "That's wonderful to hear! I'm so glad you're feeling good. What's contributing to these positive feelings?",
      "It's beautiful when we can recognize and appreciate the good moments. Thank you for sharing that brightness with me!",
      "I love hearing when things are going well for you! Celebrating these moments is so important for our mental health."
    ],
    general: [
      "I'm here to listen. Can you tell me more about what you're experiencing?",
      "Thank you for sharing that with me. Your feelings and experiences matter. What would be most helpful for you right now?",
      "I appreciate you opening up. Sometimes just having someone listen can make a difference. How long have you been feeling this way?"
    ],
    coping: [
      "It sounds like you're looking for ways to cope. Some people find journaling, exercise, or creative activities helpful. What resonates with you?",
      "Coping strategies are very personal. Have you discovered anything in the past that's helped you through difficult times?",
      "Building a toolkit of coping strategies takes time. Would you like to explore some evidence-based techniques together?"
    ],
    support: [
      "Remember, seeking help is a sign of strength, not weakness. Have you considered speaking with a mental health professional?",
      "You don't have to go through this alone. In addition to our chats, connecting with friends, family, or a therapist can provide additional support.",
      "I'm here for you, and there are many other resources available too. Would you like information about professional support options?"
    ]
  };

  const getEmotionFromText = (text: string): string => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('happy') || lowerText.includes('good') || lowerText.includes('great') || lowerText.includes('wonderful')) return 'positive';
    if (lowerText.includes('sad') || lowerText.includes('depressed') || lowerText.includes('down') || lowerText.includes('hopeless')) return 'sad';
    if (lowerText.includes('anxious') || lowerText.includes('worried') || lowerText.includes('nervous') || lowerText.includes('panic')) return 'anxious';
    if (lowerText.includes('angry') || lowerText.includes('frustrated') || lowerText.includes('mad') || lowerText.includes('upset')) return 'angry';
    if (lowerText.includes('stressed') || lowerText.includes('overwhelmed') || lowerText.includes('pressure')) return 'stressed';
    return 'neutral';
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
    }
    
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried') || lowerMessage.includes('panic')) {
      return botResponses.anxiety[Math.floor(Math.random() * botResponses.anxiety.length)];
    }
    
    if (lowerMessage.includes('depressed') || lowerMessage.includes('depression') || lowerMessage.includes('sad') || lowerMessage.includes('hopeless')) {
      return botResponses.depression[Math.floor(Math.random() * botResponses.depression.length)];
    }
    
    if (lowerMessage.includes('stress') || lowerMessage.includes('stressed') || lowerMessage.includes('overwhelmed')) {
      return botResponses.stress[Math.floor(Math.random() * botResponses.stress.length)];
    }
    
    if (lowerMessage.includes('happy') || lowerMessage.includes('good') || lowerMessage.includes('great') || lowerMessage.includes('wonderful')) {
      return botResponses.positive[Math.floor(Math.random() * botResponses.positive.length)];
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('cope') || lowerMessage.includes('coping')) {
      return botResponses.coping[Math.floor(Math.random() * botResponses.coping.length)];
    }
    
    if (lowerMessage.includes('support') || lowerMessage.includes('alone') || lowerMessage.includes('lonely')) {
      return botResponses.support[Math.floor(Math.random() * botResponses.support.length)];
    }
    
    return botResponses.general[Math.floor(Math.random() * botResponses.general.length)];
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      emotion: getEmotionFromText(newMessage)
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(newMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getEmotionIcon = (emotion?: string) => {
    switch (emotion) {
      case 'positive': return <Smile className="h-4 w-4 text-green-500" />;
      case 'sad': return <Heart className="h-4 w-4 text-blue-500" />;
      case 'anxious': return <Brain className="h-4 w-4 text-yellow-500" />;
      case 'angry': return <Heart className="h-4 w-4 text-red-500" />;
      case 'stressed': return <Brain className="h-4 w-4 text-orange-500" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">MindWell Chat Support</h1>
        <p className="text-muted-foreground">Your personal mental health companion - available 24/7</p>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Chat with MindWell
            <Badge variant="secondary" className="ml-auto">Online</Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    message.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-accent text-accent-foreground'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  
                  <div className={`max-w-[70%] ${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    <div className={`p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-accent text-accent-foreground'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                    </div>
                    
                    <div className={`flex items-center gap-2 mt-1 text-xs text-muted-foreground ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}>
                      {message.emotion && getEmotionIcon(message.emotion)}
                      <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-accent text-accent-foreground">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-accent text-accent-foreground p-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="p-6 border-t">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Share what's on your mind..."
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1"
              />
              <Button 
                onClick={sendMessage}
                variant="wellness"
                size="icon"
                disabled={!newMessage.trim() || isTyping}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-accent"
                onClick={() => setNewMessage("I'm feeling anxious today")}
              >
                I'm feeling anxious
              </Badge>
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-accent"
                onClick={() => setNewMessage("I need help coping with stress")}
              >
                Help with stress
              </Badge>
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-accent"
                onClick={() => setNewMessage("I'm having a good day")}
              >
                I'm doing well
              </Badge>
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-accent"
                onClick={() => setNewMessage("I feel overwhelmed")}
              >
                Feeling overwhelmed
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <Heart className="h-8 w-8 text-primary mx-auto" />
              <h3 className="font-semibold">Compassionate Support</h3>
              <p className="text-sm text-muted-foreground">Available 24/7 for emotional support and guidance</p>
            </div>
            <div className="space-y-2">
              <Brain className="h-8 w-8 text-primary mx-auto" />
              <h3 className="font-semibold">Evidence-Based</h3>
              <p className="text-sm text-muted-foreground">Responses based on cognitive behavioral therapy principles</p>
            </div>
            <div className="space-y-2">
              <Smile className="h-8 w-8 text-primary mx-auto" />
              <h3 className="font-semibold">Safe Space</h3>
              <p className="text-sm text-muted-foreground">Confidential, judgment-free environment for sharing</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatSupport;