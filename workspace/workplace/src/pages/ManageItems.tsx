import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ItemCard } from '@/components/ItemCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { mockItems, Item } from '@/lib/mockData';
import { Search, Filter, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function ManageItems() {
  const [items, setItems] = useState<Item[]>(mockItems);
  const [filteredItems, setFilteredItems] = useState<Item[]>(mockItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Filter items based on search and filters
  useEffect(() => {
    let filtered = items;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(item => item.type === typeFilter);
    }

    setFilteredItems(filtered);
  }, [items, searchQuery, statusFilter, categoryFilter, typeFilter]);

  const handleEdit = (item: Item) => {
    toast.info(`Edit functionality for "${item.title}" would open here`);
    // In a real app, this would open an edit modal or navigate to edit page
  };

  const handleDelete = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (item) {
      setItems(items.filter(i => i.id !== itemId));
      toast.success(`"${item.title}" has been deleted`);
    }
  };

  const handleToggleStatus = (itemId: string) => {
    setItems(items.map(item => {
      if (item.id === itemId) {
        const newStatus = item.status === 'active' ? 'inactive' : 'active';
        toast.success(`Item status changed to ${newStatus}`);
        return { ...item, status: newStatus as 'active' | 'inactive' | 'sold' };
      }
      return item;
    }));
  };

  const getUniqueCategories = () => {
    return Array.from(new Set(items.map(item => item.category)));
  };

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar className="w-64" />
      
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 md:p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Manage Items</h1>
              <p className="text-muted-foreground">
                View and manage all your listings
              </p>
            </div>
            <Link to="/add-advertisement">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Item
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-4 flex-wrap">
            <Badge variant="outline" className="px-3 py-1">
              Total: {items.length}
            </Badge>
            <Badge variant="outline" className="px-3 py-1 bg-green-50 text-green-700">
              Active: {items.filter(i => i.status === 'active').length}
            </Badge>
            <Badge variant="outline" className="px-3 py-1 bg-yellow-50 text-yellow-700">
              Inactive: {items.filter(i => i.status === 'inactive').length}
            </Badge>
            <Badge variant="outline" className="px-3 py-1 bg-gray-50 text-gray-700">
              Sold: {items.filter(i => i.status === 'sold').length}
            </Badge>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {getUniqueCategories().map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="rent">Rent</SelectItem>
                <SelectItem value="sale">Sale</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Items Grid */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No items found matching your criteria.</p>
              <Link to="/add-advertisement">
                <Button className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Item
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleStatus={handleToggleStatus}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}