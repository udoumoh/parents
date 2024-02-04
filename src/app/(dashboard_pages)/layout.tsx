import React, { ReactNode } from 'react';
import MainNav from '@/components/navigation/mainNav';

interface layoutProps {
  children: ReactNode;
}

const layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <MainNav>
        {/* Your layout content */}
        {children}
    </MainNav>
  );
};

export default layout;