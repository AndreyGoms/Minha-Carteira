import React from "react";
import logImg from "../../assets/logo.svg";
import { 
    Container,
    Header,
    LogImg,
    MenuConteiner,
    MenuItemLink,
    Title
 } from "./styles"
 import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExitToApp
} from "react-icons/md"


const Aside : React.FC = () => {
    return (
        <Container>
            <Header>
                <LogImg src={logImg} alt="Logo Minhas Contas" ></LogImg>
                <Title>Minhas Contas</Title>
            </Header>

            <MenuConteiner>
                <MenuItemLink href="/dashboard">
                    <MdDashboard/>
                    Dashboard
                </MenuItemLink>             

                <MenuItemLink href="/list/entry-balance">
                    <MdArrowUpward/>
                    Entradas
                </MenuItemLink>        

                <MenuItemLink href="/list/exit-balance">
                    <MdArrowDownward/>
                    Saidas
                </MenuItemLink>         
                       
                <MenuItemLink href="#">
                    <MdExitToApp/>
                    Sair
                </MenuItemLink>                
            </MenuConteiner>
        </Container>
    );
}

export default Aside;