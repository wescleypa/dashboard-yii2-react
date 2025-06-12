import { Avatar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { ThemeToggleButton } from "../Themetoggle.component";
import { Logout } from "@mui/icons-material";
import { useUser } from "../../providers/user.provider";
import styled from "styled-components";

const UserProfile = styled(Box)({
  padding: '15px 20px',
  display: 'flex',
  alignItems: 'center',
  borderTop: '1px solid #e9ecef',
  marginTop: 'auto'
});

export default function DrawerDesktop({
  setPage, page,
  setTheme, theme,
  menus
}) {
  const { user, logout } = useUser();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        '& .MuiDrawer-paper': {
          position: 'fixed',
          width: 240,
          boxSizing: 'border-box',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          border: 'none',
          height: '100dvh',
        },
      }}
    >
      <Box
        sx={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: 'primary.main',
          }}
        >
          Viana Group
        </Typography>

        <ThemeToggleButton
          currentTheme={theme}
          setTheme={setTheme}
          sx={{ ml: 'auto' }}
        />
      </Box>

      <Divider sx={{ ml: 3, mr: 3 }} />

      <List
        sx={{
          p: 1,
          '& .MuiListItem-root': {
            cursor: 'pointer',
            borderRadius: '8px',
            transition: 'background-color 0.3s ease'
          },
        }}
      >
        {menus.map(item => {
          const isPage = (item ? item.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : '') === page?.toLowerCase();
          const currentPage = !!isPage || (!page && item?.id === 0);

          return (
            <ListItem button key={item?.id} sx={{
              mt: 1,
              bgcolor: !!currentPage ? 'secondary.light' : 'transparent',
              '&:hover': {
                bgcolor: !currentPage ? 'secondary.main' : 'secondary.light',
              }
            }} onClick={() => setPage(
              item ? item.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : ''
            )}>
              <ListItemIcon sx={{ color: !!currentPage ? 'primary.main' : 'text.secondary' }}>
                {item?.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: !!currentPage ? 'primary.main' : 'text.secondary',
                      fontFamily: "'Poppins', sans-serif"
                    }}
                  >
                    {item?.name}
                  </Typography>
                }
              />
            </ListItem>
          )
        })}
      </List>

      <UserProfile>
        <Avatar src={user?.avatar_url}>
          {user?.name?.charAt(0)}
        </Avatar>

        <Box ml={2}>
          <Typography
            variant="subtitle2"
            fontWeight="600"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {user?.name || 'Sem nome'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user?.role === 'seller' ? 'Vendedor' : 'Administrador'}
          </Typography>
        </Box>
        <IconButton onClick={() => logout()}>
          <Logout sx={{ width: '20px', color: 'primary.dark' }} />
        </IconButton>
      </UserProfile>
    </Drawer>
  )
}