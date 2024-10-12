import { GradientWrap } from "@atoms/GradientWrap";
import { BRAND_NAME } from "@common/config";
import useAccountBook from "@hooks/useAccountBook";
import { Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const { managerState, update } = useAccountBook();
  return (
    <GradientWrap
      direction='row'
      alignItems='center'
      p={2}
      gap={2}
      sx={{
        boxShadow: "0 0px 5px 5px #12121226,0 1px 2px 2px #56565626",
      }}>
      <Typography
        component={Link}
        to='/'
        fontWeight={700}
        color='white'
        sx={{ textDecoration: "none", textTransform: "uppercase" }}>
        {BRAND_NAME.replace("-", " ")}
      </Typography>
      <Button
        size='small'
        variant='text'
        color='inherit'
        sx={{ lineHeight: 1 }}
        onClick={() => {
          managerState.save();
          update();
        }}>
        save
      </Button>
      <Button
        size='small'
        variant='text'
        color='inherit'
        sx={{ lineHeight: 1 }}
        onClick={() => {
          const manager = managerState.load();
          if (manager) {
            update(manager);
          }
        }}>
        load
      </Button>
    </GradientWrap>
  );
};

export default Header;
