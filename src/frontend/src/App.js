import React from 'react';

/* THEMES */
import lightTheme from './themes/light.theme';
import darkTheme from './themes/dark.theme';
/* COMPONENTS */
import DrawerComponent from './components/Drawer';
import { useMediaQuery, Box, CssBaseline } from '@mui/material';
import { ThemeProvider, styled } from '@mui/material/styles';
/* PAGES */
import Pages from './Pages';
/* PROVIDERS */
import { ToastProvider } from './providers/toast.provider';
import { UserProvider } from './providers/user.provider';
import { ClientProvider } from './providers/client.provider';
import { ProductProvider } from './providers/product.provider';
import { ReportsProvider } from './providers/reports.provider';
import { useUser } from './providers/user.provider';


function AppContent() {
  const { isAuthenticated } = useUser();                          // User is authenticated ?
  const [customTheme, setTheme] = React.useState('light');        // State to manage theme
  const [page, setPage] = React.useState(null);                   // State to manage current page
  const theme = customTheme === 'light' ? lightTheme : darkTheme; // Use custom theme
  const isMobile = useMediaQuery('(max-width: 720px)');           // Custom Device

  // Default spacing content for Drawer
  const Content = styled(Box)({
    flex: 1,
    padding: !!isAuthenticated && !isMobile ? 20 : 10,
    marginLeft: !!isAuthenticated && !isMobile ? 250 : 0,
    width: !!isAuthenticated && !isMobile ? 'calc(100% - 250px)' : '100%',
    paddingBottom: !!isMobile ? 100 : 10,
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Apply global styles without cache */}

      {/* Main content area */}
      <Content>
        {/* List dynamic pages */}
        <Pages page={page} setPage={setPage} />
      </Content>

      {/* Drawer navigator */}
      {!!isAuthenticated && (
        <DrawerComponent
          page={page}
          setPage={setPage}
          theme={customTheme}
          setTheme={setTheme}
          isMobile={!!isMobile}
        />
      )}
    </ThemeProvider>
  );
}


// Index aplication component
function App() {
  return (
    <ToastProvider>
      <UserProvider>
        <ClientProvider>
          <ProductProvider>
            <ReportsProvider>
              <AppContent />
            </ReportsProvider>
          </ProductProvider>
        </ClientProvider>
      </UserProvider>
    </ToastProvider>
  );
}

export default App;
