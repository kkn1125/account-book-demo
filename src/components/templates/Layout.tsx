import { Stack } from "@mui/material";
import Footer from "@organisms/Footer";
import Header from "@organisms/Header";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <Stack height='inherit'>
      <Header />
      <Stack height='inherit' flex={1} overflow='auto'>
        <Outlet />
      </Stack>
      <Footer />
    </Stack>
  );
};

export default Layout;
