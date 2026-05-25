import React, { useState } from 'react';
import { Mail, Github, Linkedin, MessageCircle, ArrowUpRight, Copy, Check, Sparkles, Send } from 'lucide-react';

export default function ConnectSection({ theme }: { theme: 'day' | 'night' }) {
  const isNight = theme === 'night';
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [message, setMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  // Dynamic aesthetic theme styles
  const sectionBg = isNight ? 'bg-[#060810] text-[#e2e8f0]' : 'bg-white text-black';
  const titleColor = isNight ? 'text-white' : 'text-gray-900';
  const textMuted = isNight ? 'text-gray-400' : 'text-gray-500';
  const cardBg = isNight ? 'bg-[#121420]' : 'bg-[#fcfcfc]';
  const borderCol = isNight ? 'border-white/[0.08]' : 'border-[#f0f0f0]';
  const dividerCol = isNight ? 'border-white/5' : 'border-gray-100';
  const inputBg = isNight ? 'bg-white/[0.03] border-white/10 text-white focus:border-blue-500' : 'bg-gray-100 border-gray-200 text-black focus:border-black';

  const emailAddress = 'fiaalekh@gmail.com';
  const phoneNumber = '+919999999999'; // Standard format, can be updated by user later if they wish
  const githubUrl = 'https://github.com';
  const linkedinUrl = 'https://linkedin.com';
  const whatsappUrl = `https://wa.me/919999999999?text=Hi%20Aalekh,%20I'd%20love%20to%20collaborate%20on%20a%20photography%20or%20coding%20project!`;

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setMessageSent(true);
    setTimeout(() => {
      setMessage('');
      setMessageSent(false);
    }, 4500);
  };

  return (
    <section id="connect-section" className={`w-full py-[80px] font-sans border-t transition-colors duration-500 ${sectionBg} ${borderCol}`}>
      <div className="max-w-[1250px] mx-auto px-5 md:px-[30px]">
        
        {/* Upper Title Section */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[8px] text-xs font-semibold uppercase tracking-wider mb-4 bg-sky-500/10 text-sky-400">
            <Sparkles size={12} />
            Let's Collaborate
          </div>
          <h2 className={`text-[36px] md:text-[54px] font-outfit font-semibold tracking-[-2px] leading-[1.1] ${titleColor}`}>
            Got a vision? Let’s bring it to life.
          </h2>
          <p className={`text-[16px] md:text-[18px] mt-4 font-normal ${textMuted}`}>
            Let's connect across any of these channels to explore high-impact photography projects, interactive developer stacks, or corporate inquiries.
          </p>
        </div>

        {/* 4-Column Grid of Beautiful Link Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Card 1: WhatsApp */}
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`group p-6 rounded-[24px] border ${cardBg} ${borderCol} hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-[210px] relative overflow-hidden`}
          >
            {/* Soft decorative background circles for visual depth */}
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#25D366]/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
            
            <div className="flex items-center justify-between">
              <div className="p-3.5 rounded-[16px] bg-[#25D366]/10 text-[#25D366] transition-transform duration-300 group-hover:scale-105">
                <MessageCircle size={22} className="fill-current" />
              </div>
              <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#25D366]/10 text-[#25D366]`}>WhatsApp</span>
            </div>

            <div className="mt-6">
              <h3 className={`text-[20px] font-outfit font-semibold mb-1 group-hover:text-[#25D366] transition-colors ${titleColor}`}>
                Instant Chat
              </h3>
              <p className={`text-xs ${textMuted}`}>
                Drop a direct text for immediate response and project reviews.
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#25D366] mt-4">
              <span>Chat on WhatsApp</span>
              <ArrowUpRight size={14} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </a>

          {/* Card 2: LinkedIn */}
          <a 
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`group p-6 rounded-[24px] border ${cardBg} ${borderCol} hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-[210px] relative overflow-hidden`}
          >
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#0A66C2]/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
            
            <div className="flex items-center justify-between">
              <div className="p-3.5 rounded-[16px] bg-[#0A66C2]/10 text-[#0A66C2] transition-transform duration-300 group-hover:scale-105">
                <Linkedin size={22} className="fill-current" />
              </div>
              <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#0A66C2]/10 text-[#0A66C2]`}>LinkedIn</span>
            </div>

            <div className="mt-6">
              <h3 className={`text-[20px] font-outfit font-semibold mb-1 group-hover:text-[#0A66C2] transition-colors ${titleColor}`}>
                Professional Network
              </h3>
              <p className={`text-xs ${textMuted}`}>
                Connect with me for professional updates and networking.
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0A66C2] mt-4">
              <span>View LinkedIn Profile</span>
              <ArrowUpRight size={14} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </a>

          {/* Card 3: GitHub */}
          <a 
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`group p-6 rounded-[24px] border ${cardBg} ${borderCol} hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-[210px] relative overflow-hidden`}
          >
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-gray-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
            
            <div className="flex items-center justify-between">
              <div className="p-3.5 rounded-[16px] bg-slate-500/10 text-slate-400 group-hover:text-amber-400 transition-colors">
                <Github size={22} />
              </div>
              <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${isNight ? 'bg-white/10 text-white' : 'bg-black text-white'}`}>GitHub</span>
            </div>

            <div className="mt-6">
              <h3 className={`text-[20px] font-outfit font-semibold mb-1 transition-colors ${titleColor}`}>
                Open Source
              </h3>
              <p className={`text-xs ${textMuted}`}>
                Inspect high-performance code, design patterns, and creative branches.
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold mt-4 text-[#e2e8f0]/90">
              <span className={isNight ? 'text-white' : 'text-black'}>Explore Repository</span>
              <ArrowUpRight size={14} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-slate-400" />
            </div>
          </a>

          {/* Card 4: Gmail / Direct Copy */}
          <div 
            onClick={copyEmail}
            className={`group p-6 rounded-[24px] border ${cardBg} ${borderCol} hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-[210px] relative overflow-hidden cursor-pointer select-none`}
          >
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-red-500/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
            
            <div className="flex items-center justify-between">
              <div className="p-3.5 rounded-[16px] bg-red-500/10 text-red-400">
                <Mail size={22} />
              </div>
              <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-500/10 text-red-400`}>Email</span>
            </div>

            <div className="mt-6">
              <h3 className={`text-[20px] font-outfit font-semibold mb-1 transition-colors ${titleColor}`}>
                {emailAddress}
              </h3>
              <p className={`text-xs ${textMuted}`}>
                Click anywhere on this card to automatically copy my address!
              </p>
            </div>

            <button 
              className={`flex items-center gap-1.5 text-xs font-bold mt-4 px-3 py-1.5 rounded-lg border text-center transition-all duration-300 ${
                copiedEmail 
                  ? 'bg-emerald-500 border-emerald-400 text-white' 
                  : 'bg-white/10 text-white/90 border-transparent hover:bg-white/20'
              }`}
            >
              {copiedEmail ? <Check size={13} /> : <Copy size={13} />}
              <span>{copiedEmail ? 'Copied to Clipboard!' : 'Copy Email Address'}</span>
            </button>
          </div>

        </div>

        {/* Dynamic Interactive Message Desk & Form Panel */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-[30px] border p-6 md:p-10 ${cardBg} ${borderCol} shadow-lg overflow-hidden relative`}>
          <div className="lg:col-span-12 pointer-events-none absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl" />

          {/* Prompt / Details column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h4 className={`text-[24px] md:text-[30px] font-outfit font-medium tracking-tight mb-2 ${titleColor}`}>
                Direct Message Gate
              </h4>
              <p className={`text-sm leading-relaxed max-w-md ${textMuted}`}>
                Have a quick thought, question, or custom photoshoot request? Enter your message in the dashboard here. I review incoming pings every day.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-dashed border-gray-700/10 flex flex-col gap-2.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold">Interactive Office Hours: Mumbai // India GMT</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500">
                <span>E: {emailAddress}</span>
                <span>/</span>
                <span 
                  onClick={copyPhone}
                  className="cursor-pointer hover:text-black transition-colors"
                >
                  {copiedPhone ? 'Copied number!' : `M: ${phoneNumber}`}
                </span>
              </div>
            </div>
          </div>

          {/* Form input field */}
          <form onSubmit={handleSendMessage} className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Say Hello</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi Aalekh! I love the new 'Behind the Lens' photography blog and beautiful dynamically customized projects list. Let's build something epic..."
                rows={4}
                className={`w-full rounded-[16px] border px-4 py-3.5 text-sm transition-all duration-300 resize-none outline-none ${inputBg}`}
                required
              />
            </div>

            <button
              type="submit"
              disabled={messageSent || !message.trim()}
              className={`w-full py-4 rounded-[16px] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
                messageSent 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-black text-white hover:bg-gray-900 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              {messageSent ? (
                <>
                  <Check size={14} />
                  <span>Message Received! Talk to you soon!</span>
                </>
              ) : (
                <>
                  <Send size={14} className="animate-push" />
                  <span>Transmit Direct Message</span>
                </>
              )}
            </button>
            <span className="text-[10px] text-gray-500 text-center block">
              Messages are processed locally using client state simulation. Connect via WhatsApp or email for permanent databases!
            </span>
          </form>
        </div>

        {/* humble copyright notice */}
        <div className="mt-16 pt-8 border-t border-dashed border-gray-700/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs select-none">
          <span className={textMuted}>
            &copy; 2026 Aalekh Dev. All creative rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <a href="#photography-blog" className="text-slate-400 hover:text-slate-600 transition-colors">Blog</a>
            <span className="text-gray-300">•</span>
            <a href="#work-showcase" className="text-slate-400 hover:text-slate-600 transition-colors">Projects</a>
            <span className="text-gray-300">•</span>
            <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">Top</a>
          </div>
        </div>

      </div>
    </section>
  );
}
