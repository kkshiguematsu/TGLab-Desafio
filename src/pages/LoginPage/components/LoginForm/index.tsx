import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { useForm, Controller } from 'react-hook-form';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { getLoginSchema } from '../../../../validations/loginSchema';
import { yupResolver } from '@hookform/resolvers/yup';

type LoginFormInputs = {
  email: string;
  password: string;
};

interface LoginFormProps {
  onOpenRegister: () => void;
}

export const LoginForm = ({ onOpenRegister }: LoginFormProps) => {
  const { t } = useTranslation();
  const { login, isLoading, error: authError } = useAuth();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(getLoginSchema(t)),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data);
      navigate('/bet');
    } catch (err) {
      console.error('Falha no login a partir do componente');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant="h4" component="h2" textAlign="center">
            Login
          </Typography>
        </Grid>

        <Grid size={12}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="E-mail"
                variant="outlined"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </Grid>

        <Grid size={12}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Senha"
                type="password"
                variant="outlined"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
        </Grid>

        <Grid container size={12}>
          <Grid size={{ xs: 12, sm: 6 }} textAlign="left">
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
              loading={isLoading}
            >
              Login
            </Button>
            {authError && (
              <Typography color="error" sx={{ mt: 1 }}>
                {authError}
              </Typography>
            )}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} textAlign="left">
            <Button variant="outlined" fullWidth onClick={onOpenRegister} disabled={isLoading}>
              Cadastrar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
