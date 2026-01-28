import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Lock, Mail, AlertCircle, Loader2, Clock, ShieldAlert } from 'lucide-react';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import { getAdminPaths } from '@/config/adminConfig';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const AdminLogin = () => {
  const navigate = useNavigate();
  const { 
    user, 
    isAdmin, 
    loading, 
    secureSignIn, 
    isLockedOut, 
    remainingAttempts, 
    lockoutEndTime 
  } = useSecureAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [lockoutCountdown, setLockoutCountdown] = useState<string>('');
  const adminPaths = getAdminPaths();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (!loading && user && isAdmin) {
      navigate(adminPaths.dashboard);
    }
  }, [user, isAdmin, loading, navigate, adminPaths.dashboard]);

  // Lockout countdown timer
  useEffect(() => {
    if (!lockoutEndTime) {
      setLockoutCountdown('');
      return;
    }

    const updateCountdown = () => {
      const remaining = lockoutEndTime - Date.now();
      if (remaining <= 0) {
        setLockoutCountdown('');
        return;
      }
      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      setLockoutCountdown(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [lockoutEndTime]);

  const onSubmit = async (data: LoginFormData) => {
    if (isLockedOut) {
      return;
    }

    setIsSubmitting(true);
    setAuthError(null);

    const { error } = await secureSignIn(data.email, data.password);

    if (error) {
      setAuthError(error.message);
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: error.message,
      });
    }

    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <div className="absolute inset-0 gradient-purple-radial" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            E-<span className="text-primary">SEOMAX</span>
          </h1>
          <p className="text-muted-foreground">Secure Admin Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Administrator Login</h2>
              <p className="text-sm text-muted-foreground">Authorized personnel only</p>
            </div>
          </div>

          {/* Lockout Warning */}
          {isLockedOut && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex items-center gap-2 p-4 mb-6 bg-destructive/10 border border-destructive/20 rounded-lg"
            >
              <ShieldAlert className="w-5 h-5 text-destructive flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-destructive">Account Temporarily Locked</p>
                <p className="text-xs text-destructive/80 flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3" />
                  Try again in {lockoutCountdown}
                </p>
              </div>
            </motion.div>
          )}

          {/* Remaining Attempts Warning */}
          {!isLockedOut && remainingAttempts < 5 && remainingAttempts > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex items-center gap-2 p-4 mb-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg"
            >
              <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
              <p className="text-sm text-yellow-500">
                {remainingAttempts} attempt{remainingAttempts !== 1 ? 's' : ''} remaining before lockout
              </p>
            </motion.div>
          )}

          {authError && !isLockedOut && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex items-center gap-2 p-4 mb-6 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{authError}</p>
            </motion.div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          {...field}
                          type="email"
                          placeholder="admin@example.com"
                          disabled={isLockedOut}
                          className="pl-11 bg-input border-border focus:border-primary focus:ring-primary disabled:opacity-50"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          {...field}
                          type="password"
                          placeholder="••••••••"
                          disabled={isLockedOut}
                          className="pl-11 bg-input border-border focus:border-primary focus:ring-primary disabled:opacity-50"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting || isLockedOut}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : isLockedOut ? (
                  <>
                    <ShieldAlert className="w-5 h-5 mr-2" />
                    Account Locked
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </Form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            This is a restricted area. Unauthorized access is prohibited.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
