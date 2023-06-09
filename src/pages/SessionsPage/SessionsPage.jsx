import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function SessionsPage(props) {
    const {setPagina} = props;
    const {idFilme} = useParams();
    const [filme, setFilme] = useState(null);
    setPagina(true);

    useEffect(()=>{
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`);
        promise.then((resposta)=>{
            setFilme(resposta.data);
        });
    },[])

    if(filme === null){
        return(
            <PageContainer>
                <p>Carregando....</p>    
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            Selecione o horário
            <div>
                {filme.days.map((el)=>
                <SessionContainer data-test="movie-day" key={el.id}>
                    {el.weekday} - {el.date}
                    <ButtonsContainer>
                        {el.showtimes.map((sessao)=>
                            <Link data-test="showtime" key={sessao.id} to={`/assentos/${sessao.id}`}>
                                <button>
                                    {sessao.name}
                                </button>
                            </Link>
                        )}
                    </ButtonsContainer>
                </SessionContainer>)}

            </div>

            <FooterContainer data-test="footer" >
                <div>
                    <img src={filme.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{filme.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`