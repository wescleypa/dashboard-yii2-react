import * as React from 'react';
import {
  Card, CardHeader, CardMedia, CardContent,
  IconButton,
  Typography,
  Menu, MenuItem,
  Box,
  Rating,
  Chip,
} from '@mui/material';
import {
  Delete,
  Edit,
  ToggleOff,
  MoreVert,
  ToggleOn
} from '@mui/icons-material';

function formatPrice(value) {
  value = value?.toString();
  if (!value?.trim()?.length) return;
  return Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

export default function ProductCard({ product, handleAction }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Card sx={{
      width: '100%',
      borderRadius: 3,
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 6px 24px rgba(0,0,0,0.12)'
      }
    }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height={180}
          sx={{
            objectFit: 'contain',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12
          }}
          image={product?.picture || window.location.origin + '/images/image_default.png'}
          alt="Product"
        />
    
        {/* Product disabled */}
        {!parseInt(product?.active) && (
          <Chip
            label="Desativado"
            color="error"
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              fontWeight: 'bold'
            }}
          />
        )}
      </Box>

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
                  handleAction('update', product)
                }}
              >
                <Edit sx={{ width: 18 }} />&nbsp;Editar
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  setAnchorEl(null);
                  handleAction('inactive', {
                    product,
                    event: e?.currentTarget
                  });
                }}
                sx={{ color: !!parseInt(product?.active) ? 'warning.light' : 'success.light' }}
              >
                {!!parseInt(product?.active) ? (<>
                  <ToggleOff sx={{ width: 18 }} />&nbsp;Inativar
                </>) : (<>
                  <ToggleOn sx={{ width: 18 }} />&nbsp;Reativar
                </>)}
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  setAnchorEl(null);
                  handleAction('delete', {
                    product,
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
              maxWidth: 280
            }}
          >
            {product?.name || 'Produto sem nome'}
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="text.secondary">
            {product?.desc || 'Sem descricao'}
          </Typography>
        }
        sx={{ pb: 0 }}
      />

      <CardContent sx={{ pt: 1 }}>
        {/*  Product rate (not developed) */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={4.5} precision={0.5} readOnly />
          <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
            (128 avaliações)
          </Typography>
        </Box>

        {/* Product price */}
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
            {formatPrice(product?.sale_price)}
          </Typography>

          {/* Product cost */}
          {!!product?.cost_price && (
            <Typography variant="body2" color="text.secondary">
              {formatPrice(product?.cost_price)}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}