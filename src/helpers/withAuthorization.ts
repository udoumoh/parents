import { ReactNode, FC } from 'react';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/AuthContext';
import { useRouter } from 'next/navigation';

interface WithAuthorizationProps {
  children: ReactNode;
}

export const withAuthorization = (WrappedComponent: FC<WithAuthorizationProps>) => {
  return ({...props}: WithAuthorizationProps) => {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
      // Redirect to login page if not authenticated
      if (!isAuthenticated) {
        router.push('/signin');
      }
    }, [isAuthenticated, router]);

    // Render the wrapped component for authenticated users
    return (
      isAuthenticated ? WrappedComponent : null
    )
  };
};
