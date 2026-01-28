import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { getAdminPaths } from '@/config/adminConfig';
import AdminSidebar from './AdminSidebar';
import SessionGuard from './SessionGuard';
import { getDirection } from '@/i18n';

const AdminLayout = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isRTL = getDirection(i18n.language) === 'rtl';
  const adminPaths = getAdminPaths();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate(adminPaths.login);
      } else if (!isAdmin) {
        navigate(adminPaths.login);
      }
    }
  }, [user, isAdmin, loading, navigate, adminPaths.login]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <SessionGuard timeoutMinutes={30} warningMinutes={5}>
      <div className={`min-h-screen bg-background flex ${isRTL ? 'flex-row-reverse' : ''}`}>
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </SessionGuard>
  );
};

export default AdminLayout;
