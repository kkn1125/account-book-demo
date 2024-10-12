import useAccountBook from "@hooks/useAccountBook";
import { Stack } from "@mui/material";
import Footer from "@organisms/Footer";
import Header from "@organisms/Header";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  const { load, update } = useAccountBook();

  useEffect(() => {
    update(load());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
