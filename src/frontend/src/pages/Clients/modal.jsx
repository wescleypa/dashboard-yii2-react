import * as React from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Tabs, Tab,
  Chip,
  MenuItem,
  Popover,
  InputBase,
  Avatar,
  CircularProgress,
  Collapse
} from '@mui/material';
import { Add, Search as SearchIcon } from '@mui/icons-material';
import ImageUpload from '../../components/imageUpload.component';
import { useToast } from '../../providers/toast.provider';
import { useProduct } from '../../providers/product.provider';


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

export default function ClientModal({ open, onClose, mode = 'create', client, onSubmit }) {
  const { products, getAll } = useProduct();
  const { showToast } = useToast();
  const [formData, setFormData] = React.useState({
    picture: null,
    name: null,
    email: null,
    products: client?.clientProducts || []
  });
  const [tabValue, setTabValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setFormData(prev => ({
      ...prev,
      products: client?.clientProducts || []
    }))
  }, [client])

  const getAllProducts = async () => {
    setLoading(true);
    await getAll()
      .catch(err => {
        showToast('error', `Falha ao buscar produtos: ${err?.message}`);
        setTabValue(1);
        return;
      })
      .finally(() => {
        setLoading(false);
      })
  };

  const handleTabChange = async (event, newValue) => {
    setTabValue(newValue);

    if (newValue === 1 && !products?.length) {
      await getAllProducts();
    }
  };

  const handleAddProductClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSearchTerm('');
  };

  const openB = Boolean(anchorEl);
  const id = openB ? 'add-product-popover' : undefined;

  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !formData.products.some(p =>
      p.id === product.id ||
      p.product?.id === product.id
    )
  );

  const handleAddProduct = async (product) => {
    setFormData(prev => ({
      ...prev,
      products: [...prev?.products, { ...product, new: true }]
    }));

    handlePopoverClose();
  };

  const handleRemoveProduct = async (productID) => { // productID if new else customID
    setFormData(prev => {
      const productToRemove = prev.products.find(p =>
        (p.product?.id === productID) ||  // Para produtos existentes
        (p.id === productID && !p.new) || // Para produtos novos sem marcação
        (p.id === productID && p.new)     // Para produtos novos marcados
      );

      if (!productToRemove) return prev;
      const updatedProducts = prev.products.filter(p =>
        p === productToRemove ? false : true
      );

      return {
        ...prev,
        products: updatedProducts
      };
    });
  };

  async function onUpload(image) {
    setFormData(prev => ({ ...prev, picture: image }));
  }

  async function handleChange(field, value) {
    if (!value?.trim()?.length) return;
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  function isValidEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }

  function validateForm(data) {
    const newErrors = {};
    if (data.email && !isValidEmail(data.email)) {
      newErrors.email = "E-mail inválido";
    }
    return Object.keys(newErrors).length === 0;
  }

  async function onSubmitForm(e) {
    e.preventDefault();
    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([_, v]) => v !== null)
    );

    if (!validateForm(filteredData)) {
      return showToast('error', "E-mail inválido")
    }

    if (Object.keys(filteredData).length === 0) {
      onClose();
    }

    onSubmit(filteredData);
  }

  function handleClose() {
    setFormData({
      picture: null,
      email: null,
      name: null,
      products: []
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
      <Box sx={style}
        component="form"
        onSubmit={onSubmitForm}
      >
        <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ mb: 3, fontWeight: 700 }}>
          {mode === 'create' ? 'Adicionar novo Cliente' : 'Editar Cliente'}
        </Typography>

        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Perfil" />
          <Tab label="Produtos" />
        </Tabs>

        <Collapse in={tabValue === 0}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <ImageUpload
              image={formData?.picture || client?.picture || 'http://localhost:3000/images/image_default.png'}
              onUpload={onUpload}
            />

            <TextField
              fullWidth
              label="Nome do Cliente"
              onChange={(e) => handleChange('name', e?.target?.value)}
              defaultValue={client?.name || ''}
              required
            />

            <TextField
              type="email"
              label="E-mail"
              onChange={(e) => handleChange('email', e?.target?.value)}
              defaultValue={client?.email || ''}
              required
            />
          </Box>
        </Collapse>

        <Collapse in={tabValue === 1}>
          <Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              {formData?.products?.map(cp => (
                <Chip
                  key={cp.id}
                  label={cp?.product?.name || cp?.name}
                  onClick={() => { }}
                  onDelete={() => handleRemoveProduct(cp.id)}
                />
              ))}
            </Box>

            <Button
              variant="outlined"
              startIcon={!!loading ? <CircularProgress size={24} /> : <Add />}
              onClick={handleAddProductClick}
              disabled={!!loading}
            >
              Adicionar Produto
            </Button>

            <Popover
              id={id}
              open={openB}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Box sx={{ p: 2, width: 300 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SearchIcon sx={{ mr: 1 }} />
                  <InputBase
                    placeholder="Pesquisar produto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ flex: 1 }}
                  />
                </Box>

                <Box sx={{ maxHeight: 220, overflow: 'auto' }}>
                  {filteredProducts?.slice(0, 5).map(product => (
                    <MenuItem
                      key={product.id}
                      onClick={() => handleAddProduct(product)}
                    >
                      <Avatar src={product?.picture} sx={{ width: 24, height: 24 }}>
                        {product?.name?.charAt(0)}
                      </Avatar>&nbsp;
                      {product.name}
                    </MenuItem>
                  ))}

                  <Typography variant='caption'>
                    Limitado à 5 registros.
                  </Typography>
                </Box>
              </Box>
            </Popover>
          </Box>
        </Collapse>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
          <Button variant="outlined" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="contained" type='submit'>
            {mode === 'create' ? 'Criar Cliente' : 'Salvar Alterações'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}