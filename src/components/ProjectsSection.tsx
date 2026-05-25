import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FolderGit2, Eye, Camera, Tag, Calendar, Braces, Sparkles, Copy, Check, ArrowUpRight } from 'lucide-react';
import projectData from '../data/projects.json';

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: string;
  year: string;
  image: string;
  tags: string[];
  metrics?: {
    focalLength: string;
    aperture: string;
    shutter: string;
    iso: string;
  };
  liveUrl?: string;
}

export default function ProjectsSection({ theme }: { theme: 'day' | 'night' }) {
  const isNight = theme === 'night';
  const projects = projectData as ProjectItem[];
  
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [showJsonViewer, setShowJsonViewer] = useState(false);
  const [copied, setCopied] = useState(false);

  // Dynamic aesthetic theme styles
  const sectionBg = isNight ? 'bg-[#0f111a]' : 'bg-[#fafafa]';
  const headerTitle = isNight ? 'text-white' : 'text-gray-900';
  const textMuted = isNight ? 'text-gray-400' : 'text-gray-500';
  const cardBg = isNight ? 'bg-[#151824]' : 'bg-white';
  const borderCol = isNight ? 'border-white/5' : 'border-gray-200';
  const categoryActiveCol = isNight ? 'bg-[#3b82f6] text-white' : 'bg-black text-white';
  const categoryInactiveCol = isNight ? 'bg-white/5 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200';
  
  // Extract all categories dynamically and append 'All'
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  // Filter projects by active tab
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const jsonString = JSON.stringify(projectData, null, 2);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="work-showcase" className={`w-full py-[80px] font-sans transition-colors duration-500 ${sectionBg}`}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-[20px]">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`inline-block px-3 py-1 rounded-[8px] text-xs font-semibold uppercase tracking-wider ${isNight ? 'bg-white/10 text-[#d1d5db]' : 'bg-[#e5e7eb] text-[#374151]'}`}>
                Showcase
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
            </div>
            <h2 className={`text-[40px] md:text-[54px] font-outfit font-medium tracking-[-2px] leading-tight ${headerTitle}`}>
              Featured Projects
            </h2>
            <p className={`text-[16px] md:text-[18px] mt-2 max-w-[600px] font-medium leading-relaxed ${textMuted}`}>
              A curated selection of photorealistic scenes, camera gear explorations, and custom aesthetics managed dynamically via JSON data.
            </p>
          </div>

          {/* Action toggle button for Developer/Creator JSON Code Side */}
          <button 
            onClick={() => setShowJsonViewer(!showJsonViewer)}
            className={`flex items-center gap-2 px-5 py-3 rounded-[30px] font-semibold text-xs uppercase tracking-wider transition-all duration-300 ${
              isNight ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' : 'bg-white border border-gray-200 text-black shadow-sm hover:bg-gray-50'
            }`}
          >
            <Braces size={14} className={showJsonViewer ? 'text-amber-400 animate-spin' : 'text-blue-400'} />
            {showJsonViewer ? 'Hide JSON Config' : 'View Code Side JSON'}
          </button>
        </div>

        {/* Live Code Side Customizer Board */}
        <AnimatePresence>
          {showJsonViewer && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-10 rounded-2xl border p-6 overflow-hidden ${isNight ? 'bg-[#0a0c14] border-white/10' : 'bg-[#f4f5f8] border-gray-300'} shadow-2xl`}
            >
              <div className="flex items-center justify-between mb-4 border-b pb-4 border-dashed border-gray-700/30">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-400" />
                  <span className={`font-mono text-xs font-semibold tracking-wider uppercase ${isNight ? 'text-gray-200' : 'text-gray-800'}`}>
                    Developer Workspace: projects.json configuration
                  </span>
                </div>
                <button 
                  onClick={handleCopyJson}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold transition-colors"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? 'Copied!' : 'Copy Code Schema'}</span>
                </button>
              </div>
              <p className={`text-xs mb-4 leading-relaxed max-w-3xl ${isNight ? 'text-gray-400' : 'text-gray-600'}`}>
                To edit projects later, you can modify the JSON architecture. Simply customize items in the <code>/src/data/projects.json</code> file to render the beautiful cards below!
              </p>
              
              <div className="relative bg-black rounded-lg p-4 font-mono text-[11px] text-emerald-400 max-h-[220px] overflow-y-auto">
                <pre>{jsonString}</pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-[12px] text-xs font-semibold tracking-wide capitalize select-none transition-all duration-300 ${
                selectedCategory === cat 
                  ? categoryActiveCol
                  : categoryInactiveCol
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p) => {
              const matchesHover = hoveredProject === p.id;
              return (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  onMouseEnter={() => setHoveredProject(p.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className={`flex flex-col rounded-[24px] border overflow-hidden group shadow-lg cursor-pointer ${cardBg} ${borderCol} transition-shadow duration-300 hover:shadow-2xl`}
                >
                  
                  {/* Media Wrapper */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900 border-b border-white/[0.03]">
                    <img
                      src={p.image}
                      alt={p.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.08]"
                    />

                    {/* Dark gradient blur banner on top for specs */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-12 flex flex-col justify-end">
                      {p.metrics && (
                        <div className="font-mono text-[11px] text-slate-300 flex items-center justify-between mt-auto gap-2 text-shadow-sm">
                          <span className="flex items-center gap-1"><Camera size={11} className="text-amber-400" /> {p.metrics.focalLength}</span>
                          <span>{p.metrics.aperture}</span>
                          <span>{p.metrics.shutter}</span>
                          <span className="px-1.5 py-0.5 rounded bg-white/10 text-white font-bold text-[10px]">ISO {p.metrics.iso}</span>
                        </div>
                      )}
                    </div>

                    {/* Left & Right corner photo frames overlay */}
                    <div className="absolute top-[20px] left-[20px] w-4 h-4 border-t-2 border-l-2 border-white/60 pointer-events-none" />
                    <div className="absolute top-[20px] right-[20px] w-4 h-4 border-t-2 border-r-2 border-white/60 pointer-events-none" />
                    <div className="absolute bottom-[20px] left-[20px] w-4 h-4 border-b-2 border-l-2 border-white/50 pointer-events-none" />
                    <div className="absolute bottom-[20px] right-[20px] w-4 h-4 border-b-2 border-r-2 border-white/50 pointer-events-none" />

                    {/* Floating year stamp */}
                    <div className="absolute top-[20px] left-[20px] mx-5 flex items-center gap-1 text-[10px] bg-black/60 backdrop-blur-md text-white font-mono px-2 py-0.5 rounded">
                      <Calendar size={10} className="text-gray-400" />
                      <span>{p.year}</span>
                    </div>

                    {/* Click Indicator overlay */}
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <div className="bg-white/90 text-black text-xs font-bold px-4 py-2.5 rounded-full flex items-center gap-1.5 shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                        <ArrowUpRight size={14} className="text-indigo-600 font-bold" />
                        <span>Interactive Gallery</span>
                      </div>
                    </div>
                  </div>

                  {/* Context Info Section */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Meta stats tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3.5">
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400">
                          {p.category}
                        </span>
                        {p.tags.map(t => (
                          <span key={t} className={`text-[10px] font-medium px-2 py-0.5 rounded ${isNight ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                            #{t}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className={`text-[21px] md:text-[25px] font-outfit font-semibold leading-tight tracking-tight mb-2 transition-colors duration-300 ${
                        isNight ? 'text-gray-100 group-hover:text-blue-400' : 'text-gray-900 group-hover:text-amber-500'
                      }`}>
                        {p.title}
                      </h3>

                      {/* Description */}
                      <p className={`text-sm md:text-[15px] leading-relaxed font-normal ${isNight ? 'text-gray-400' : 'text-gray-600'}`}>
                        {p.description}
                      </p>
                    </div>

                    {/* Quick interactive action line */}
                    <div className="mt-6 pt-5 border-t border-dashed border-gray-600/10 flex items-center justify-between text-xs font-medium">
                      <span className={isNight ? 'text-gray-500' : 'text-gray-400'}>
                        Dynamic JSON node ID: <span className="font-mono text-[10px] bg-slate-900/50 text-indigo-300 px-1 py-0.5 rounded border border-white/5">{p.id}</span>
                      </span>
                      <span className={`inline-flex items-center gap-1 transition-colors ${
                        isNight ? 'text-blue-400 hover:text-blue-300' : 'text-sky-600 hover:text-sky-700'
                      }`}>
                        <span>View specifications</span>
                        <ArrowUpRight size={13} />
                      </span>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
