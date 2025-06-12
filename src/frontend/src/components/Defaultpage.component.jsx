import React from 'react';
import { Box, Typography } from '@mui/material';

const DefaultPageComponent = ({ title, action, children }) => {
  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontFamily: "inherit",
            letterSpacing: '-.5px',
            color: 'text.secondary'
          }}
          gutterBottom
        >
          {title || 'Welcome to the Default Page'}
        </Typography>
        {action && action}
      </Box>


      {children}
    </div>
  );
};

export default DefaultPageComponent;