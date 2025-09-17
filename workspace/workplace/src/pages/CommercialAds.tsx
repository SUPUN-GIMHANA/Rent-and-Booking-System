import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockCommercialAds, CommercialAd } from '@/lib/mockData';
import { Megaphone, Eye, DollarSign, Calendar, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface AdFormData {
  title: string;
  description: string;
  image: string;
  link: string;
  position: 'banner' | 'sidebar' | 'featured';
  duration: number;
}

export default function CommercialAds() {
  const [ads, setAds] = useState<CommercialAd[]>(mockCommercialAds);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<AdFormData>({
    title: '',
    description: '',
    image: '',
    link: '',
    position: 'banner',
    duration: 30
  });

  const adPositions = [
    { value: 'banner', label: 'Homepage Banner', price: 299.99 },
    { value: 'sidebar', label: 'Sidebar Ad', price: 149.99 },
    { value: 'featured', label: 'Featured Section', price: 199.99 }
  ];

  const activeAds = ads.filter(ad => ad.status === 'active');
  const totalRevenue = ads.reduce((sum, ad) => sum + ad.price, 0);

  const handleInputChange = (field: keyof AdFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getPositionPrice = (position: string): number => {
    const pos = adPositions.find(p => p.value === position);
    return pos ? pos.price : 0;
  };

  const calculateTotalPrice = (): number => {
    const basePrice = getPositionPrice(formData.position);
    const durationMultiplier = formData.duration / 30; // Base price is for 30 days
    return basePrice * durationMultiplier;
  };

  const handleCreateAd = async () => {
    if (!formData.title || !formData.description || !formData.link) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newAd: CommercialAd = {
        id: Date.now().toString(),
        ...formData,
        price: calculateTotalPrice(),
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
        expiryDate: new Date(Date.now() + formData.duration * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };

      setAds([...ads, newAd]);
      toast.success('Commercial advertisement created successfully!');
      setIsCreateOpen(false);
      setFormData({
        title: '',
        description: '',
        image: '',
        link: '',
        position: 'banner',
        duration: 30
      });
    } catch (error) {
      toast.error('Failed to create advertisement. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteAd = (adId: string) => {
    setAds(ads.filter(ad => ad.id !== adId));
    toast.success('Advertisement deleted successfully');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        handleInputChange('image', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar className="w-64" />
      
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 md:p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Megaphone className="h-8 w-8 text-blue-500" />
                Commercial Advertisements
              </h1>
              <p className="text-muted-foreground">
                Create and manage commercial ads on the homepage
              </p>
            </div>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Ad
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Commercial Advertisement</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        placeholder="Advertisement title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="link">Website Link *</Label>
                      <Input
                        id="link"
                        placeholder="https://example.com"
                        value={formData.link}
                        onChange={(e) => handleInputChange('link', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your advertisement"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="position">Position *</Label>
                      <Select value={formData.position} onValueChange={(value: 'banner' | 'sidebar' | 'featured') => handleInputChange('position', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {adPositions.map((pos) => (
                            <SelectItem key={pos.value} value={pos.value}>
                              {pos.label} - ${pos.price}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (days) *</Label>
                      <Select value={formData.duration.toString()} onValueChange={(value) => handleInputChange('duration', parseInt(value))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 days</SelectItem>
                          <SelectItem value="14">14 days</SelectItem>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="60">60 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Advertisement Image</Label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                    />
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg mt-2"
                      />
                    )}
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Pricing Summary</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Position:</span>
                        <span>{adPositions.find(p => p.value === formData.position)?.label}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>{formData.duration} days</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total:</span>
                        <span>${calculateTotalPrice().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={handleCreateAd}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing Payment...' : `Pay $${calculateTotalPrice().toFixed(2)} & Create Ad`}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Megaphone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{activeAds.length}</p>
                    <p className="text-sm text-muted-foreground">Active Ads</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Eye className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">12.5K</p>
                    <p className="text-sm text-muted-foreground">Ad Impressions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ads List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Your Commercial Advertisements</h2>
            {ads.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Megaphone className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">No commercial advertisements yet</p>
                  <Button onClick={() => setIsCreateOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Ad
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {ads.map((ad) => (
                  <Card key={ad.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{ad.title}</CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge className={ad.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              {ad.status}
                            </Badge>
                            <Badge variant="outline">{ad.position}</Badge>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => handleDeleteAd(ad.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {ad.image && (
                        <img
                          src={ad.image}
                          alt={ad.title}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      )}
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {ad.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>Until {new Date(ad.expiryDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <span className="font-semibold text-primary">${ad.price}</span>
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full">
                        View Performance
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}