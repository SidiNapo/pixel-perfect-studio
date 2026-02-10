import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Loader2, Tag } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface Category {
  id: string;
  name: string;
  name_fr: string | null;
  created_at: string;
}

const CategoriesManager = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [newNameFr, setNewNameFr] = useState('');
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (!error && data) {
      setCategories(data as Category[]);
    }
    setLoading(false);
  };

  const addCategory = async () => {
    const trimmed = newName.trim();
    if (!trimmed) return;

    setAdding(true);
    const { error } = await supabase
      .from('categories')
      .insert({ name: trimmed, name_fr: newNameFr.trim() || null });

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message.includes('duplicate')
          ? 'This category already exists.'
          : error.message,
      });
    } else {
      toast({ title: 'Category added' });
      setNewName('');
      setNewNameFr('');
      fetchCategories();
    }
    setAdding(false);
  };

  const deleteCategory = async (id: string) => {
    setDeletingId(id);
    const { error } = await supabase.from('categories').delete().eq('id', id);

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } else {
      toast({ title: 'Category deleted' });
      setCategories((prev) => prev.filter((c) => c.id !== id));
    }
    setDeletingId(null);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Categories</h1>
        <p className="text-muted-foreground">Manage blog post categories.</p>
      </div>

      {/* Add Category */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-xl p-6 mb-8"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Add New Category</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Category name (EN)"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="bg-input border-border"
            onKeyDown={(e) => e.key === 'Enter' && addCategory()}
          />
          <Input
            placeholder="Nom (FR) — optional"
            value={newNameFr}
            onChange={(e) => setNewNameFr(e.target.value)}
            className="bg-input border-border"
            onKeyDown={(e) => e.key === 'Enter' && addCategory()}
          />
          <Button onClick={addCategory} disabled={adding || !newName.trim()} className="shrink-0">
            {adding ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
            Add
          </Button>
        </div>
      </motion.div>

      {/* Categories List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border rounded-xl"
      >
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            All Categories ({categories.length})
          </h2>
        </div>

        {loading ? (
          <div className="p-6 flex justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : categories.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            No categories yet. Add your first one above!
          </div>
        ) : (
          <div className="divide-y divide-border">
            {categories.map((cat) => (
              <div key={cat.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Tag className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{cat.name}</p>
                    {cat.name_fr && (
                      <p className="text-sm text-muted-foreground">{cat.name_fr}</p>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteCategory(cat.id)}
                  disabled={deletingId === cat.id}
                  className="text-muted-foreground hover:text-destructive"
                >
                  {deletingId === cat.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CategoriesManager;
