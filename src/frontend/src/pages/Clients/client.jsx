import * as React from 'react';
import {
  Card, CardHeader, CardMedia,
  IconButton,
  Typography,
  Menu, MenuItem,
} from '@mui/material';
import {
  Delete,
  Edit,
  MoreVert,
} from '@mui/icons-material';

export default function ClientCard({ client, handleAction }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Card sx={{
      width: '100%',
      height: 100,
      borderRadius: 3,
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      transition: 'transform 0.3s, box-shadow 0.3s',
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 6px 24px rgba(0,0,0,0.12)'
      }
    }}>

      {/* Client avatar */}
      <CardMedia
        component="img"
        sx={{
          objectFit: 'contain',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          height: 80,
          width: 80,
        }}
        image={client?.picture || window.location.origin + '/images/image_default.png'}
        alt={client?.name}
      />

      {/* Client actions */}
      <CardHeader
        action={
          <>
            <IconButton onClick={handleMenuClick}>
              <MoreVert sx={{ color: 'text.secondary' }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  handleAction('update', client)
                }}
              >
                <Edit sx={{ width: 18 }} />&nbsp;Editar
              </MenuItem>

              <MenuItem
                onClick={(e) => {
                  setAnchorEl(null);
                  handleAction('delete', {
                    client,
                    event: e?.currentTarget
                  });
                }}
                sx={{ color: 'error.main' }}
              >
                <Delete sx={{ width: 18 }} />&nbsp;Deletar
              </MenuItem>
            </Menu>
          </>
        }
        title={
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: 250
            }}
          >
            {client?.name || 'Cliente sem nome'}
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="text.secondary">
            {client?.email || 'Sem e-mail'}
          </Typography>
        }
        sx={{ pb: 0 }}
      />
    </Card>
  );
}