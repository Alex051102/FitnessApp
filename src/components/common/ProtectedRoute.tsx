// components/ProtectedRoute/ProtectedRoute.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
        
        if (!session) {
          navigate('/auth');
        }
      } catch (error) {
        console.error('Ошибка проверки авторизации:', error);
        navigate('/auth');
      }
    };

    checkAuth();

 
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session);
        if (!session) {
          navigate('/auth');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }


  return isAuthenticated ? children : null;
}