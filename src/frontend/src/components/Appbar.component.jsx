import React from 'react';
import {
  Box,
  Button,
  Menu,
  Paper,
  styled,
  Typography,
  useMediaQuery,
} from '@mui/material';

const TopBar = styled(Paper)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '30px',
  padding: '15px 20px',
  borderRadius: '10px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  height: 70,
});

const Appbar = ({ title, action }) => {
  const isMobile = useMediaQuery('(max-width: 720px)');
  const [menuMobile, setMenuMobile] = React.useState(null);

  return (<>
    <TopBar>
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
        {title}
      </Typography>

      {!isMobile && (
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          width: '100%',
          justifyContent: 'end'
        }}>
          {action && action}
        </Box>
      )}

      {!!isMobile && (
        <Box>
          <Button
            id="basic-button"
            aria-controls={!!menuMobile ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={!!menuMobile ? 'true' : undefined}
            onClick={(e) => setMenuMobile(e?.currentTarget)}
          >
            Menu
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={menuMobile}
            open={!!menuMobile}
            onClose={() => setMenuMobile(null)}
          >
            {action?.props?.children?.map(i => (
              <Box sx={{ m: 3 }}>
                {i}
              </Box>
            ))}
          </Menu>
        </Box>
      )}

    </TopBar>
  </>);
};

export default Appbar;