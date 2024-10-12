import { GradientWrap } from "@atoms/GradientWrap";
import { AUTHOR } from "@common/config";
import { Box, Typography } from "@mui/material";
import React from "react";



const Footer: React.FC = () => {
  return (
    <GradientWrap p={2} >
      <Typography color='white' align='center' m='auto'>
        Copyright 2024. {AUTHOR.name.toUpperCase()} All rights reserved.
      </Typography>
    </GradientWrap>
  );
};

export default Footer;
