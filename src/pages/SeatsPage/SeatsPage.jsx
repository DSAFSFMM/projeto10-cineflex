import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"

export default function SeatsPage() {

    const {idSessao} = useParams();
    const [assentos, setAssentos] = useState(null);
    const [selecionados, setSelecionados] = useState([]);
    const [name,setName] = useState("");
    const [cpf, setCpf] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`);
        promisse.then((resposta)=>{setAssentos(resposta.data.seats)});
        promisse.catch((erro)=>console.log(erro));
    }, []);

    if (assentos === null) {
        return(
            <PageContainer>
                <p>
                    Carregando Assentos ....
                </p>
            </PageContainer>
        );
    }

    function selecionaAssento(id,estado){
        if(!estado){
            if (selecionados.includes(id)) {
                setSelecionados(selecionados.filter((item)=>item !== id));
                console.log(selecionados.filter((item)=>item !== id));
            }else{
                setSelecionados([...selecionados, id]);
                console.log([...selecionados, id]);
            }
        }else{
            alert("Esse assento não está disponível");
        }
    }

    function reservaAssentos(event) {
        event.preventDefault();
        const objeto = {ids: selecionados, name: name, cpf: cpf};
        const post = axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", objeto);
        post.then(()=>navigate("/sucesso"));
        post.catch((erro)=>console.log(erro));
    }


    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {assentos.map((el)=><SeatItem key={el.id} selecionado={selecionados.includes(el.id)} estado={el.isAvailable} onClick={()=>selecionaAssento(el.id, el.isAvailable)}>{el.name}</SeatItem>)}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle tipo={"selecionado"}/>
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle tipo={"disponivel"}/>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle tipo={"indisponivel"}/>
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer onSubmit={reservaAssentos}>
                <label htmlFor="nome">Nome do Comprador:</label>
                <input id="nome" placeholder="Digite seu nome..." value={name} onChange={(el)=>setName(el.target.value)} required/>

                <label htmlFor="cpf">CPF do Comprador:</label>
                <input id="cpf" placeholder="Digite seu CPF..." value={cpf} onChange={(el)=>setCpf(el.target.value)} required/>

                <button type="submit">Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={"https://br.web.img2.acsta.net/pictures/22/05/16/17/59/5165498.jpg"} alt="poster" />
                </div>
                <div>
                    <p>Tudo em todo lugar ao mesmo tempo</p>
                    <p>Sexta - 14h00</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${(props)=>{
        switch (props.tipo) {
            case "selelecionado":
                return "#0E7D71";
            case "disponivel":
                return "#7B8B99";
                break;
            case "indisponivel":
                return "#F7C52B";
                break;
            default:
                break;
        }
    }};         // Essa cor deve mudar
    background-color: ${(props)=>{
        switch (props.tipo) {
            case "selecionado":
                return "#1AAE9E";
            case "disponivel":
                return "#C3CFD9";
            case "indisponivel":
                return "#FBE192";
            default:
                break;
        }
    }};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid ${(props)=> props.estado?"#F7C52B":"#7B8B99"} ;         // Essa cor deve mudar
    background-color: ${(props)=> props.estado?"#FBE192":"#C3CFD9"};    // Essa cor deve mudar
    border: 1px solid ${(props)=> props.selecionado?"#0E7D71":""} ;
    background-color: ${(props)=> props.selecionado?"#1AAE9E":""}; 
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
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