import React, { useEffect, useState } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth, googleAuthProvider } from '../lib/firebase';
import { LogIn, LogOut, ShieldCheck, User as UserIcon, Loader2 } from 'lucide-react';

export const GoogleAuthButton: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);

      if (user) {
        // Automatically sync user with Cloud SQL backend
        try {
          const idToken = await user.getIdToken();
          await fetch('/api/auth/sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${idToken}`,
            },
          });
        } catch (err) {
          console.error('Failed to sync authenticated user with backend:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    setError(null);
    setAuthenticating(true);
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const idToken = await result.user.getIdToken();

      // Sync with Cloud SQL backend
      await fetch('/api/auth/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
      });
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      // If popup was closed by user or blocked, provide friendly message
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in popup was closed.');
      } else {
        setError(err.message || 'Failed to sign in with Google');
      }
    } finally {
      setAuthenticating(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsMenuOpen(false);
    } catch (err: any) {
      console.error('Sign-Out Error:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-xs font-medium text-neutral-400 bg-neutral-900/80 px-3 py-1.5 rounded-full border border-neutral-800">
        <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left z-50">
      {currentUser ? (
        <div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 bg-neutral-900/90 hover:bg-neutral-800 border border-emerald-500/40 text-white px-3 py-1.5 rounded-full transition-all cursor-pointer shadow-lg group"
          >
            {currentUser.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt={currentUser.displayName || 'Google User'}
                className="w-6 h-6 rounded-full border border-emerald-400 object-cover"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white">
                {currentUser.displayName ? currentUser.displayName.charAt(0) : 'U'}
              </div>
            )}
            <span className="text-xs font-bold tracking-wide truncate max-w-[120px] sm:max-w-[180px]">
              {currentUser.displayName || currentUser.email}
            </span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          </button>

          {/* User Profile Dropdown */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0C0C0C] border border-neutral-800 shadow-2xl p-4 text-white z-50 space-y-3 animate-fade-in">
              <div className="flex items-center gap-3 pb-3 border-b border-neutral-800">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'Google User'}
                    className="w-10 h-10 rounded-full border border-emerald-400"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-amber-400">
                    <UserIcon className="w-5 h-5" />
                  </div>
                )}
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-white truncate">{currentUser.displayName || 'Verified Member'}</p>
                  <p className="text-[10px] text-neutral-400 truncate">{currentUser.email}</p>
                  <span className="inline-block mt-1 text-[9px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                    Google Verified
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-neutral-400 space-y-1">
                <p><span className="text-neutral-500">UID:</span> <span className="font-mono text-neutral-300 text-[10px]">{currentUser.uid.slice(0, 12)}...</span></p>
                <p><span className="text-neutral-500">Database:</span> <span className="text-emerald-400 font-semibold">Synced to Cloud SQL</span></p>
              </div>

              <button
                onClick={handleSignOut}
                className="w-full py-2 px-3 rounded-xl bg-neutral-900 hover:bg-red-950/60 border border-neutral-800 hover:border-red-500/50 text-neutral-300 hover:text-red-300 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <button
            onClick={handleGoogleSignIn}
            disabled={authenticating}
            className="flex items-center gap-2.5 bg-white hover:bg-neutral-100 text-neutral-900 font-bold px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer shadow-md border border-neutral-300 active:scale-95 disabled:opacity-50"
          >
            {authenticating ? (
              <Loader2 className="w-4 h-4 animate-spin text-neutral-800" />
            ) : (
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>Sign in with Google</span>
          </button>
          {error && <p className="text-[10px] text-rose-400 mt-1 absolute right-0 whitespace-nowrap bg-black/90 px-2 py-0.5 rounded border border-rose-500/40">{error}</p>}
        </div>
      )}
    </div>
  );
};
