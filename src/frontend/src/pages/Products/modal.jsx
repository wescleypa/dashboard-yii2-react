import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import ImageUpload from '../../components/imageUpload.component';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 400, sm: 600 },
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function ProductModal({ open, onClose, mode = 'create', product, onSubmit }) {

  const [formData, setFormData] = React.useState({
    picture: null,
    name: null,
    desc: null,
    cost_price: null,
    sale_price: null
  });

  async function onUpload(image) {
    setFormData(prev => ({ ...prev, picture: image }));
  }

  async function handleChange(field, value) {
    if (!value?.trim()?.length) return;
    var formattedValue = value;

    if (field === 'cost_price' || field === 'sale_price') {
      /* Clears value */
      let cleanedValue = value.replace(/[^\d,.]/g, '');

      // Replace comma with dot
      cleanedValue = cleanedValue.replace(',', '.');

      // 9.999,99 → 9999.99
      const parts = cleanedValue.split('.');
      if (parts.length > 2) {
        cleanedValue = parts.slice(0, -1).join('') + '.' + parts.slice(-1);
      }

      // 2 decimal places
      const numericValue = parseFloat(cleanedValue) || 0;
      formattedValue = parseFloat(numericValue.toFixed(2));
    }

    // Update state
    setFormData(prev => ({ ...prev, [field]: formattedValue }));
  }

  async function onSubmitForm(e) {
    e.preventDefault();

    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([_, v]) => v !== null)
    ); // Not nulled fields

    if (Object.keys(filteredData).length === 0) {
      onClose();
    }

    onSubmit(filteredData);
  }

  function handleClose() {
    setFormData({
      picture: null,
      name: null,
      desc: null,
      cost_price: null,
      sale_price: null
    });
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ mb: 3, fontWeight: 700 }}>
          {mode === 'create' ? 'Adicionar Novo Produto' : 'Editar Produto'}
        </Typography>

        <Box
          component="form"
          onSubmit={onSubmitForm}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >

          {/* Image upload */}
          <ImageUpload
            image={formData?.picture || product?.picture || 'http://localhost:3000/images/image_default.png'}
            onUpload={onUpload}
          />

          {/* Name and Categorie */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="Nome do Produto"
              variant="outlined"
              onChange={(e) => handleChange('name', e?.target?.value)}
              defaultValue={product?.name || ''}
              required
            />
          </Box>

          {/* Description */}
          <TextField
            label="Descrição"
            onChange={(e) => handleChange('desc', e?.target?.value)}
            multiline
            rows={3}
            defaultValue={product?.desc || ''}
          />

          {/* Linha 4: Preços */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="Preço de Custo"
              type="text"
              onChange={(e) => handleChange('cost_price', e?.target?.value)}
              slotProps={{
                input: {
                  startAdornment: 'R$'
                }
              }}
              defaultValue={product?.cost_price || ''}
            />

            <TextField
              fullWidth
              label="Preço de Venda"
              type="text"
              onChange={(e) => handleChange('sale_price', e?.target?.value)}
              slotProps={{
                input: {
                  startAdornment: 'R$'
                }
              }}
              defaultValue={product?.sale_price || ''}
              required
            />
          </Box>

          {/* ACTION BUTTONS */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
            <Button variant="outlined" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="contained" type='submit'>
              {mode === 'create' ? 'Criar Produto' : 'Salvar Alterações'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}