import React from "react";
import { ThemeProvider } from 'styled-components'
import GlobalStyles from "./styles/GlobalStyles";
import dark from './styles/themes/dark'
import light from './styles/themes/light'
import Layout from "./Components/Layout";


const App : React.FC = () => {
    return (
        <ThemeProvider theme={light}>
            <GlobalStyles/>
            <Layout/>
        </ThemeProvider>
    );
}

export default App;