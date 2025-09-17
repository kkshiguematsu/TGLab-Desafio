import { styled } from '@mui/material/styles';

export const GlassFormWrapper = styled('div')(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  padding: 30,
  color: theme.palette.text.primary,
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderRadius: 10,
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
}));

interface GlassPaperProps {
  children: React.ReactNode;
}

export const GlassPaper = ({ children }: GlassPaperProps) => {
  return <GlassFormWrapper>{children}</GlassFormWrapper>;
};
