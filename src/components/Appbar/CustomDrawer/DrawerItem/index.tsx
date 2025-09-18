import { DrawerItemStyled } from './styled';

interface DrawerItemProps {
  text: string;
  navigate: () => void;
}

export const DrawerItem = ({ text, navigate }: DrawerItemProps) => {
  return <DrawerItemStyled onClick={navigate}>{text}</DrawerItemStyled>;
};
