'use client';

import { Button } from '@/components/ui/button';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const WORK_TIME = 5; // 5 seconds for testing
const BREAK_TIME = 5; // 5 seconds for testing

export function PomodoroApp() {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission().then((permission) => {
          setNotificationPermission(permission);
        });
      } else {
        setNotificationPermission(Notification.permission);
      }
    }
  }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer finished - send notification
      if (notificationPermission === 'granted') {
        new Notification('NEXUS Pomodoro', {
          body: `${mode === 'work' ? 'Work' : 'Break'} session finished!`,
          icon: '/favicon.ico',
        });
      }
      
      // Auto-switch mode
      const newMode = mode === 'work' ? 'break' : 'work';
      setMode(newMode);
      setTimeLeft(newMode === 'work' ? WORK_TIME : BREAK_TIME);
      setIsRunning(false);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, mode, notificationPermission]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const toggleTimer = () => setIsRunning((r) => !r);
  
  const resetTimer = () => {
    setTimeLeft(mode === 'work' ? WORK_TIME : BREAK_TIME);
    setIsRunning(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="text-sm font-medium text-muted-foreground uppercase">
        {mode === 'work' ? 'Work' : 'Break'}
      </div>
      <div className="text-6xl font-bold tabular-nums">
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </div>
      <div className="flex gap-2">
        <Button onClick={toggleTimer} size="icon" variant={isRunning ? 'secondary' : 'default'}>
          {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button onClick={resetTimer} size="icon" variant="outline">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
      {notificationPermission === 'denied' && (
        <p className="text-xs text-muted-foreground text-center px-4">
          Notifications are blocked. Enable them to get alerts when timer finishes.
        </p>
      )}
    </div>
  );
}
