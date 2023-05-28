import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import axios from "axios";
import { useState } from "react"
import ResetStyle from "./style/ResetStyle"
import GlobalStyle from "./style/GlobalStyle"

export default function App() {

    axios.defaults.headers.common['Authorization'] = 'PMThHvQBl3Zrj5RT69hxduVc';

    const [comprador, setComprador] = useState({});
    const [filme, setFilme] = useState({});
    const [pagina, setPagina] = useState(false);
    const navigate = useNavigate();
    

    function retorna(){
        navigate(-1);
    }

    return (
        <>
            <ResetStyle/>
            <GlobalStyle/>
                <NavContainer>
                    {pagina&&<ion-icon data-test="go-home-header-btn" onClick={retorna} name="arrow-back-outline"></ion-icon>}
                    CINEFLEX
                </NavContainer>
                
                <Routes>
                    <Route path="/" element={<HomePage setPagina={setPagina}/>}></Route>
                    <Route path="/sessoes/:idFilme" element={<SessionsPage setPagina={setPagina}/>}></Route>
                    <Route path="/assentos/:idSessao" element={<SeatsPage setPagina={setPagina} setComprador={setComprador} setFilme={setFilme}/>}></Route>
                    <Route path="/sucesso" element={<SuccessPage setPagina={setPagina} comprador={comprador} filme={filme}/>}></Route>
                </Routes>
        </>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
    ion-icon{
        color: black;
        position: absolute;
        left: 18px;
    }
`
