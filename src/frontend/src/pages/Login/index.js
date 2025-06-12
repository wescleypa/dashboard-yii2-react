import { useState } from "react";
import { useToast } from "../../providers/toast.provider";
import { useUser } from "../../providers/user.provider";
import { EmailField, PasswordField } from "./fields";
import { Alert, Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import validateForm from "./validateForm";


export default function LoginPage() {
  const { login } = useUser();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({
      email: '',
      password: ''
    });

    const valid = validateForm(formData);

    if (!!valid?.success) {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);

      await login(formDataToSend)
        .catch(err => {
          console.log('err ', err);
          showToast('error', `Erro ao realizar login: ${err?.message || 'Erro desconhecido'}`);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setErrors(valid?.errors);
    }
  };

  return (
    <Grid container sx={{
      display: 'flex',
      alignItems: 'center',
      height: { xs: '80dvh', sm: '98dvh' }
    }}>
      <Grid size={{ xs: 12, sm: 6 }} sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2
      }}>
        <Typography variant='h6'>
          Bem vindo(a), faça login para começarmos
        </Typography>

        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          width: '100%',
        }}>
          <Alert severity="info">
            <Typography>Usuário de testes SELLER</Typography>
            <b>Usuário:</b> seller@viana.com<br />
            <b>Senha:</b> senha123
          </Alert>
          <Alert severity="error">
            <Typography>Usuário de testes ADMIN</Typography>
            <b>Usuário:</b> admin@viana.com<br />
            <b>Senha:</b> senha123
          </Alert>
        </Box>
      </Grid>

      <Grid size={{ xs: 12, sm: 6 }} sx={{
        display: 'flex',
        flexFlow: 1,
        justifyContent: 'center'
      }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: { xs: '100%', sm: '50%' },
            gap: 2
          }}
        >

          <EmailField
            onUpdate={(e, v) => setFormData(prev => ({ ...prev, [e]: v }))}
            disabled={!!loading}
            helperText={!!errors?.email?.length && (
              <Typography variant='caption' color='error'>{errors.email}</Typography>
            )}
          />
          <PasswordField
            onUpdate={(e, v) => setFormData(prev => ({ ...prev, [e]: v }))}
            disabled={!!loading}
            helperText={!!errors?.password?.length && (
              <Typography variant='caption' color='error'>{errors.password}</Typography>
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!!loading}
            sx={{
              py: 2,
              borderRadius: '0.25rem',
              backgroundColor: 'primary.dark',
              color: '#eee',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              '&:hover': {
                backgroundColor: 'primary.light'
              }
            }}
          >
            {!loading ? 'Acessar' : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CircularProgress size={30} />
                Acessando...
              </Box>
            )}
          </Button>
        </Box>
      </Grid>
    </Grid>

  )
}