import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Eye, TrendingUp, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

interface Stats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
  });
  const [recentPosts, setRecentPosts] = useState<Database['public']['Tables']['blog_posts']['Row'][]>([]);

  useEffect(() => {
    fetchStats();
    fetchRecentPosts();
  }, []);

  const fetchStats = async () => {
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('status');

    if (!error && posts) {
      setStats({
        totalPosts: posts.length,
        publishedPosts: posts.filter((p) => p.status === 'published').length,
        draftPosts: posts.filter((p) => p.status === 'draft').length,
      });
    }
  };

  const fetchRecentPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (!error && data) {
      setRecentPosts(data);
    }
  };

  const statCards = [
    { label: 'Total Posts', value: stats.totalPosts, icon: FileText, color: 'text-primary' },
    { label: 'Published', value: stats.publishedPosts, icon: Eye, color: 'text-green-500' },
    { label: 'Drafts', value: stats.draftPosts, icon: Clock, color: 'text-yellow-500' },
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your blog.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-secondary flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Posts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="bg-card border border-border rounded-xl"
      >
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Recent Posts</h2>
        </div>
        <div className="divide-y divide-border">
          {recentPosts.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              No posts yet. Create your first blog post!
            </div>
          ) : (
            recentPosts.map((post) => (
              <div key={post.id} className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    post.status === 'published'
                      ? 'bg-green-500/10 text-green-500'
                      : 'bg-yellow-500/10 text-yellow-500'
                  }`}
                >
                  {post.status}
                </span>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
