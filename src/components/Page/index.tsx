import { Box } from '@mui/material';
import { ContentPage, MainBox } from './styled';
import type { ReactNode } from 'react';

interface PageProps {
  backgroundImage?: string;
  alignItems?: string;
  justifyContent?: string;
  children: ReactNode;
}

export const Page = ({ children, backgroundImage, alignItems, justifyContent }: PageProps) => {
  return (
    <MainBox
      backgroundImage={backgroundImage}
      alignItems={alignItems}
      justifyContent={justifyContent}
    >
      <ContentPage>{children}</ContentPage>
    </MainBox>
  );
};
