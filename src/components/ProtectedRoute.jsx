import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ProtectedRoute({ children, requireAdmin }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      checkRole(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      checkRole(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkRole = (session) => {
    if (session?.user?.user_metadata?.role === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    setLoading(false);
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px', color: 'var(--primary)' }}>Cargando...</div>;
  }

  if (!session) {
    return <Navigate to="/auth" />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" />; // Redirect non-admins to home
  }

  return children;
}
