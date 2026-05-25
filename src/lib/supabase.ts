import { createClient } from '@supabase/supabase-js';

// Access variables safely to prevent crashes if undefined
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Lazy initialization of the Supabase Client
export const getSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }
  try {
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
    return null;
  }
};

export interface BlogPost {
  id?: string;
  type: 'featured' | 'standard';
  badge: string | null;
  title: string;
  description: string | null;
  author: string | null;
  category: string;
  category_color: string;
  video_url: string;
  display_order: number;
}

// Fallback Static Data with the exact items specified in user request
export const defaultBlogPosts: BlogPost[] = [
  {
    id: 'f-1',
    type: 'featured',
    badge: 'Must Read',
    title: 'Full-Frame vs. Crop Sensor: Which for Photography?',
    description: "An honest look at the real-world differences between these camera systems to help you choose what's actually right for your photography needs.",
    author: 'By August Renner (c)',
    category: 'Gear',
    category_color: '#7d1a4a',
    video_url: 'https://res.cloudinary.com/ddfglmkbd/image/upload/v1779688237/IMG_20260418_182310536_1_xjryf2.webp',
    display_order: 1
  },
  {
    id: 's-1',
    type: 'standard',
    badge: null,
    title: 'Finding Natural Light in Unexpected Places',
    description: null,
    author: null,
    category: 'Lighting',
    category_color: '#2c4c34',
    video_url: 'https://media.licdn.com/dms/image/v2/D5622AQEe1IwnLB-QCQ/feedshare-image-high-res/B56ZfTMor7HQAs-/0/1751595000261?e=1781136000&v=beta&t=1pH5LGl89Q3VDm3DLMvMgaTWVEASBBO3VooVODh0aLg',
    display_order: 2
  },
  {
    id: 's-2',
    type: 'standard',
    badge: null,
    title: 'My Approach to Editing: Creating a Consistent Photography Style',
    description: null,
    author: null,
    category: 'Editing',
    category_color: '#a63e2d',
    video_url: 'https://media.licdn.com/dms/image/v2/D5622AQFSdLb11VUr1g/feedshare-shrink_1280/B56ZddGDufGsAk-/0/1749613567570?e=1781136000&v=beta&t=BwFRqsLq4CSwKTbtZVXWmAPFLgGoqx9L6amghb7DAzE',
    display_order: 3
  },
  {
    id: 's-3',
    type: 'standard',
    badge: null,
    title: 'Pricing Your Photography: Strategies That Work',
    description: null,
    author: null,
    category: 'Business',
    category_color: '#1a2b8c',
    video_url: 'https://media.licdn.com/dms/image/v2/D5622AQFUpDvuroCmSA/feedshare-image-high-res/B56ZYYMjhpGcAs-/0/1744162667964?e=1781136000&v=beta&t=o8sM3_9NZc4KLxY0CIIG2vPwplWEHH5iPxx-PSB-FTY',
    display_order: 4
  }
];
