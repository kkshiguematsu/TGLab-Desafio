import { Button, Grid } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { ButtonBetActionStyled, InputNumberStyled } from './styled';
import { getBetSchema } from '../../../../validations/bet/betSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useBet } from '../../../../hooks/useBet';
import { useSelector } from 'react-redux';
import { selectBalance } from '../../../../store/user/userBalance';
import toast from 'react-hot-toast';

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
    setValue,
    getValues,
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
      toast.success(t('betPage.betSuccess'));
    } catch (err) {
      console.error('Falha no login a partir do componente');
    }
  };

  if (error) toast.error('errors.betError');

  const incrementAmount = () => {
    const currentValue = getValues('amount') || 0;
    const newValue = currentValue + 1;
    setValue('amount', newValue);
  };

  const decrementAmount = () => {
    const currentValue = getValues('amount') || 0;
    let newValue = currentValue - 1;
    newValue = newValue === 0 ? 1 : newValue;

    setValue('amount', newValue);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 3, sm: 2 }}>
          <ButtonBetActionStyled variant="contained" fullWidth onClick={decrementAmount}>
            -
          </ButtonBetActionStyled>
        </Grid>
        <Grid size={{ xs: 6, sm: 8 }}>
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
        <Grid size={{ xs: 3, sm: 2 }}>
          <ButtonBetActionStyled variant="contained" fullWidth onClick={incrementAmount}>
            +
          </ButtonBetActionStyled>
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
