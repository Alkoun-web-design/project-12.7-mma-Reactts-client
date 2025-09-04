import React, { useState, useEffect, useContext } from 'react';
import { Outlet, useLocation, Link, redirect } from 'react-router-dom';
import Sidebar from './Sidebar';
import { ClassesScheduleSidebar } from './ClassesScheduleSidebar';
import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// import { SearchProvider } from './Search/SearchContext';
// import { SearchDialog, SearchButton } from './Search/SearchDialog';
// import { SearchDialog2 } from './Search/SearchDialog2';
// import { SearchKeyboardShortcut } from './Search/SearchKeyboardShortcut';
import { UserContext } from '../context/userContext';
import Footer from './Footer';
import { serverAPI } from './Utilities';

export default function Layout () {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const [showSignIn, setShowSignIn] = useState(false);
  const [signInForm, setSignInForm] = useState({ email: '', password: '' });
  const [signInError, setSignInError] = useState('');
  const [signInSuccess, setSignInSuccess] = useState('');
  const [signingIn, setSigningIn] = useState(false);
  const user =  useContext(UserContext);



  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSigningIn(true);
    setSignInError('');
    
    if (!signInForm.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setSignInError('Please enter a valid email.');
      setSigningIn(false);
      return;
    }
    
    if (!signInForm.password || signInForm.password.length < 6) {
      setSignInError('Password must be at least 8 characters.');
      setSigningIn(false);
      return;
    }
    
    try {
      const res = await fetch(`${serverAPI}auth/sign-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(signInForm),
      });
            
      const data = await res.json();
            
      if (res.status !== 200) {
        setSignInError(data.message || 'Sign in failed.');
        user?.setUser(null);
      } else {
        setShowSignIn(false);
        setSignInForm({ email: '', password: ''});
        user?.setUser(data);
        setSignInSuccess(data.message || 'Signed in successfully.')
        // if (auth && auth.refreshAuth) auth.refreshAuth();
      }
    } catch (error) {
      console.error('Login error:', error);
      setSignInError('Server error.');
    } finally {
      setSigningIn(false);
      setSignInSuccess('');
      setSignInError('');
    }
  };

  const handleSignOut = async () => {
    await fetch(`${serverAPI}auth/sign-out`, { method: 'POST', credentials: 'include' });
    // if (auth && auth.refreshAuth) auth.refreshAuth();
    user?.setUser(null);
    redirect('/');
  };

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [location]);

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (sidebarOpen && !target.closest('#sidebar') && !target.closest('#sidebar-toggle')) {
        setSidebarOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen]);

  return (
    <>
    {/* <SearchProvider> */}
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar for larger screens */}
        <div className="text-sm hidden lg:block w-64 flex-shrink-0">
          <Sidebar />
        </div>
        
        {/* Mobile sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="text-sm fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
              />
              <motion.div
                id="sidebar"
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="fixed top-0 left-0 h-screen w-64 z-30 lg:hidden"
              >
                <Sidebar />
              </motion.div>
            </>
          )}
        </AnimatePresence>
        
        {/* Main content */}
        <div className="flex-1">
          <header className="text-sm sticky top-0 bg-white z-10 shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 lg:py-4">
              <button 
                id="sidebar-toggle"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-800 lg:hidden"
              >
                <Menu size={24} />
              </button>
              <div className="lg:hidden text-primary-600 font-semibold">Mind Muscles Academy</div>
              <div className="hidden lg:block"></div> {/* Spacer */}
              <div className="flex items-center gap-4">
                {/* <SearchButton /> */}
                {user?.user?.userType ? (
                  <>
                    {user?.user?.userType === 'admin' && (
                      <Link to="/admin-dashboard" className="btn btn-primary">Admin Dashboard</Link>
                    )}
                    {user?.user?.userType === 'tutor' && (
                      <Link to="/tutor-dashboard" className="btn btn-primary">Tutor Dashboard</Link>
                    )}
                    {user?.user?.userType === 'counsellor' && (
                      <Link to="/counsellor-dashboard" className="btn btn-primary">Counsellor Dashboard</Link>
                    )}
                    <button onClick={handleSignOut} className="btn btn-secondary">Logout</button>
                  </>
                ) : (
                  <button onClick={() => setShowSignIn(true)} className="btn btn-primary">Sign In</button>
                )}
              </div>
            </div>
          </header>
          {/* Sign In Dialog */}
          {showSignIn && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm relative">
                <button onClick={() => setShowSignIn(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">&times;</button>
                <h2 className="text-xl font-bold mb-4 text-primary-700">Sign In</h2>
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input type="email" className="form-input w-full" value={signInForm.email} onChange={e => setSignInForm(f => ({ ...f, email: e.target.value }))} required />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Password</label>
                    <input type="password" className="form-input w-full" value={signInForm.password} onChange={e => setSignInForm(f => ({ ...f, password: e.target.value }))} required minLength={6} />
                  </div>
                  {signInError ? <div className="text-red-600 text-sm">{signInError}</div> : <div className="text-green-600 text-sm">{signInSuccess}</div>}
                  <button type="submit" className="btn btn-primary w-full" disabled={signingIn}>{signingIn ? 'Signing In...' : 'Sign In'}</button>
                </form>
              </div>
            </div>
          )}
          
          <main className="px-2 py-2 lg:px-4 lg:py-4">
            <Outlet />
          </main>
          <Footer />
          
        </div>
        <div className="hidden lg:block w-64 flex-shrink-0">
          <ClassesScheduleSidebar />
        </div>
      </div>
    </>
    // </SearchProvider>
  )
}