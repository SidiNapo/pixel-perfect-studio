import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getDirection } from '@/i18n';

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isRTL = getDirection(i18n.language) === 'rtl';

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: FileText, label: 'Blog Posts', path: '/admin/posts' },
  ];

  return (
    <aside
      className={cn(
        'h-screen bg-card border-border flex flex-col transition-all duration-300',
        isRTL ? 'border-l' : 'border-r',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className={`p-4 border-b border-border flex items-center ${isRTL ? 'justify-start flex-row-reverse' : 'justify-between'}`}>
        {!collapsed && (
          <span className="text-lg font-bold text-foreground">
            E-<span className="text-primary">SEOMAX</span>
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-muted-foreground hover:text-foreground"
        >
          {collapsed ? (
            isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />
          ) : (
            isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200',
                isRTL && 'flex-row-reverse',
                isActive
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <button
          onClick={handleSignOut}
          className={cn(
            'flex items-center gap-3 px-3 py-3 rounded-lg w-full transition-all duration-200',
            isRTL && 'flex-row-reverse',
            'text-muted-foreground hover:bg-destructive/10 hover:text-destructive'
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
