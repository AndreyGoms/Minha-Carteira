import React, { useMemo } from "react";
import emojis from "../../utils/emojis";         
import Toggle from "../Toggle/index"
import { Container,
         Profile,
         Welcome,
         UserName
         } from "./styles"

const MainHeader : React.FC = () => {

    const emoji = useMemo(() => {
        const indice = Math.floor(Math.random() * emojis.length)
        return emojis[indice]
    },[]);

    return (
        <Container>
            <Toggle/>
            <Profile>
                <Welcome>Olá, {emoji} </Welcome>
                <UserName>Andrey Gomes</UserName>
            </Profile>
        </Container>
    );
}

export default MainHeader;