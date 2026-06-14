import React from 'react';

const DARK_BG = '#0B0D0F';
const CARD_BG = '#16181C';
const ACCENT = '#E5FA56';

export default function Dashboard() {
  return (
    <div className="flex h-screen w-full overflow-hidden font-sans text-white" style={{ backgroundColor: DARK_BG }}>
      
      {/* SIDEBAR */}
      <aside className="w-[240px] flex flex-col justify-between border-r border-white/5 py-8 px-6">
        
        {/* Top: Logo & Nav */}
        <div>
          <div className="flex items-center gap-3 mb-12">
            <span className="material-symbols-outlined text-[28px]" style={{ color: ACCENT }}>play_arrow</span>
            <span className="text-2xl font-black tracking-tight">CNS.</span>
          </div>

          <nav className="flex flex-col gap-2">
            {[
              { name: 'Dashboard', icon: 'home', active: true },
              { name: 'Movies', icon: 'movie', active: false },
              { name: 'TV Shows', icon: 'tv', active: false },
              { name: 'Music', icon: 'music_note', active: false },
              { name: 'Photos', icon: 'photo_library', active: false },
              { name: 'Collections', icon: 'view_carousel', active: false },
              { name: 'Playlists', icon: 'queue_music', active: false },
              { name: 'Watch Later', icon: 'schedule', active: false },
              { name: 'Settings', icon: 'settings', active: false },
            ].map((item) => (
              <a key={item.name} href="#" className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${item.active ? 'bg-gradient-to-r from-[rgba(229,250,86,0.15)] to-transparent border border-[rgba(229,250,86,0.2)]' : 'hover:bg-white/5'}`}>
                <span className={`material-symbols-outlined text-[20px] ${item.active ? '' : 'text-white/40'}`} style={{ color: item.active ? ACCENT : undefined }}>{item.icon}</span>
                <span className={`font-semibold text-[14px] ${item.active ? '' : 'text-white/60'}`} style={{ color: item.active ? ACCENT : undefined }}>{item.name}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom: Core Online Widget */}
        <div className="p-4 rounded-2xl border border-white/5 mt-auto" style={{ backgroundColor: CARD_BG }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ACCENT }}></div>
            <span className="text-[11px] font-bold tracking-widest text-white/60 uppercase">Core Online</span>
          </div>
          <p className="text-[12px] text-white/40 mb-4 leading-tight">Everything is running smoothly.</p>
          
          {/* Mock Sparkline */}
          <div className="h-8 mb-4 flex items-end">
             <svg width="100%" height="100%" viewBox="0 0 100 30" preserveAspectRatio="none">
               <path d="M0,20 Q10,5 20,20 T40,20 T60,10 T80,25 T100,5" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" />
             </svg>
          </div>

          <button className="w-full flex items-center justify-between px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5">
            <span className="text-[12px] font-semibold text-white/80">View System Status</span>
            <span className="material-symbols-outlined text-[14px] text-white/50">chevron_right</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* HEADER */}
        <header className="flex items-center justify-between px-10 pt-10 pb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1 tracking-tight">Good Evening, Naseer 👋</h1>
            <p className="text-white/50 font-medium text-[15px]">Continue where you left off</p>
          </div>

          <div className="flex items-center gap-6">
            {/* Search */}
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 w-[280px]">
              <span className="material-symbols-outlined text-white/40 text-[20px] mr-3">search</span>
              <input type="text" placeholder="Search your library..." className="bg-transparent border-none outline-none text-[14px] text-white placeholder-white/40 flex-1" />
              <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded border border-white/10">
                <span className="material-symbols-outlined text-[10px] text-white/60">keyboard_command_key</span>
                <span className="text-[10px] font-bold text-white/60">K</span>
              </div>
            </div>

            {/* Notification */}
            <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative hover:bg-white/10 transition-colors">
               <span className="material-symbols-outlined text-[20px] text-white/80">notifications</span>
               <div className="absolute top-2 right-2 w-2 h-2 rounded-full border-2 border-[#0B0D0F]" style={{ backgroundColor: ACCENT }}></div>
            </button>

            {/* Avatar */}
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="User" className="w-10 h-10 rounded-full border border-white/20 object-cover cursor-pointer" />
          </div>
        </header>

        {/* CONTENT GRID */}
        <div className="flex-1 flex overflow-hidden px-10 pb-10 gap-8">
           
           {/* LEFT COLUMN (MAIN) */}
           <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar gap-8 pr-2">
              
              {/* HERO CARD (Interstellar) */}
              <div className="relative rounded-[32px] overflow-hidden h-[320px] shrink-0 flex flex-col justify-end p-10 border border-white/10 shadow-2xl group cursor-pointer">
                 <img src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&q=80" alt="Interstellar" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen transition-transform duration-700 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0F] via-[#0B0D0F]/40 to-transparent"></div>
                 
                 <div className="relative z-10 w-full">
                    <span className="text-[11px] font-bold tracking-widest uppercase mb-3 block" style={{ color: ACCENT }}>Resume Watching</span>
                    <h2 className="text-5xl font-black tracking-tight mb-3">Interstellar</h2>
                    <p className="text-white/60 font-medium text-[15px] mb-8">1h 24m remaining • 2014 • 4K HDR</p>
                    
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-black hover:brightness-110 transition-all" style={{ backgroundColor: ACCENT, boxShadow: `0 0 20px rgba(229,250,86,0.3)` }}>
                          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                          <span>Resume</span>
                        </button>
                        <button className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 backdrop-blur-md transition-all">
                          <span className="material-symbols-outlined text-[24px]">add</span>
                        </button>
                      </div>

                      {/* Progress line */}
                      <div className="flex items-center gap-4 flex-1 ml-12 max-w-[400px]">
                        <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: '58%', backgroundColor: ACCENT }}></div>
                        </div>
                        <span className="text-[12px] font-bold text-white/60">58%</span>
                      </div>
                    </div>
                 </div>
              </div>

              {/* STATS ROW */}
              <div className="grid grid-cols-4 gap-4 shrink-0">
                 {[
                   { title: 'LIBRARY', count: '12,431', sub: 'Files', icon: 'folder', spark: 'M0,10 Q5,0 10,10 T20,10 T30,0 T40,10' },
                   { title: 'MOVIES', count: '824', sub: 'Items', icon: 'movie', spark: 'M0,5 Q5,15 10,5 T20,15 T30,5 T40,5' },
                   { title: 'MUSIC', count: '15,492', sub: 'Tracks', icon: 'music_note', spark: 'M0,10 Q5,20 10,10 T20,5 T30,15 T40,10' },
                   { title: 'DEVICES', count: '3', sub: 'Connected', icon: 'desktop_windows', spark: 'M0,10 Q10,10 20,10 T40,10' }
                 ].map(stat => (
                   <div key={stat.title} className="p-5 rounded-2xl border border-white/5 relative overflow-hidden flex flex-col justify-between h-[120px]" style={{ backgroundColor: CARD_BG }}>
                     <div className="flex items-center gap-2 mb-2 z-10">
                       <span className="material-symbols-outlined text-[16px]" style={{ color: ACCENT, fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
                       <span className="text-[11px] font-bold tracking-widest text-white/50 uppercase">{stat.title}</span>
                     </div>
                     <div className="z-10">
                       <div className="text-3xl font-black tracking-tight mb-1">{stat.count}</div>
                       <div className="text-[13px] text-white/40 font-medium">{stat.sub}</div>
                     </div>
                     <div className="absolute bottom-2 right-4 w-16 h-8">
                        <svg width="100%" height="100%" viewBox="0 0 40 20" preserveAspectRatio="none" className="opacity-60">
                           <path d={stat.spark} fill="none" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                     </div>
                   </div>
                 ))}
              </div>

              {/* CONTINUE WATCHING */}
              <div className="shrink-0 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[18px] font-bold">Continue Watching</h3>
                  <button className="text-[13px] font-bold flex items-center gap-1 hover:brightness-110 transition-all" style={{ color: ACCENT }}>
                    View All <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-4 gap-4 relative">
                  {[
                    { title: 'Dune: Part Two', subLeft: '63%', img: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80', pct: 68, color: '#FF7A00' },
                    { title: 'Breaking Bad', subLeft: 'S5 - E14', img: 'https://images.unsplash.com/photo-1573431671387-a0f5df73c1c4?w=400&q=80', pct: 32, color: ACCENT },
                    { title: 'The Dark Knight', subLeft: '1h 05m left', img: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&q=80', pct: 46, color: ACCENT },
                    { title: 'Inception', subLeft: '32m left', img: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&q=80', pct: 30, color: ACCENT }
                  ].map(item => (
                    <div key={item.title} className="relative rounded-2xl overflow-hidden aspect-[4/3] group border border-white/5 cursor-pointer">
                      <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0F] via-black/20 to-transparent"></div>
                      
                      <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 border border-white/50 flex items-center justify-center backdrop-blur-md opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-xl">
                         <span className="material-symbols-outlined text-white text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                      </button>

                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h4 className="font-bold text-[14px] mb-2 leading-tight drop-shadow-md">{item.title}</h4>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-bold text-white/60 drop-shadow-md">{item.subLeft}</span>
                          <span className="text-[11px] font-bold text-white/90 drop-shadow-md">{item.pct}%</span>
                        </div>
                        <div className="h-[2px] bg-white/20 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${item.pct}%`, backgroundColor: item.color }}></div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Arrow overlay mock */}
                  <button className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#16181C] border border-white/10 flex items-center justify-center shadow-xl z-10 hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>
              </div>

              {/* RECENTLY ADDED */}
              <div className="shrink-0 mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[18px] font-bold">Recently Added</h3>
                  <button className="text-[13px] font-bold flex items-center gap-1 hover:brightness-110 transition-all" style={{ color: ACCENT }}>
                    View All <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>

                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 relative">
                  {[
                    { title: 'Oppenheimer', img: 'https://images.unsplash.com/photo-1614729939124-032d0b56c9ce?w=300&h=450&fit=crop', isNew: true, sub: 'Oppenheimer' },
                    { title: 'The Boys', img: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=300&h=450&fit=crop', isNew: true, sub: 'The Boys' },
                    { title: 'John Wick', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=300&h=450&fit=crop', isNew: true, sub: 'John Wick 4' },
                    { title: 'Dune', img: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=300&h=450&fit=crop', isNew: true, sub: 'Dune' },
                    { title: 'Mad Max', img: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?w=300&h=450&fit=crop', isNew: true, sub: 'Mad Max' },
                    { title: 'The Weeknd', img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=450&fit=crop', isNew: true, sub: 'Dawn FM' },
                  ].map(item => (
                     <div key={item.title} className="w-[150px] shrink-0 rounded-[14px] overflow-hidden relative border border-white/5 group cursor-pointer aspect-[2/3] bg-black">
                        <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0F] via-transparent to-transparent opacity-90"></div>
                        
                        {item.isNew && (
                          <div className="absolute top-2 right-2 px-2 py-[2px] rounded-full border border-white/10 bg-black/60 backdrop-blur-md">
                            <span className="text-[8px] font-bold uppercase tracking-widest" style={{ color: ACCENT }}>New</span>
                          </div>
                        )}

                        <div className="absolute bottom-3 left-3 pr-3">
                          <h4 className="font-bold text-[13px] leading-tight mb-0.5 drop-shadow-md">{item.title}</h4>
                          <p className="text-[10px] text-white/50 drop-shadow-md">{item.sub}</p>
                        </div>
                     </div>
                  ))}

                  <button className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#16181C] border border-white/10 flex items-center justify-center shadow-xl z-10 hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>
              </div>

           </div>

           {/* RIGHT COLUMN (SIDEBAR) */}
           <div className="w-[320px] shrink-0 flex flex-col gap-6 overflow-y-auto no-scrollbar pb-10">
             
             {/* ADD MEDIA BTN */}
             <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-black font-bold text-[15px] shadow-[0_0_30px_rgba(229,250,86,0.15)] transition-all hover:brightness-110" style={{ backgroundColor: ACCENT }}>
                <span className="material-symbols-outlined text-[20px]">add</span>
                <span>Add Media</span>
                <span className="material-symbols-outlined text-[20px] ml-4 opacity-50">expand_more</span>
             </button>

             {/* STORAGE OVERVIEW */}
             <div className="p-6 rounded-3xl border border-white/5" style={{ backgroundColor: CARD_BG }}>
                <h3 className="font-bold text-[16px] mb-1 tracking-tight">Storage Overview</h3>
                <p className="text-white/50 text-[13px] mb-8 font-medium">1.2 TB of 3 TB used</p>

                <div className="flex items-center gap-6 mb-8">
                   {/* Donut Chart Mock */}
                   <div className="relative w-[110px] h-[110px] flex items-center justify-center shrink-0">
                     <svg width="110" height="110" viewBox="0 0 100 100" className="-rotate-90">
                        {/* Background ring */}
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#222" strokeWidth="4" />
                        {/* Movies (Green) 45% */}
                        <circle cx="50" cy="50" r="40" fill="none" stroke={ACCENT} strokeWidth="4" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.45)} />
                        {/* Music (Yellow) 30% */}
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#F5D235" strokeWidth="4" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.30)} className="origin-center" style={{ transform: `rotate(${0.45 * 360}deg)` }} />
                        {/* Photos (Blue) 15% */}
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#3585F5" strokeWidth="4" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.15)} className="origin-center" style={{ transform: `rotate(${(0.45 + 0.30) * 360}deg)` }} />
                        {/* Other (Purple) 10% */}
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#B035F5" strokeWidth="4" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.10)} className="origin-center" style={{ transform: `rotate(${(0.45 + 0.30 + 0.15) * 360}deg)` }} />
                     </svg>
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-black text-[22px] tracking-tighter mt-1">40%</span>
                        <span className="text-[9px] text-white/50 font-bold uppercase tracking-wider -mt-1">Used</span>
                     </div>
                   </div>

                   <div className="flex-1 flex flex-col gap-2.5">
                      {[
                        { label: 'Movies', pct: '45%', color: ACCENT },
                        { label: 'Music', pct: '30%', color: '#F5D235' },
                        { label: 'Photos', pct: '15%', color: '#3585F5' },
                        { label: 'Other', pct: '10%', color: '#B035F5' }
                      ].map(item => (
                        <div key={item.label} className="flex items-center justify-between text-[13px]">
                          <div className="flex items-center gap-2">
                             <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                             <span className="text-white/70 font-medium">{item.label}</span>
                          </div>
                          <span className="font-bold">{item.pct}</span>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="h-px w-full bg-white/5 mb-4"></div>
                <button className="w-full flex items-center justify-between text-[13px] text-white/60 hover:text-white transition-colors font-medium">
                  <span>Manage Storage</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
             </div>

             {/* ECOSYSTEM */}
             <div className="p-6 rounded-3xl border border-white/5" style={{ backgroundColor: CARD_BG }}>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bold text-[16px] tracking-tight">Your Ecosystem</h3>
                  <button className="text-[12px] font-bold flex items-center" style={{ color: ACCENT }}>
                    View All <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>

                <div className="relative flex items-center justify-between px-2 mb-8">
                   {/* Dotted line background */}
                   <div className="absolute top-1/2 -translate-y-1/2 left-10 right-10 border-t border-dashed border-white/20 z-0"></div>
                   
                   {/* Desktop */}
                   <div className="flex flex-col items-center z-10 gap-2">
                      <div className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center relative shadow-lg">
                        <span className="material-symbols-outlined text-white/60 text-[20px]">desktop_windows</span>
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#16181C]" style={{ backgroundColor: ACCENT }}></div>
                      </div>
                      <div className="text-center">
                         <div className="text-[10px] font-bold uppercase tracking-wider mb-0.5">Desktop</div>
                         <div className="text-[10px] text-white/50 font-medium">Windows</div>
                      </div>
                   </div>

                   {/* Central CNS Logo */}
                   <div className="flex flex-col items-center z-10 relative">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(229,250,86,0.15)] border border-[rgba(229,250,86,0.2)] bg-[#0B0D0F]">
                        <div className="w-full h-full rounded-full flex items-center justify-center" style={{ background: `radial-gradient(circle, rgba(229,250,86,0.15) 0%, transparent 70%)` }}>
                          <span className="material-symbols-outlined text-[32px]" style={{ color: ACCENT, fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                        </div>
                      </div>
                      
                      {/* Dotted line to Tablet */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 h-8 border-l border-dashed border-white/20"></div>
                   </div>

                   {/* Mobile */}
                   <div className="flex flex-col items-center z-10 gap-2">
                      <div className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center shadow-lg">
                        <span className="material-symbols-outlined text-white/60 text-[20px]">smartphone</span>
                      </div>
                      <div className="text-center">
                         <div className="text-[10px] font-bold uppercase tracking-wider mb-0.5">Mobile</div>
                         <div className="text-[10px] text-white/50 font-medium">iPhone 15 Pro</div>
                      </div>
                   </div>
                </div>

                {/* Tablet (hanging below) */}
                <div className="flex flex-col items-center z-10 gap-2 mt-4">
                    <div className="w-10 h-10 rounded-full bg-[#111] border border-white/10 flex items-center justify-center shadow-lg">
                      <span className="material-symbols-outlined text-white/60 text-[18px]">tablet_mac</span>
                    </div>
                    <div className="text-center">
                        <div className="text-[10px] font-bold uppercase tracking-wider mb-0.5">Tablet</div>
                        <div className="text-[10px] text-white/50 font-medium">iPad Pro</div>
                    </div>
                </div>

                <div className="flex justify-center mt-8">
                  <div className="text-[12px] text-white/50 font-medium flex items-center gap-1.5">
                    Last sync: 3 sec ago <span className="material-symbols-outlined text-[14px]" style={{ color: ACCENT, fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </div>
                </div>
             </div>

             {/* RECENT ACTIVITY */}
             <div className="p-6 rounded-3xl border border-white/5 flex-1 flex flex-col" style={{ backgroundColor: CARD_BG }}>
                <h3 className="font-bold text-[16px] mb-6 tracking-tight">Recent Activity</h3>

                <div className="flex flex-col gap-6 flex-1">
                   {[
                     { title: 'Interstellar.mkv', sub: 'Added to Movies', time: '2m ago', icon: 'movie', color: ACCENT },
                     { title: 'Another Love.mp3', sub: 'Added to Music', time: '8m ago', icon: 'music_note', color: '#F5D235' },
                     { title: 'TV Shows synced', sub: '120 new episodes', time: '21m ago', icon: 'sync', color: '#3585F5' },
                     { title: 'iPhone 15 Pro connected', sub: 'Remote access enabled', time: '35m ago', icon: 'smartphone', color: '#B035F5' },
                   ].map((act, i) => (
                     <div key={i} className="flex gap-4">
                       <div className="w-9 h-9 rounded-xl bg-[#0B0D0F] border border-white/5 flex items-center justify-center shrink-0 shadow-inner">
                          <span className="material-symbols-outlined text-[18px]" style={{ color: act.color }}>{act.icon}</span>
                       </div>
                       <div className="flex-1">
                          <div className="flex items-center justify-between mb-0.5">
                             <h4 className="text-[13px] font-bold">{act.title}</h4>
                             <span className="text-[11px] font-medium text-white/40">{act.time}</span>
                          </div>
                          <p className="text-[12px] text-white/50 font-medium">{act.sub}</p>
                       </div>
                     </div>
                   ))}
                </div>

                <div className="h-px w-full bg-white/5 mt-6 mb-4"></div>
                <button className="w-full flex items-center justify-between text-[13px] text-white/60 hover:text-white transition-colors font-medium">
                  <span>View All Activity</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
             </div>

           </div>
        </div>
      </main>
      
      {/* Hide default scrollbars */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
