import { Typography } from '@mui/material';
import { TitleHeaderStyled } from './styled';

interface TitleHeaderProps {
  text: string;
}

export const TitleHeader = ({ text }: TitleHeaderProps) => {
  return (
    <TitleHeaderStyled variant="h3" textAlign="center">
      {text}
    </TitleHeaderStyled>
  );
};
