import { useServices, useAddService, useUpdateService, useDeleteService } from '../integrations/supabase/index.js';
import { useState } from 'react';
import { useSupabaseAuth } from '../integrations/supabase/auth.jsx';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import BookingWizard from '../components/BookingWizard.jsx';

const Services = () => {
  const { data: services, isLoading, error } = useServices();
  const { session } = useSupabaseAuth();
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [isBookingWizardOpen, setIsBookingWizardOpen] = useState(false);

  const addService = useAddService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingServiceId) {
        await updateService.mutateAsync({ id: editingServiceId, description, price, category });
        toast.success('Service updated successfully');
      } else {
        await addService.mutateAsync({ description, price, category });
        toast.success('Service added successfully');
      }
      setDescription('');
      setPrice('');
      setCategory('');
      setEditingServiceId(null);
    } catch (error) {
      toast.error('Failed to save service');
    }
  };

  const handleEdit = (service) => {
    setDescription(service.description);
    setPrice(service.price);
    setCategory(service.category);
    setEditingServiceId(service.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteService.mutateAsync(id);
      toast.success('Service deleted successfully');
    } catch (error) {
      toast.error('Failed to delete service');
    }
  };

  const handleOpenBookingWizard = () => {
    setIsBookingWizardOpen(true);
  };

  const handleCloseBookingWizard = () => {
    setIsBookingWizardOpen(false);
  };

  const filteredServices = services?.filter(service => 
    service.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory ? service.category === filterCategory : true)
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Services</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <Button type="submit">{editingServiceId ? 'Update Service' : 'Add Service'}</Button>
      </form>
      <Button onClick={handleOpenBookingWizard} className="mt-4">
        Book a Service
      </Button>
      {isBookingWizardOpen && <BookingWizard onClose={handleCloseBookingWizard} />}
      <h2 className="text-xl font-bold mb-4">All Services</h2>
      <div className="flex space-x-4 mb-4">
        <Input 
          placeholder="Search services..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <Select onValueChange={setFilterCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {Array.from(new Set(services?.map(service => service.category))).map((category, index) => (
              <SelectItem key={index} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {filteredServices?.map((service, index) => (
        <Card key={index} className="mb-4">
          <CardHeader>
            <CardTitle>{service.description}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Price: {service.price}</p>
            <p>Category: {service.category}</p>
            <div className="flex items-center">
              <Star className="text-yellow-500" />
              <span className="ml-2">{service.rating || 'No ratings yet'}</span>
            </div>
            <div>
              <h3 className="font-bold">Reviews:</h3>
              {service.reviews?.length > 0 ? (
                service.reviews.map((review, idx) => (
                  <div key={idx} className="mb-2 p-2 border rounded">
                    <p>{review.comment}</p>
                    <div className="flex items-center">
                      <Star className="text-yellow-500" />
                      <span className="ml-2">{review.rating}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
            <Button onClick={() => handleEdit(service)}>Edit</Button>
            <Button onClick={() => handleDelete(service.id)}>Delete</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Services;