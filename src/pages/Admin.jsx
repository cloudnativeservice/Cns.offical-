import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, doc, getDoc, setDoc } from 'firebase/firestore';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState('waitlist'); // waitlist, settings

  const [emails, setEmails] = useState([]);
  const [config, setConfig] = useState({ targetDate: '', showBanner: true });
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [savingConfig, setSavingConfig] = useState(false);

  // Authentication Check (Simple Client Side)
  useEffect(() => {
    if (localStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'cns-admin' || passwordInput === 'admin123') {
      localStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
  };

  // Fetch Emails & Config
  useEffect(() => {
    if (!isAuthenticated) return;

    // Fetch Emails
    const q = query(collection(db, 'emails'), orderBy('timestamp', 'desc'));
    const unsubscribeEmails = onSnapshot(q, (snapshot) => {
      const emailList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEmails(emailList);
    });

    // Fetch Config
    const fetchConfig = async () => {
      try {
        const docRef = doc(db, 'config', 'waitlist');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setConfig(docSnap.data());
        } else {
          // Initialize if empty
          const initConfig = { targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], showBanner: true };
          await setDoc(docRef, initConfig);
          setConfig(initConfig);
        }
      } catch (e) {
        console.error("Error fetching config:", e);
      } finally {
        setLoadingConfig(false);
      }
    };
    fetchConfig();

    return () => unsubscribeEmails();
  }, [isAuthenticated]);

  const handleSaveConfig = async (e) => {
    e.preventDefault();
    setSavingConfig(true);
    try {
      await setDoc(doc(db, 'config', 'waitlist'), config);
      alert('Settings saved successfully!');
    } catch (e) {
      console.error('Error saving config:', e);
      alert('Failed to save settings.');
    } finally {
      setSavingConfig(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-[#111111] border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl">
          <div className="flex items-center justify-center mb-8 gap-3">
            <span className="material-symbols-outlined text-primary text-4xl">admin_panel_settings</span>
            <h1 className="text-2xl font-black text-white tracking-tight">CNS Admin</h1>
          </div>
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary mb-6"
          />
          <button type="submit" className="w-full bg-primary text-black font-bold py-3 rounded-xl hover:brightness-110 transition-all shadow-[0_0_20px_rgba(199,255,47,0.2)]">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Admin Navbar */}
      <nav className="bg-[#111111] border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">admin_panel_settings</span>
          <span className="font-black text-xl tracking-tighter">CNS Admin</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-4 bg-black p-1 rounded-xl border border-white/5">
            <button 
              onClick={() => setActiveTab('waitlist')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'waitlist' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'}`}
            >
              Waitlist
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'settings' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'}`}
            >
              Banner Settings
            </button>
          </div>
          <button onClick={handleLogout} className="text-white/50 hover:text-white transition-colors text-sm font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">logout</span> Logout
          </button>
        </div>
      </nav>

      {/* Mobile Tabs */}
      <div className="md:hidden flex gap-2 bg-[#111111] p-4 border-b border-white/5">
        <button 
          onClick={() => setActiveTab('waitlist')}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'waitlist' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'}`}
        >
          Waitlist
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'settings' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'}`}
        >
          Settings
        </button>
      </div>

      <main className="max-w-6xl mx-auto p-6 md:p-12">
        
        {/* WAITLIST TAB */}
        {activeTab === 'waitlist' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h2 className="text-3xl font-black mb-2">Waitlisted Users</h2>
                <p className="text-white/50">Total users on the waitlist: <strong className="text-primary">{emails.length}</strong></p>
              </div>
              <button 
                onClick={() => {
                  const csv = "Email,Date\n" + emails.map(e => `${e.email},${new Date(e.timestamp?.toDate() || Date.now()).toLocaleString()}`).join("\n");
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'cns-waitlist.csv';
                  a.click();
                }}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/10 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all"
              >
                <span className="material-symbols-outlined text-sm">download</span> Export CSV
              </button>
            </div>

            <div className="bg-[#111111] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[500px]">
                  <thead>
                    <tr className="bg-black/40 border-b border-white/5">
                      <th className="py-4 px-6 text-white/40 font-bold uppercase tracking-widest text-xs w-2/3">Email Address</th>
                      <th className="py-4 px-6 text-white/40 font-bold uppercase tracking-widest text-xs">Joined Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {emails.length === 0 ? (
                      <tr>
                        <td colSpan="2" className="py-12 text-center text-white/30 font-medium">No waitlisted users yet.</td>
                      </tr>
                    ) : (
                      emails.map((email) => (
                        <tr key={email.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 px-6 text-white font-medium">{email.email}</td>
                          <td className="py-4 px-6 text-white/60 text-sm">
                            {email.timestamp ? new Date(email.timestamp.toDate()).toLocaleString() : 'Just now'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black mb-2">Banner Settings</h2>
            <p className="text-white/50 mb-10">Control the waitlist modal trigger and launch countdown timer.</p>

            {loadingConfig ? (
              <div className="animate-pulse flex gap-4 text-white/50"><span className="material-symbols-outlined animate-spin">progress_activity</span> Loading settings...</div>
            ) : (
              <form onSubmit={handleSaveConfig} className="bg-[#111111] border border-white/5 rounded-3xl p-8 shadow-2xl">
                
                {/* Show Banner Toggle */}
                <div className="flex items-center justify-between mb-10 pb-10 border-b border-white/5">
                  <div>
                    <h3 className="font-bold text-lg mb-1">Waitlist Banner Active</h3>
                    <p className="text-white/50 text-sm">If disabled, the Download buttons will not open the waitlist modal.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={config.showBanner} onChange={(e) => setConfig({...config, showBanner: e.target.checked})} />
                    <div className="w-14 h-7 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary shadow-inner"></div>
                  </label>
                </div>

                {/* Hero Timer Delay */}
                <div className="mb-10 pb-10 border-b border-white/5">
                  <h3 className="font-bold text-lg mb-1">Homepage Download Timer (Seconds)</h3>
                  <p className="text-white/50 text-sm mb-4">How many seconds users wait before the download buttons appear on the homepage.</p>
                  <input 
                    type="number" 
                    min="0"
                    value={config.heroTimerDelay !== undefined ? config.heroTimerDelay : 10}
                    onChange={(e) => setConfig({...config, heroTimerDelay: parseInt(e.target.value) || 0})}
                    className="bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary w-full max-w-sm"
                  />
                </div>

                {/* Target Date */}
                <div className="mb-10">
                  <h3 className="font-bold text-lg mb-1">Launch Date</h3>
                  <p className="text-white/50 text-sm mb-4">Set the target date for the countdown timer inside the waitlist modal.</p>
                  <input 
                    type="date" 
                    value={config.targetDate}
                    onChange={(e) => setConfig({...config, targetDate: e.target.value})}
                    className="bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary w-full max-w-sm"
                  />
                </div>

                {/* Target Time (Optional, simplified to Date for now) */}
                <div className="mb-10">
                  <h3 className="font-bold text-lg mb-1">Launch Time (Optional)</h3>
                  <p className="text-white/50 text-sm mb-4">Time of day for the launch countdown.</p>
                  <input 
                    type="time" 
                    value={config.targetTime || '00:00'}
                    onChange={(e) => setConfig({...config, targetTime: e.target.value})}
                    className="bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary w-full max-w-sm"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={savingConfig}
                  className="bg-primary text-black font-bold px-8 py-3 rounded-xl hover:brightness-110 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {savingConfig ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : <span className="material-symbols-outlined">save</span>}
                  Save Settings
                </button>
              </form>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
