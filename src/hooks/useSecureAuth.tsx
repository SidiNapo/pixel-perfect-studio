import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const STORAGE_KEY = 'admin_login_security';

interface LoginSecurityState {
  attempts: number;
  lockoutUntil: number | null;
  lastAttempt: number | null;
}

interface SecureAuthReturn {
  // Original useAuth properties
  user: ReturnType<typeof useAuth>['user'];
  session: ReturnType<typeof useAuth>['session'];
  loading: ReturnType<typeof useAuth>['loading'];
  isAdmin: ReturnType<typeof useAuth>['isAdmin'];
  signOut: ReturnType<typeof useAuth>['signOut'];
  
  // Enhanced security properties
  secureSignIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  isLockedOut: boolean;
  remainingAttempts: number;
  lockoutEndTime: number | null;
  resetAttempts: () => void;
}

const getSecurityState = (): LoginSecurityState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const state = JSON.parse(stored) as LoginSecurityState;
      // Clear lockout if it has expired
      if (state.lockoutUntil && Date.now() > state.lockoutUntil) {
        return { attempts: 0, lockoutUntil: null, lastAttempt: null };
      }
      return state;
    }
  } catch {
    // Ignore parse errors
  }
  return { attempts: 0, lockoutUntil: null, lastAttempt: null };
};

const setSecurityState = (state: LoginSecurityState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage errors
  }
};

export const useSecureAuth = (): SecureAuthReturn => {
  const auth = useAuth();
  const [securityState, setSecurityStateLocal] = useState<LoginSecurityState>(getSecurityState);
  
  // Check for lockout expiry
  useEffect(() => {
    if (securityState.lockoutUntil && Date.now() > securityState.lockoutUntil) {
      const newState = { attempts: 0, lockoutUntil: null, lastAttempt: null };
      setSecurityStateLocal(newState);
      setSecurityState(newState);
    }
  }, [securityState.lockoutUntil]);

  // Update timer for lockout countdown
  useEffect(() => {
    if (!securityState.lockoutUntil) return;
    
    const interval = setInterval(() => {
      if (Date.now() > securityState.lockoutUntil!) {
        const newState = { attempts: 0, lockoutUntil: null, lastAttempt: null };
        setSecurityStateLocal(newState);
        setSecurityState(newState);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [securityState.lockoutUntil]);

  const isLockedOut = Boolean(
    securityState.lockoutUntil && Date.now() < securityState.lockoutUntil
  );

  const remainingAttempts = Math.max(0, MAX_LOGIN_ATTEMPTS - securityState.attempts);

  const secureSignIn = useCallback(async (email: string, password: string): Promise<{ error: Error | null }> => {
    // Check if locked out
    if (isLockedOut) {
      return {
        error: new Error('Too many failed attempts. Please try again later.')
      };
    }

    // Attempt login
    const result = await auth.signIn(email, password);

    if (result.error) {
      // Increment failed attempts
      const newAttempts = securityState.attempts + 1;
      const newState: LoginSecurityState = {
        attempts: newAttempts,
        lockoutUntil: newAttempts >= MAX_LOGIN_ATTEMPTS 
          ? Date.now() + LOCKOUT_DURATION_MS 
          : null,
        lastAttempt: Date.now(),
      };
      
      setSecurityStateLocal(newState);
      setSecurityState(newState);

      // Return generic error to avoid revealing user existence
      return {
        error: new Error('Invalid credentials. Please check your email and password.')
      };
    }

    // Success - reset attempts
    const successState = { attempts: 0, lockoutUntil: null, lastAttempt: null };
    setSecurityStateLocal(successState);
    setSecurityState(successState);

    return { error: null };
  }, [auth, securityState.attempts, isLockedOut]);

  const resetAttempts = useCallback(() => {
    const newState = { attempts: 0, lockoutUntil: null, lastAttempt: null };
    setSecurityStateLocal(newState);
    setSecurityState(newState);
  }, []);

  return {
    user: auth.user,
    session: auth.session,
    loading: auth.loading,
    isAdmin: auth.isAdmin,
    signOut: auth.signOut,
    secureSignIn,
    isLockedOut,
    remainingAttempts,
    lockoutEndTime: securityState.lockoutUntil,
    resetAttempts,
  };
};
