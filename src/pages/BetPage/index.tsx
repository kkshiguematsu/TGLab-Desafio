import { Page } from '../../components/Page';
import { GlassPaper } from '../../components/GlassPaper';
import { TitleHeader } from '../../components/TitleHeader';
import { useTranslation } from 'react-i18next';
import { BetForm } from './components/BetForm';

export const BetPage = () => {
  const { t } = useTranslation();

  return (
    <Page alignItems="center" justifyContent="center">
      <GlassPaper>
        <TitleHeader text={t('betPage.title')} />
        <BetForm />
      </GlassPaper>
    </Page>
  );
};
