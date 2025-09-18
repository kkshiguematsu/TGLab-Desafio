import { useTranslation } from 'react-i18next';
import { GlassPaper } from '../../components/GlassPaper';
import { Page } from '../../components/Page';
import { TitleHeader } from '../../components/TitleHeader';
import { TableListMyTransactions } from './components/TableListMyTransactions';

export const MyTransactionsPage = () => {
  const { t } = useTranslation();

  return (
    <Page alignItems="center" justifyContent="center">
      <GlassPaper>
        <TitleHeader text={t('myTransactionssPage.title')} />
        <TableListMyTransactions />
      </GlassPaper>
    </Page>
  );
};
