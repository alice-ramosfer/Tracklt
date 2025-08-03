import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import imgPerfil from "../img/imgPerfil.png"
import '@fontsource/playball';
import '@fontsource/lexend-deca';
import { Button } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CheckIcon from '@mui/icons-material/Check';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { PulseLoader   } from "react-spinners";   



export default function Hoje(){
    dayjs.locale('pt-br');
    const [loading,setLoading] = useState(false)
    const [user, setUser]=useContext(UserContext)
    const navigate = useNavigate()
    const [listaHab, setListaHab] = useState(null)
    

    const config = {
            headers:{
                Authorization:`Bearer ${user.token}`
            }
        }
    
    useEffect( () => {if (user === null){
        navigate("/")
    }}, [])

    useEffect(() => {
        setLoading(true)
        const URL ="https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today "
      
        axios.get(URL,config)
            .then(res => {
                setListaHab(res.data)
                setLoading(false)
            })
            .catch(err=> {
                console.log(err.response)
                setLoading(false)
            })
        
    }, [])

    function CheckTarefa (done, id){
        const body = {}
        if (done){
            const URL =`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`
      
            axios.post(URL,body,config)
                .then(res => {
                    setListaHab(res.data)
                })
                .catch(err=> console.log(err.response))
        }
        else
        {
            const URL =`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`
      
            axios.post(URL,body,config)
                .then(res => {
                    setListaHab(res.data)
                })
                .catch(err=> console.log(err.response))
        }

        const URL ="https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today "
      
        axios.get(URL,config)
            .then(res => {
                setListaHab(res.data)
            })
            .catch(err=> {
                console.log(err.response)
            })
    }
    return(
        <>
            <Container>
                <Topo>
                    <span>TrackIt</span>
                    <ImgUsuario><img src={user.image} alt="perfil" /></ImgUsuario>
                </Topo>
                <Conteudo>
                    <DiaHoje>{(dayjs().format('dddd').replace("-feira", "")).charAt(0).toUpperCase() + (dayjs().format('dddd').replace("-feira", "")).slice(1)}, {dayjs().format('DD/MM')}</DiaHoje>

                    {loading && <PulseLoader color="#126BA5" />}

                    {!loading &&
                        <>
                            {!listaHab &&        
                                <NenhumHabito>
                                    <span>Você não tem nenhum hábito cadastrado ainda. Cadastre na aba Habitos</span>
                                </NenhumHabito>}
                            {listaHab &&
                                <>
                                {listaHab.map((habHoje) => (
                                <HabitosHoje key={habHoje.id}>
                                    <TextoHabito>
                                        <TituloHabito>{habHoje.name}</TituloHabito>
                                        <SequenciaHabito>
                                            <span>Sequência Atual: {habHoje.currentSequence}</span>
                                            <span>Seu recorde: {habHoje.highestSequence}</span>
                                        </SequenciaHabito>
                                    </TextoHabito>
                                    <CustomButton variant="contained" onClick={() => CheckTarefa(habHoje.done, habHoje.id)} fundo={habHoje.done ? "#8FC549" : "#E7E7E7" }><CheckIcon sx={{ fontSize: 40 }}/></CustomButton>
                                </HabitosHoje>
                                ))}
                                </>
                            }
                        </>
                    }

                </Conteudo>
                <Menu>
                    <Botao sx={{ borderRadius: 0 }} component={Link} to="/habitos" variant="contained" startIcon={<CalendarMonthIcon/>} >Habitos</Botao>
                    <Botao sx={{ borderRadius: 0 }} component={Link} to="/hoje" variant="contained" startIcon={<EventAvailableIcon />}>Hoje</Botao>
                </Menu>
            </Container>
        
        
        </>
    )
}

const Container=styled.div`
    background:#e5e5e5;
    max-width:800px; 
    min-height:100vh;
    margin: auto;
    display:flex;
    align-items:center;
    flex-direction:column;
    position:relative;
`
const Topo = styled.header`
    background:#126BA5;
    width:100%;
    max-width:800px;
    height:70px;
    display:flex;
    position:fixed;
    justify-content:space-between;
    z-index:2;
    top:0;

 
    span{
        position:relative;
        top:10px;
        width: 97px;
        height: 49px;
        left: 18px;
        color:#FFFFFF;
        font-family: 'Playball';
        font-weight: 400;
        font-size: 38.98px;
        line-height: 100%;
        letter-spacing: 0%;
    }
    
    
`

const ImgUsuario = styled.div`
    position:relative;
    top:10px;
    left:10px;
    width: 51px;
    height: 51px;
    border-radius: 98.5px;
    overflow: hidden;
    margin-right:18px;
    img{
        width: 51px;
        height: 51px;
    }

`
const Conteudo=styled.nav`
    width:90%;
    position:relative;
    top:65px;
    display:flex;
    justify-content:center;
    flex-direction:column;
    gap:13px;
    margin-bottom:150px;
    overflow-y:true;

`
const NenhumHabito =styled.div`
    height: 74px;
    font-family: Lexend Deca;
    font-weight: 400;
    font-size: 17.98px;
    color:#666666;
    margin-top:28px;

`

const DiaHoje= styled.span`
    margin-top:10px;
    font-family: Lexend Deca;
    font-weight: 400;
    font-size: 22.98px;
    color:#126BA5;  

`

const HabitosHoje=styled.div`
    height: 94px;
    background: #ffff;
    display:flex;
    position:relative;
    justify-content:space-between;
    flex-direction:row;
    gap:10px;
    border-radius:5px;

`
const TextoHabito=styled.div`
    width:80%;
    display:flex;
    position:relative;
    flex-direction:column;
    gap:7px;
    margin-left:15px;
    

`
const TituloHabito =styled.span`
    width: 208px;
    height: 25px;
    font-family: Lexend Deca;
    font-weight: 400;
    font-size: 19.98px;
    line-height: 100%;
    letter-spacing: 0%;
    margin-top:13px;

`
const SequenciaHabito =styled.div`
    display:flex;
    position:relative;
    flex-direction:column;
    width: 146px;
    height: 32px;
    font-family: Lexend Deca;
    font-weight: 400;
    font-size: 12.98px;
    line-height: 100%;
    letter-spacing: 0%;
    gap:3px;
`
const CustomButton = styled(Button)`
    width: 69px;
    height: 69px;
    display:flex;
    position:relative;
    margin-top: 13px !important;
    margin-right: 13px !important;
    background-color:${props => props.fundo} !important;
    color: #ffff !important;
    box-shadow: none !important;
    border-radius:5px !important;
    border:1px !important;

`
  

const Menu = styled.div`
    height: 80px;
    /* top:100px; */
    width:100%;
    max-width:800px;
    display:flex;
    position:fixed;
    justify-content:center;
    z-index:2;
    bottom:0;

   
`
const Botao = styled(Button)`
    
    position:relative;
    width:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    &:nth-child(1) {
        background-color: #fff;
        color: #D4D4D4;
        
  }
   &:nth-child(2) {
        color: #fff;
        background-color: #52B6FF;
  }

 
`
