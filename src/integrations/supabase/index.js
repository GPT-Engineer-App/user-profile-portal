```javascript
import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### profiles

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | uuid        | string | true     |
| name       | text        | string | true     |
| portfolio  | text        | string | false    |
| contact    | text        | string | false    |
| skills     | text[]      | array  | false    |
| created_at | timestamptz | string | false    |

### services

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | uuid        | string | true     |
| user_id    | uuid        | string | false    |
| description| text        | string | true     |
| price      | text        | string | true     |
| category   | text        | string | true     |
| created_at | timestamptz | string | false    |

### events

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| name       | text        | string | true     |
| created_at | timestamptz | string | false    |
| date       | date        | string | true     |

*/

// Profiles hooks
export const useProfiles = () => useQuery({
    queryKey: ['profiles'],
    queryFn: () => fromSupabase(supabase.from('profiles').select('*')),
});

export const useProfile = (id) => useQuery({
    queryKey: ['profiles', id],
    queryFn: () => fromSupabase(supabase.from('profiles').select('*').eq('id', id).single()),
});

export const useAddProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newProfile) => fromSupabase(supabase.from('profiles').insert([newProfile])),
        onSuccess: () => {
            queryClient.invalidateQueries('profiles');
        },
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedProfile) => fromSupabase(supabase.from('profiles').update(updatedProfile).eq('id', updatedProfile.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('profiles');
        },
    });
};

export const useDeleteProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('profiles').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('profiles');
        },
    });
};

// Services hooks
export const useServices = () => useQuery({
    queryKey: ['services'],
    queryFn: () => fromSupabase(supabase.from('services').select('*')),
});

export const useService = (id) => useQuery({
    queryKey: ['services', id],
    queryFn: () => fromSupabase(supabase.from('services').select('*').eq('id', id).single()),
});

export const useAddService = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newService) => fromSupabase(supabase.from('services').insert([newService])),
        onSuccess: () => {
            queryClient.invalidateQueries('services');
        },
    });
};

export const useUpdateService = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedService) => fromSupabase(supabase.from('services').update(updatedService).eq('id', updatedService.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('services');
        },
    });
};

export const useDeleteService = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('services').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('services');
        },
    });
};

// Events hooks
export const useEvents = () => useQuery({
    queryKey: ['events'],
    queryFn: () => fromSupabase(supabase.from('events').select('*')),
});

export const useEvent = (id) => useQuery({
    queryKey: ['events', id],
    queryFn: () => fromSupabase(supabase.from('events').select('*').eq('id', id).single()),
});

export const useAddEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEvent) => fromSupabase(supabase.from('events').insert([newEvent])),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

export const useUpdateEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedEvent) => fromSupabase(supabase.from('events').update(updatedEvent).eq('id', updatedEvent.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

export const useDeleteEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('events').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
```
