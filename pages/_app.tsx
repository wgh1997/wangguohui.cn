import React from "react";
import type { AppProps } from "next/app";
import { Session } from "next-auth";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { useThemeContext } from "@/utils/useThemeContext";
import { themeLight, themeDark } from "@/styles/theme";
import { GlobalStyles } from "@/styles/global";
import { ThemeProvider } from "@emotion/react";
import Header from "@/components/Header";
import useGtag from "@/utils/useGtag";
import store from "../store/index";

const App = ({ Component, pageProps }: AppProps<{ session: Session }>) => {
  useGtag(); // Analytics
  const [theme, toggleTheme] = useThemeContext();
  const themeMode = theme === "light" ? themeLight : themeDark;

  return (
    <Provider store={store}>
      <React.StrictMode>
        <SessionProvider session={pageProps.session}>
          <GlobalStyles />
          <ThemeProvider theme={themeMode}>
            <Header toggleTheme={toggleTheme} />
            <Component {...pageProps} />
          </ThemeProvider>
        </SessionProvider>
      </React.StrictMode>
    </Provider>
  );
};

export default App;
