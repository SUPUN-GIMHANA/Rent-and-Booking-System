import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Upload, X, Plus } from 'lucide-react';

interface FormData {
  title: string;
  description: string;
  price: string;
  category: string;
  location: string;
  type: 'rent' | 'sale';
  images: string[];
}

export default function AddAdvertisement() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    price: '',
    category: '',
    location: '',
    type: 'rent',
    images: []
  });

  const categories = [
    'Apartment',
    'House',
    'Studio',
    'Commercial',
    'Office',
    'Warehouse',
    'Land',
    'Other'
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, imageUrl]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.price || !formData.category || !formData.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Advertisement created successfully!');
      navigate('/manage-items');
    } catch (error) {
      toast.error('Failed to create advertisement. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    toast.info('Draft saved successfully');
  };

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar className="w-64" />
      
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 md:p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Add New Advertisement</h1>
              <p className="text-muted-foreground">
                Create a new listing for rent or sale
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSaveDraft}>
                Save Draft
              </Button>
              <Button onClick={() => navigate('/manage-items')} variant="ghost">
                Cancel
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          placeholder="e.g., Beautiful 2-bedroom apartment"
                          value={formData.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location *</Label>
                        <Input
                          id="location"
                          placeholder="e.g., Downtown, City Center"
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your property in detail..."
                        rows={4}
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="type">Type *</Label>
                        <Select value={formData.type} onValueChange={(value: 'rent' | 'sale') => handleInputChange('type', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rent">For Rent</SelectItem>
                            <SelectItem value="sale">For Sale</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map(category => (
                              <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="price">
                          Price * {formData.type === 'rent' && <span className="text-sm text-muted-foreground">(per month)</span>}
                        </Label>
                        <Input
                          id="price"
                          type="number"
                          placeholder="0"
                          value={formData.price}
                          onChange={(e) => handleInputChange('price', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Images</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Upload Images</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Upload up to 10 images. First image will be used as the main photo.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Preview */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {formData.images.length > 0 && (
                      <img
                        src={formData.images[0]}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    )}
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold">
                        {formData.title || 'Your listing title'}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {formData.description || 'Your listing description will appear here...'}
                      </p>
                      
                      {formData.price && (
                        <p className="text-lg font-bold text-primary">
                          ${parseInt(formData.price || '0').toLocaleString()}
                          {formData.type === 'rent' && <span className="text-sm font-normal">/month</span>}
                        </p>
                      )}
                      
                      <div className="flex flex-wrap gap-2">
                        {formData.type && (
                          <Badge variant="outline">{formData.type}</Badge>
                        )}
                        {formData.category && (
                          <Badge variant="outline">{formData.category}</Badge>
                        )}
                      </div>
                      
                      {formData.location && (
                        <p className="text-sm text-muted-foreground">📍 {formData.location}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating...' : 'Publish Advertisement'}
                </Button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}