import { useProfiles, useAddProfile, useUpdateProfile, useDeleteProfile } from '../integrations/supabase/index.js';
import { useState } from 'react';
import { useSupabaseAuth } from '../integrations/supabase/auth.jsx';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const Profiles = () => {
  const { data: profiles, isLoading, error } = useProfiles();
  const { session } = useSupabaseAuth();
  const [name, setName] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [contact, setContact] = useState('');
  const [skills, setSkills] = useState('');
  const [editingProfileId, setEditingProfileId] = useState(null);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [newPortfolioItem, setNewPortfolioItem] = useState({ description: '', tags: '' });

  const addProfile = useAddProfile();
  const updateProfile = useUpdateProfile();
  const deleteProfile = useDeleteProfile();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const profileData = {
        id: editingProfileId,
        name,
        portfolio: JSON.stringify(portfolioItems),
        contact,
        skills: skills.split(','),
      };
      if (editingProfileId) {
        await updateProfile.mutateAsync(profileData);
        toast.success('Profile updated successfully');
      } else {
        await addProfile.mutateAsync(profileData);
        toast.success('Profile added successfully');
      }
      setName('');
      setPortfolioItems([]);
      setContact('');
      setSkills('');
      setEditingProfileId(null);
    } catch (error) {
      toast.error('Failed to save profile');
    }
  };

  const handleEdit = (profile) => {
    setName(profile.name);
    setPortfolioItems(JSON.parse(profile.portfolio || '[]'));
    setContact(profile.contact);
    setSkills(profile.skills.join(','));
    setEditingProfileId(profile.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProfile.mutateAsync(id);
      toast.success('Profile deleted successfully');
    } catch (error) {
      toast.error('Failed to delete profile');
    }
  };

  const handleAddPortfolioItem = () => {
    setPortfolioItems([...portfolioItems, newPortfolioItem]);
    setNewPortfolioItem({ description: '', tags: '' });
  };

  const handleRemovePortfolioItem = (index) => {
    const updatedItems = portfolioItems.filter((_, i) => i !== index);
    setPortfolioItems(updatedItems);
  };

  const calculateProfileCompleteness = () => {
    let completeness = 0;
    if (name) completeness += 25;
    if (contact) completeness += 25;
    if (skills) completeness += 25;
    if (portfolioItems.length > 0) completeness += 25;
    return completeness;
  };

  const userProfile = profiles?.find(profile => profile.id === session?.user?.id);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profiles</h1>
      {userProfile && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>My Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="contact">Contact</Label>
                <Input id="contact" value={contact} onChange={(e) => setContact(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="skills">Skills (comma separated)</Label>
                <Input id="skills" value={skills} onChange={(e) => setSkills(e.target.value)} />
              </div>
              <div>
                <Label>Portfolio Items</Label>
                {portfolioItems.map((item, index) => (
                  <div key={index} className="mb-2 p-2 border rounded">
                    <p>Description: {item.description}</p>
                    <p>Tags: {item.tags}</p>
                    <Button variant="outline" onClick={() => handleRemovePortfolioItem(index)}>Remove</Button>
                  </div>
                ))}
                <div className="mb-2 p-2 border rounded">
                  <Label htmlFor="portfolio-description">Description</Label>
                  <Textarea id="portfolio-description" value={newPortfolioItem.description} onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, description: e.target.value })} />
                  <Label htmlFor="portfolio-tags">Tags (comma separated)</Label>
                  <Input id="portfolio-tags" value={newPortfolioItem.tags} onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, tags: e.target.value })} />
                  <Button variant="outline" onClick={handleAddPortfolioItem}>Add Portfolio Item</Button>
                </div>
              </div>
              <Button type="submit">{editingProfileId ? 'Update Profile' : 'Add Profile'}</Button>
            </form>
            <div className="mt-4">
              <Label>Profile Completeness</Label>
              <Progress value={calculateProfileCompleteness()} />
            </div>
          </CardContent>
        </Card>
      )}
      <h2 className="text-xl font-bold mb-4">All Profiles</h2>
      {profiles && profiles.map((profile, index) => (
        <Card key={index} className="mb-4">
          <CardHeader>
            <CardTitle>{profile.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Contact: {profile.contact}</p>
            <p>Skills: {profile.skills ? profile.skills.join(", ") : "No skills listed"}</p>
            <div>
              <Label>Portfolio Items</Label>
              {JSON.parse(profile.portfolio || '[]').map((item, idx) => (
                <div key={idx} className="mb-2 p-2 border rounded">
                  <p>Description: {item.description}</p>
                  <p>Tags: {item.tags}</p>
                </div>
              ))}
            </div>
            {profile.id === session?.user?.id ? (
              <>
                <Button onClick={() => handleEdit(profile)}>Edit</Button>
                <Button onClick={() => handleDelete(profile.id)}>Delete</Button>
              </>
            ) : (
              <Button>View Profile</Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Profiles;