import { Button, Grid } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { InputNumberStyled } from './styled';
import { CoinType } from '../CoinType';
import { getBetSchema } from '../../../../validations/bet/betSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useBet } from '../../../../hooks/useBet';
import { DisplayTextStyled } from '../CoinType/styled';
import { useSelector } from 'react-redux';
import { selectBalance } from '../../../../store/user/userBalance';

type BetFormInputs = {
  amount: number;
};

export const BetForm = () => {
  const { t } = useTranslation();
  const { betTrigger, isMutating, error } = useBet();
  const balance = useSelector(selectBalance);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BetFormInputs>({
    resolver: yupResolver(getBetSchema(t)),
    defaultValues: {
      amount: 0,
    },
    context: {
      balance: balance,
    },
  });

  const onSubmit = async (data: BetFormInputs) => {
    try {
      await betTrigger(data.amount);
    } catch (err) {
      console.error('Falha no login a partir do componente');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 3, sm: 2 }}>
          <CoinType />
        </Grid>
        <Grid size={{ xs: 9, sm: 6 }}>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <InputNumberStyled
                {...field}
                label={t('betPage.label')}
                type="number"
                variant="outlined"
                fullWidth
                error={!!errors.amount}
                helperText={errors.amount?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <DisplayTextStyled>{`${t('betPage.coinBalance')} ${balance}`}</DisplayTextStyled>
        </Grid>
        <Grid size={12}>
          <Button type="submit" variant="contained" fullWidth loading={isMutating}>
            {t('betPage.button')}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
