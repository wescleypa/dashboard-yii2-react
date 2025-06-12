import { GridView, Group, ReceiptLong, Storefront } from "@mui/icons-material";
import DrawerMobile from "./mobile.drawer";
import DrawerDesktop from "./desktop.drawer";

export default function DrawerComponent({
  page, setPage,
  setTheme, theme,
  isMobile
}) {
  const menus = [
    {
      id: 0,
      name: 'Dashboard',
      icon: <GridView />
    },
    {
      id: 1,
      name: 'Relatórios',
      icon: <ReceiptLong />
    },
    {
      id: 2,
      name: 'Clientes',
      icon: <Group />
    },
    {
      id: 3,
      name: 'Produtos',
      icon: <Storefront />
    }
  ];

  return (<>

    {!!isMobile ? (
      <DrawerMobile setPage={setPage} menus={menus} />
    ) : (
      <DrawerDesktop
        setPage={setPage} page={page}
        setTheme={setTheme} theme={theme}
        menus={menus}
      />
    )}

  </>)
}