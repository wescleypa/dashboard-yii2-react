import { Lock, Person } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

export const EmailField = ({ onUpdate, ...props }) => {
  const [email, setEmail] = useState('');

  return (
    <TextField
      required
      fullWidth
      id="email"
      name="email"
      placeholder="E-mail"
      autoComplete="email"
      value={email}
      onBlur={(e) => onUpdate('email', e.target.value)}
      onChange={(e) => setEmail(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onUpdate(e);
        }
      }}
      {...props}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Person sx={{ color: 'primary.light' }} />
            </InputAdornment>
          ),
          sx: {
            backgroundColor: 'background.paper',
            borderRadius: '0.25rem',
            '& fieldset': {
              border: 'none'
            },
          }
        }
      }}
    />
  );
}

export const PasswordField = ({ onUpdate, ...props }) => {
  const [password, setPassword] = useState('');

  return (
    <TextField
      required
      fullWidth
      id="password"
      name="password"
      type="password"
      placeholder="Senha"
      value={password}
      onBlur={(e) => onUpdate('password', e.target.value)}
      onChange={(e) => setPassword(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onUpdate(e);
        }
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Lock sx={{ color: 'primary.light' }} />
            </InputAdornment>
          ),
          sx: {
            backgroundColor: 'background.paper',
            borderRadius: '0.25rem',
            '& fieldset': {
              border: 'none'
            },
          }
        }
      }}
      {...props}
    />
  );
}