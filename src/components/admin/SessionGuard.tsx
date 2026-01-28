import { useEffect, useState, useCallback, useRef, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { getAdminPaths } from '@/config/adminConfig';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Clock } from 'lucide-react';

interface SessionGuardProps {
  children: ReactNode;
  timeoutMinutes?: number;
  warningMinutes?: number;
}

const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes default
const WARNING_BEFORE_MS = 5 * 60 * 1000; // 5 minutes warning

const SessionGuard = ({ 
  children, 
  timeoutMinutes = 30,
  warningMinutes = 5 
}: SessionGuardProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const lastActivityRef = useRef<number>(Date.now());
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const warningIdRef = useRef<NodeJS.Timeout | null>(null);
  
  const timeoutMs = timeoutMinutes * 60 * 1000;
  const warningMs = warningMinutes * 60 * 1000;
  const adminPaths = getAdminPaths();

  const handleLogout = useCallback(async () => {
    setShowWarning(false);
    await signOut();
    navigate(adminPaths.login);
  }, [signOut, navigate, adminPaths.login]);

  const resetTimers = useCallback(() => {
    lastActivityRef.current = Date.now();
    setShowWarning(false);
    
    // Clear existing timers
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    if (warningIdRef.current) {
      clearTimeout(warningIdRef.current);
    }

    // Set warning timer (shows warning dialog before timeout)
    warningIdRef.current = setTimeout(() => {
      setShowWarning(true);
      setRemainingSeconds(Math.floor(warningMs / 1000));
    }, timeoutMs - warningMs);

    // Set logout timer
    timeoutIdRef.current = setTimeout(() => {
      handleLogout();
    }, timeoutMs);
  }, [timeoutMs, warningMs, handleLogout]);

  const handleStayLoggedIn = useCallback(() => {
    setShowWarning(false);
    resetTimers();
  }, [resetTimers]);

  // Track user activity
  useEffect(() => {
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'mousemove'];
    
    const handleActivity = () => {
      // Only reset if not showing warning and significant time has passed
      const timeSinceLastActivity = Date.now() - lastActivityRef.current;
      if (!showWarning && timeSinceLastActivity > 1000) {
        resetTimers();
      }
    };

    events.forEach(event => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Initialize timers
    resetTimers();

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
      if (warningIdRef.current) clearTimeout(warningIdRef.current);
    };
  }, [resetTimers, showWarning]);

  // Countdown timer for warning dialog
  useEffect(() => {
    if (!showWarning) return;

    const interval = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showWarning]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {children}
      
      <AlertDialog open={showWarning} onOpenChange={setShowWarning}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Session Timeout Warning
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Your session will expire in{' '}
              <span className="font-mono font-bold text-destructive">
                {formatTime(remainingSeconds)}
              </span>{' '}
              due to inactivity. Would you like to stay logged in?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={handleLogout}
              className="bg-secondary border-border text-foreground"
            >
              Logout Now
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleStayLoggedIn}
              className="bg-primary hover:bg-primary/90"
            >
              Stay Logged In
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SessionGuard;
