import { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction
} from "@mui/material";

export default function DrawerMobile({ setPage, menus }) {
  const [tab, setTab] = useState(0);

  return (
    <BottomNavigation
      showLabels
      value={tab}
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100vw'
      }}
      onChange={(event, newValue) => {
        setTab(newValue);
        setPage(menus[newValue]?.name?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
      }}
    >
      {menus.map(item => (
        <BottomNavigationAction key={item.id} label={item.name} icon={item.icon} />
      ))}
    </BottomNavigation>
  )
}