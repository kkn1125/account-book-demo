import { createTheme, ThemeProvider } from "@mui/material";
import Router from "@routes/Router.tsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          variants: [
            {
              props: { variant: "contained", color: "primary" },
              style: {
                background:
                  "linear-gradient(310deg, rgba(239,112,155,1) 0%, rgba(250,147,114,1) 100%)",
              },
            },
          ],
        },
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <RecoilRoot>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </RecoilRoot>
  </ThemeProvider>
);
