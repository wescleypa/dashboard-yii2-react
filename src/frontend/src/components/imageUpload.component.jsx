import { AddAPhoto } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import React, { useRef } from 'react';

const ImageUpload = ({ image, onUpload }) => {
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      position: 'relative'
    }}>
      <Box sx={{ position: 'relative' }}>
        <Box
          component={'img'}
          src={image}
          sx={{
            width: 150,
            borderRadius: 1,
            objectFit: 'cover',
            display: 'block'
          }}
        />
        <IconButton
          sx={{
            position: 'absolute',
            top: 4,
            right: 4,
            backgroundColor: 'rgba(0,0,0,0.5)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.8)'
            },
            p: 0.5,
            width: 32,
            height: 32
          }}
          onClick={handleUploadClick}
        >
          <AddAPhoto sx={{
            color: 'white',
            fontSize: 18
          }} />
        </IconButton>
      </Box>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
    </Box>
  );
};

export default ImageUpload;