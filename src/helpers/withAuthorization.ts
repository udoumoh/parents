import { ReactNode, FC, useEffect, Component } from 'react';
import { useAuth } from '@/hooks/AuthContext';
import { useRouter } from 'next/navigation';

interface WithAuthorizationProps {
  children: ReactNode;
}

// Explicitly define the type for WrappedComponent
export const withAuthorization = (WrappedComponent: FC<WithAuthorizationProps>) => {
  return () => {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
      // Redirect to login page if not authenticated
      if (!isAuthenticated) {
        router.push('/signin');
      }
    }, [isAuthenticated, router]);

    // Render the wrapped component for authenticated users
    return isAuthenticated ? WrappedComponent : null;
  };
};
