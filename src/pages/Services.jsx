import { useServices, useAddService, useUpdateService, useDeleteService } from '../integrations/supabase/index.js';
import { useState } from 'react';
import { useSupabaseAuth } from '../integrations/supabase/auth.jsx';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const Services = () => {
  const { data: services, isLoading, error } = useServices();
  const { session } = useSupabaseAuth();
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [editingServiceId, setEditingServiceId] = useState(null);

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
      <h2 className="text-xl font-bold mb-4">All Services</h2>
      {services?.map((service, index) => (
        <div key={index} className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-bold">{service.description}</h2>
          <p>Price: {service.price}</p>
          <p>Category: {service.category}</p>
          <Button onClick={() => handleEdit(service)}>Edit</Button>
          <Button onClick={() => handleDelete(service.id)}>Delete</Button>
        </div>
      ))}
    </div>
  );
};

export default Services;