import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import FadeIn from './components/FadeIn';
import AnimatedHeading from './components/AnimatedHeading';
import BehindTheLens from './components/BehindTheLens';
import ProjectsSection from './components/ProjectsSection';
import ConnectSection from './components/ConnectSection';

export default function App() {
  const [theme, setTheme] = useState<'day' | 'night'>('night');

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden overflow-y-auto scroll-smooth bg-black text-white flex flex-col">
      {/* 
        Hero Section (Takes up exactly one complete viewport)
      */}
      <div className="relative w-full h-screen min-h-[600px] flex flex-col justify-between shrink-0">
        {/* 
          Crossfade Background Images (Confined to full-screen Hero container)
          - Opacity transitions over 1000ms
          - Both cover the entire Hero viewport
          - referrerPolicy="no-referrer" for security and strict compliance
        */}
        <img
          src="https://res.cloudinary.com/ddfglmkbd/image/upload/v1779466449/code-day_zl6siy.webp"
          alt="Coding Daytime Background"
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none transition-opacity duration-1000 ease-in-out ${
            theme === 'day' ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <img
          src="https://res.cloudinary.com/ddfglmkbd/image/upload/v1779466437/code-night_ofnyph.webp"
          alt="Coding Nighttime Background"
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none transition-opacity duration-1000 ease-in-out ${
            theme === 'night' ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Main Content Layout Overlay */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between flex-1">
          {/* Navbar */}
          <header className="px-6 md:px-12 lg:px-16 pt-6 w-full select-none">
            <nav className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
              {/* Left: Logo */}
              <div className="text-2xl font-semibold tracking-tight text-white font-sans">
                Aalekh-Coder
              </div>

              {/* Center: Navigation Links */}
              <div className="hidden md:flex items-center gap-8">
                <a
                  href="#about"
                  className="text-sm font-medium text-white hover:text-gray-300 transition-colors duration-200"
                >
                  About
                </a>
                <a
                  href="#mern"
                  className="text-sm font-medium text-white hover:text-gray-300 transition-colors duration-200"
                >
                  MERN Stack
                </a>
                <a
                  href="#agents"
                  className="text-sm font-medium text-white hover:text-gray-300 transition-colors duration-200"
                >
                  AI Agents
                </a>
                <a
                  href="#rag"
                  className="text-sm font-medium text-white hover:text-gray-300 transition-colors duration-200"
                >
                  RAG Systems
                </a>
                <a
                  href="#photography-blog"
                  className="text-sm font-medium text-[#d1d5db] hover:text-white transition-colors duration-200"
                >
                  Blog
                </a>
                <a
                  href="#work-showcase"
                  className="text-sm font-medium text-amber-300 hover:text-amber-200 transition-colors duration-200 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Projects
                </a>
                <a
                  href="#connect-section"
                  className="text-sm font-extrabold text-[#d1d5db] hover:text-white transition-colors duration-200"
                >
                  Connect
                </a>
              </div>

              {/* Right: Theme Toggle and CTA Button */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setTheme(theme === 'day' ? 'night' : 'day')}
                  className="liquid-glass border border-white/10 p-2.5 rounded-lg text-white hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer flex items-center justify-center active:scale-95"
                  title={`Switch to ${theme === 'day' ? 'Night' : 'Day'} Mode`}
                >
                  {theme === 'day' ? (
                    <Sun size={18} className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] transition-transform duration-500 hover:rotate-45" />
                  ) : (
                    <Moon size={18} className="text-sky-300 drop-shadow-[0_0_8px_rgba(125,211,252,0.5)] transition-transform duration-500 hover:-rotate-12" />
                  )}
                </button>
                <a
                  href="#connect-section"
                  className="bg-white text-black px-6 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-all duration-200 cursor-pointer text-center select-none"
                >
                  Start a Chat
                </a>
              </div>
            </nav>
          </header>

          {/* Hero Content Section (Pushed to bottom) */}
          <main className="px-6 md:px-12 lg:px-16 flex-1 flex flex-col justify-end pb-12 lg:pb-16 w-full select-none">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-end w-full">
              
              {/* Left Column: Heading, Subheading, Button Group with high-contrast backdrop-blur and border */}
              <div className="flex flex-col items-start max-w-2xl backdrop-blur-md bg-black/45 border border-white/10 p-6 md:p-8 rounded-2xl shadow-2xl">
                {/* Character-by-character animated heading */}
                <AnimatedHeading
                  text={"Shaping tomorrow\nwith code and intelligence."}
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4 text-white leading-tight"
                />

                {/* Subheading with fade-in */}
                <FadeIn delay={800} duration={1000} className="w-full">
                  <p className="text-base md:text-lg text-gray-300 mb-5 max-w-xl">
                    Prototyping fluid MERN stack systems and engineering autonomous Agentic AI with advanced RAG vector pipelines.
                  </p>
                </FadeIn>

                {/* Action buttons with fade-in */}
                <FadeIn delay={1200} duration={1000} className="w-full">
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="#connect-section"
                      className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 text-center select-none"
                    >
                      Start a Chat
                    </a>
                    <a
                      href="#work-showcase"
                      className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-all duration-300 text-center select-none animate-pulse-subtle"
                    >
                      Explore Projects
                    </a>
                  </div>
                </FadeIn>
              </div>

              {/* Right Column: Glass Card Tag */}
              <div className="flex items-end justify-start lg:justify-end">
                <FadeIn delay={1400} duration={1000}>
                  <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl">
                    <span className="text-lg md:text-xl lg:text-2xl font-light text-white tracking-wide">
                      MERN. Agents. RAG.
                    </span>
                  </div>
                </FadeIn>
              </div>

            </div>
          </main>
        </div>
      </div>

      {/* Behind the Lens photography blog section with full responsive light/dark themes */}
      <BehindTheLens theme={theme} />

      {/* Interactive Projects and Code-side JSON Showcase with full responsive light/dark themes */}
      <ProjectsSection theme={theme} />

      {/* Interactive Beautiful Let's Collaborate Section */}
      <ConnectSection theme={theme} />
    </div>
  );
}
