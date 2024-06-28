import { useProfiles, useAddProfile, useUpdateProfile, useDeleteProfile } from '../integrations/supabase/index.js';
import { useState } from 'react';
import { useSupabaseAuth } from '../integrations/supabase/auth.jsx';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Profiles = () => {
  const { data: profiles, isLoading, error } = useProfiles();
  const { session } = useSupabaseAuth();
  const [name, setName] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [contact, setContact] = useState('');
  const [skills, setSkills] = useState('');

  const addProfile = useAddProfile();
  const updateProfile = useUpdateProfile();
  const deleteProfile = useDeleteProfile();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProfile.mutateAsync({ name, portfolio, contact, skills: skills.split(',') });
      toast.success('Profile added successfully');
    } catch (error) {
      toast.error('Failed to add profile');
    }
  };

  const handleEdit = (profile) => {
    setName(profile.name);
    setPortfolio(profile.portfolio);
    setContact(profile.contact);
    setSkills(profile.skills.join(','));
  };

  const handleDelete = async (id) => {
    try {
      await deleteProfile.mutateAsync(id);
      toast.success('Profile deleted successfully');
    } catch (error) {
      toast.error('Failed to delete profile');
    }
  };

  const userProfile = profiles?.find(profile => profile.id === session?.user?.id);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Profiles</h1>
      {userProfile && (
        <div className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-bold">My Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="portfolio">Portfolio</Label>
              <Input id="portfolio" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="contact">Contact</Label>
              <Input id="contact" value={contact} onChange={(e) => setContact(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="skills">Skills (comma separated)</Label>
              <Input id="skills" value={skills} onChange={(e) => setSkills(e.target.value)} />
            </div>
            <Button type="submit">Update Profile</Button>
          </form>
        </div>
      )}
      <h2 className="text-xl font-bold mb-4">All Profiles</h2>
      {profiles?.map((profile, index) => (
        <div key={index} className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-bold">{profile.name}</h2>
          <p>Portfolio: <a href={profile.portfolio} className="text-blue-500">{profile.portfolio}</a></p>
          <p>Contact: {profile.contact}</p>
          <p>Skills: {profile.skills.join(", ")}</p>
          {profile.id === session?.user?.id ? (
            <>
              <Button onClick={() => handleEdit(profile)}>Edit</Button>
              <Button onClick={() => handleDelete(profile.id)}>Delete</Button>
            </>
          ) : (
            <Button>View Profile</Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Profiles;