import { useTranslation } from 'react-i18next';
import { GlassPaper } from '../../components/GlassPaper';
import { Page } from '../../components/Page';
import { TitleHeader } from '../../components/TitleHeader';
import { TableListMyBets } from './components/TableListMyBets';

export const MyBetsPage = () => {
  const { t } = useTranslation();

  return (
    <Page alignItems="center" justifyContent="center">
      <GlassPaper>
        <TitleHeader text={t('myBetsPage.title')} />
        <TableListMyBets />
      </GlassPaper>
    </Page>
  );
};
