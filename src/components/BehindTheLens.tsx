import { useState, useEffect } from 'react';
import { getSupabaseClient, defaultBlogPosts, BlogPost } from '../lib/supabase';
import { Database, Copy, Check, Info, Settings, RefreshCw, Sparkles } from 'lucide-react';

export default function BehindTheLens({ theme }: { theme: 'day' | 'night' }) {
  const [posts, setPosts] = useState<BlogPost[]>(defaultBlogPosts);
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [dbConnected, setDbConnected] = useState(false);
  const [showConfigGuide, setShowConfigGuide] = useState(false);
  const [copied, setCopied] = useState(false);

  // Dynamic style parameters depending on theme
  const isNight = theme === 'night';
  const sectionBgClass = isNight ? 'bg-[#0a0b10] text-[#e2e8f0]' : 'bg-white text-black';
  const titleClass = isNight ? 'text-white' : 'text-black';
  const subtextClass = isNight ? 'text-[#b0b3bf]' : 'text-[#6c6c6c]';
  const badgeClass = isNight ? 'bg-white/10 text-[#d1d5db]' : 'bg-[#f4f4f4] text-[#666]';
  const buttonClass = isNight ? 'bg-white text-black hover:bg-gray-100 hover:scale-[1.02]' : 'bg-black text-white hover:scale-[1.02]';
  const cardBorderClass = isNight ? 'border-white/[0.08]' : 'border-[#f0f0f0]';
  const cardBgClass = isNight ? 'bg-[#12131a]' : 'bg-[#fcfcfc]';
  const lineBorderClass = isNight ? 'border-white/[0.08]' : 'border-gray-100';
  const gridCardBorder = isNight ? 'border-white/[0.08]' : 'border-[#f3f3f3]';
  const gridCardBg = isNight ? 'bg-white/[0.01]' : 'bg-[#f9f9f9]';
  const gridTitleClass = isNight ? 'text-[#e2e8f0] group-hover/card:text-violet-300' : 'text-black group-hover/card:text-gray-700';

  // For Database banner
  const bannerBgClass = isNight ? 'bg-white/[0.03] border-white/5 text-gray-300' : 'bg-gray-50 border-gray-100 text-gray-700';
  const bannerBtnClass = isNight ? 'text-gray-400 hover:text-white' : 'text-[#666] hover:text-black';
  const bannerRefreshClass = isNight ? 'hover:bg-white/10' : 'hover:bg-gray-200';

  // Helper to determine if media is video or image
  const isMediaVideo = (url?: string): boolean => {
    if (!url) return false;
    const lower = url.toLowerCase();
    return lower.includes('.mp4') || lower.includes('.mov') || lower.includes('.webm') || lower.includes('/hf_');
  };

  // Schema creation statement for client-side display
  const schemaSQL = `-- create table
create table blog_posts (
  id uuid default gen_random_uuid() primary key,
  type text not null, -- 'featured' or 'standard'
  badge text, -- 'Must Read', etc.
  title text not null,
  description text,
  author text,
  category text not null,
  category_color text not null,
  video_url text not null,
  display_order int not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- enable row level security (RLS)
alter table blog_posts enable row level security;

-- create policy for public read access
create policy "Allow public read access"
on blog_posts for select
using (true);

-- Insert original dataset
insert into blog_posts (type, badge, title, description, author, category, category_color, video_url, display_order)
values 
('featured', 'Must Read', 'Full-Frame vs. Crop Sensor: Which for Photography?', 'An honest look at the real-world differences between these camera systems to help you choose what''s actually right for your photography needs.', 'By August Renner (c)', 'Gear', '#7d1a4a', 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_155500_808e6fdd-761f-4acd-b3be-cb7e6e700def.mp4', 1),

('standard', null, 'Finding Natural Light in Unexpected Places', null, null, 'Lighting', '#2c4c34', 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_030111_a9e15665-d379-4a7f-8116-695bbe452ad1.mp4', 2),

('standard', null, 'My Approach to Editing: Creating a Consistent Photography Style', null, null, 'Editing', '#a63e2d', 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4', 3),

('standard', null, 'Pricing Your Photography: Strategies That Work', null, null, 'Business', '#1a2b8c', 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154232_f8809bd2-a6c3-4a38-908d-2005e5b3cb3e.mp4', 4);`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(schemaSQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fetchBlogPosts = async () => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setDbConnected(false);
      setPosts(defaultBlogPosts);
      return;
    }

    setLoading(true);
    setErrorStatus(null);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        setPosts(data as BlogPost[]);
        setDbConnected(true);
      } else {
        // Connected but database table is empty, use defaults and inform user
        setErrorStatus("DB is connected but 'blog_posts' table is empty. Showing default items.");
        setPosts(defaultBlogPosts);
        setDbConnected(true);
      }
    } catch (err: any) {
      console.warn('Supabase fetch failed, falling back to local dataset. Error:', err);
      setErrorStatus(err?.message || 'Database connection error. Showing local fallback.');
      setPosts(defaultBlogPosts);
      setDbConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  // Separate featured post and standard grid posts
  const featuredPost = posts.find(p => p.type === 'featured') || defaultBlogPosts[0];
  const gridPosts = posts.filter(p => p.type === 'standard' || p.id !== featuredPost.id);

  return (
    <section id="photography-blog" className={`w-full font-sans py-[60px] transition-colors duration-500 ${sectionBgClass}`}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-[20px] flex flex-col">
        
        {/* Dynamic Database Status Tracker Banner (Very helpful for live builds) */}
        <div className={`mb-6 flex flex-wrap items-center justify-between gap-4 py-3 px-5 rounded-xl border text-xs transition-colors ${bannerBgClass}`}>
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${dbConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
            <span className="font-semibold">
              Database Sync: {dbConnected ? 'Live Supabase Cloud' : 'Offline Fallback'}
            </span>
            {errorStatus && (
              <span className="opacity-60 font-normal italic">
                ({errorStatus})
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowConfigGuide(!showConfigGuide)}
              className={`flex items-center gap-1.5 font-medium transition-colors ${bannerBtnClass}`}
            >
              <Settings size={13} />
              Set up Supabase
            </button>
            <button 
              onClick={fetchBlogPosts} 
              disabled={loading}
              className={`p-1 rounded transition-colors ${bannerRefreshClass}`}
              title="Refresh connection"
            >
              <RefreshCw size={13} className={`${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Floating Supabase Creator Helper Guide */}
        {showConfigGuide && (
          <div className="mb-8 p-6 rounded-2xl bg-slate-900 text-slate-100 font-sans shadow-xl border border-slate-800 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-amber-400">
                <Database size={18} />
                <h4 className="font-outfit font-semibold text-sm tracking-wide uppercase">Supabase Setup Blueprint</h4>
              </div>
              <button 
                onClick={() => setShowConfigGuide(false)}
                className="text-slate-400 hover:text-white transition-colors text-xs font-semibold px-2 py-1 rounded hover:bg-slate-800"
              >
                ✕ Close
              </button>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl mb-4">
              To wire your real Supabase account up to this application, initialize your database and run the exact query schema below in your <strong>Supabase SQL Editor</strong>. Don't forget to configure the environment variables in your AI Studio settings!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block mb-1">Step 1: Settings Panel Keys</span>
                <p className="text-slate-400 leading-relaxed mb-2">Configure these environment variables in your AI Studio secrets menu:</p>
                <div className="font-mono text-[10px] bg-slate-900 px-2.5 py-1.5 rounded text-indigo-300 space-y-1">
                  <div>VITE_SUPABASE_URL = "your_supabase_project_url"</div>
                  <div>VITE_SUPABASE_ANON_KEY = "your_public_anon_key"</div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block mb-1">Step 2: Table Creation</span>
                  <p className="text-slate-400 leading-relaxed">Copy the SQL query below and run it inside your schema editor. RLS read policies are already configured safely for users!</p>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="mt-3 inline-flex items-center justify-center gap-1.5 self-start px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? 'Copied System SQL!' : 'Copy Schema SQL'}</span>
                </button>
              </div>
            </div>

            <div className="relative bg-slate-950 p-4 rounded-xl max-h-[160px] overflow-y-auto border border-slate-800 font-mono text-[10px] text-emerald-400 custom-scrollbar">
              <pre>{schemaSQL}</pre>
            </div>
          </div>
        )}

        {/* 
          1. Header Section
          - a small grey "Blog" badge (bg #f4f4f4, 8px border-radius, i.e., rounded-[8px])
          - a large heading "Behind the lens" (64px, Outfit font, weight 500, letter-spacing -2.5px)
          - side by side with subtitle and a "View all posts" button
          - Responsive behavior: At 768px (`md`), subtitle/button stacks vertically and heading drops to 48px
        */}
        <div className="flex flex-col gap-4 mb-10">
          <div>
            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-[8px] uppercase tracking-wider transition-colors duration-400 ${badgeClass}`}>
              Blog
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className={`text-[48px] md:text-[64px] font-outfit font-medium tracking-[-2.5px] leading-none shrink-0 select-none transition-colors duration-400 ${titleClass}`}>
              Behind the lens
            </h2>
            
            <div className="flex flex-col md:flex-row md:items-center gap-6 max-w-[620px]">
              <p className={`text-[18px] font-medium leading-snug md:max-w-[480px] transition-colors duration-400 ${subtextClass}`}>
                Thoughts, insights, and stories from my photography journey. Take a peek into my creative process and recent projects.
              </p>
              
              <button className={`px-6 py-3.5 rounded-[40px] text-[14px] font-semibold tracking-wide active:scale-98 transition-all duration-300 shrink-0 shadow-sm cursor-pointer select-none ${buttonClass}`}>
                View all posts
              </button>
            </div>
          </div>
        </div>

        {/* 
          2. Featured Post Card
          - 2-column grid (1fr 1fr), 20px border-radius, 1px solid #f0f0f0, min-height 520px, bg #fcfcfc
          - Left: Autoplay looped muted video doing 1.08 scale with cubic-bezier(0.33, 1, 0.68, 1) in 0.5s on hover, with overlay and corner L-brackets
          - Right: 60px padding, contains MUST READ badge, Outfit title 48px, description line, and footer with author + colored category badge to bottom
          - Responsive: At 1024px (`lg`), becomes 1 column and padding reduces to 40px
        */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 rounded-[20px] border min-h-[520px] overflow-hidden transition-all duration-500 shadow-sm ${cardBorderClass} ${cardBgClass}`}>
          
          {/* Left Side: Photography Video or Image Element inside beautiful Frame */}
          <div className={`relative overflow-hidden w-full h-[320px] md:h-[450px] lg:h-full min-h-[300px] lg:min-h-[520px] group border-b lg:border-b-0 lg:border-r transition-all duration-500 ${cardBorderClass}`}>
            {isMediaVideo(featuredPost.video_url) ? (
              <video
                src={featuredPost.video_url}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.08]"
              />
            ) : (
              <img
                src={featuredPost.video_url}
                alt={featuredPost.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover select-none transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.08]"
              />
            )}
            
            {/* Hover Dark Overlay (rgba(0,0,0,0.25)) fading in over 0.4s */}
            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out pointer-events-none z-10" />

            {/* Custom Centered Circle "+" scaling from 0.7 to 1.0 in 0.3s */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <div className="w-[70px] h-[70px] bg-white/20 rounded-full flex items-center justify-center text-white scale-[0.7] opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] font-sans">
                <span className="text-[36px] font-thin leading-none select-none translate-y-[-2px]">+</span>
              </div>
            </div>

            {/* White L-shaped brackets (12px, 1.5px border), 15px inset */}
            <div className="absolute top-[15px] left-[15px] w-[12px] h-[12px] border-t-[1.5px] border-l-[1.5px] border-white z-20 pointer-events-none" />
            <div className="absolute top-[15px] right-[15px] w-[12px] h-[12px] border-t-[1.5px] border-r-[1.5px] border-white z-20 pointer-events-none" />
            <div className="absolute bottom-[15px] left-[15px] w-[12px] h-[12px] border-b-[1.5px] border-l-[1.5px] border-white z-20 pointer-events-none" />
            <div className="absolute bottom-[15px] right-[15px] w-[12px] h-[12px] border-b-[1.5px] border-r-[1.5px] border-white z-20 pointer-events-none" />
          </div>

          {/* Right Side Info Area: 60px padding, content pushed to bottom */}
          <div className={`p-8 md:p-10 xl:p-[60px] flex flex-col justify-between h-full transition-all duration-500 ${cardBgClass}`}>
            <div>
              {/* Badge */}
              {featuredPost.badge && (
                <div className="mb-4">
                  <span className={`inline-block text-[12px] font-semibold px-3 py-1 rounded-[20px] tracking-wide select-none ${isNight ? 'bg-white text-black' : 'bg-black text-white'}`}>
                    {featuredPost.badge}
                  </span>
                </div>
              )}

              {/* Title: Outfit font, letter-spacing -1.5px */}
              <h3 className={`font-outfit text-[32px] md:text-[48px] font-medium tracking-[-1.5px] leading-tight mb-4 select-none transition-colors duration-400 ${titleClass}`}>
                 {featuredPost.title}
              </h3>

              {/* Description */}
              {featuredPost.description && (
                <p className={`text-[17px] leading-relaxed mb-6 font-medium transition-colors duration-400 ${subtextClass}`}>
                  {featuredPost.description}
                </p>
              )}
            </div>

            {/* Footer with author and category badge pushed to bottom */}
            <div className={`mt-8 pt-6 border-t flex items-center justify-between transition-colors duration-500 ${lineBorderClass}`}>
              {featuredPost.author && (
                <span className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-400 ${isNight ? 'text-gray-400' : 'text-gray-500'}`}>
                  {featuredPost.author}
                </span>
              )}
              
              <span
                style={{ backgroundColor: featuredPost.category_color }}
                className="inline-block text-white text-[11px] font-semibold px-3 py-[4px] rounded-[20px] capitalize tracking-wide select-none"
              >
                {featuredPost.category}
              </span>
            </div>
          </div>

        </div>

        {/* 
          3. Blog Post Grid (3 standard cards)
          - 3-column grid, 25px gap
          - Responsive: At 1024px (`lg`), becomes 2 columns. At 768px (`md`), becomes 1 column
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[25px] mt-12">
          {gridPosts.map((post) => (
            <div key={post.id} className="flex flex-col group/card cursor-pointer">
              
              {/* Video or Image aspect-[16/10] frame with hover zoom, brackets, overlays, "+" animation */}
              <div className={`relative overflow-hidden aspect-[16/10] rounded-[20px] group border transition-all duration-500 ${gridCardBorder} ${gridCardBg}`}>
                {isMediaVideo(post.video_url) ? (
                  <video
                    src={post.video_url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.08] select-none pointer-events-none"
                  />
                ) : (
                  <img
                    src={post.video_url}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.08] select-none"
                  />
                )}

                {/* Dark overlay (rgba(0,0,0,0.25)) fading in over 0.4s */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out pointer-events-none z-10" />

                {/* Centered plus icon scaling from 0.7 to 1.0 */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <div className="w-[70px] h-[70px] bg-white/20 rounded-full flex items-center justify-center text-white scale-[0.7] opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] font-sans">
                    <span className="text-[36px] font-thin leading-none translate-y-[-2px]">+</span>
                  </div>
                </div>

                {/* White L-shaped corner brackets */}
                <div className="absolute top-[15px] left-[15px] w-[12px] h-[12px] border-t-[1.5px] border-l-[1.5px] border-white z-20 pointer-events-none" />
                <div className="absolute top-[15px] right-[15px] w-[12px] h-[12px] border-t-[1.5px] border-r-[1.5px] border-white z-20 pointer-events-none" />
                <div className="absolute bottom-[15px] left-[15px] w-[12px] h-[12px] border-b-[1.5px] border-l-[1.5px] border-white z-20 pointer-events-none" />
                <div className="absolute bottom-[15px] right-[15px] w-[12px] h-[12px] border-b-[1.5px] border-r-[1.5px] border-white z-20 pointer-events-none" />
              </div>

              {/* Title Outfit 17px weight 600, category badge aligned right */}
              <div className="mt-4 flex items-start justify-between gap-4">
                <h4 className={`font-outfit text-[17px] font-semibold leading-snug transition-colors duration-300 select-none ${gridTitleClass}`}>
                  {post.title}
                </h4>
                
                <span
                  style={{ backgroundColor: post.category_color }}
                  className="shrink-0 text-white text-[11px] font-semibold px-3 py-[4px] rounded-[20px] capitalize tracking-wide select-none"
                >
                  {post.category}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
