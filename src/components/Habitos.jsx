import { useState, useEffect } from "react";
import { ToggleButton, ToggleButtonGroup} from '@mui/material';
import styled from "styled-components";
import * as React from 'react';
import {
Accordion,
TextField,
AccordionSummary,
AccordionDetails,
Button,
Typography
} from '@mui/material';

import { Link } from "react-router-dom";
import imgPerfil from "../img/imgPerfil.png"
import '@fontsource/playball';
import '@fontsource/lexend-deca';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AddIcon from '@mui/icons-material/Add';
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { PulseLoader  } from "react-spinners";   
import { ClipLoader } from "react-spinners";  
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';  



export default function Habitos(){
    const [loading,setLoading] = useState(false)
    const [loadinginc,setLoadinginc] = useState(false)
    const diasSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    const diasSemanaNum = [0,1,2,3,4,5,6];
    const [diasSelecionados, setDiasSelecionados] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [user, setUser]=React.useContext(UserContext)
    const [listaHab, setListaHab] = useState(null)
    const [NovaListHab,setNovaListHab] = useState([])
    const [nomeHab, setNomeHab]=useState("")
    const [erro, setErro] = useState(false)
    const [msgerro, setMsgErro] = useState("")

    const handleToggle = () => {
        setExpanded((prev) => !prev);
    };
    const config = {
            headers:{
                Authorization:`Bearer ${user.token}`
            }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setErro(false);
        };

    const action = (
        <React.Fragment>
        
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
        </React.Fragment>
    );

    useEffect(()=> {
        setLoadinginc(true)
        const URL="https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
        axios.get(URL, config)
            .then(res => {
                setListaHab(res.data)
                setLoadinginc(false)
                
            })

    }, [])
    
    

    function AddHabito(e){  

        e.preventDefault();
        setLoading(true)
        const body ={
            name:nomeHab,
            days:diasSelecionados,
        }

        const URL="https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
        axios.post(URL, body, config)
        .then(res => {
            if (!listaHab){
                setListaHab(res.data)
                
            }
                
            else{
                setListaHab([...listaHab, res.data])
            }
            setLoading(false)
            setNomeHab("")
            setDiasSelecionados([])
            setExpanded(false)
        })
        .catch(err => {
            
            setLoading(false)
            setErro(true)
            setMsgErro(err.response.data.message)
            setLoading(false)
        })
    }

    function DiadaSemana(dia){
        switch (dia) {  
            case 0:
            return 'D';
            case 1:
            return 'S';
            case 2:
            return 'T';
            case 3:
            return 'Q';
            case 4:
            return 'Q';
            case 5:
            return 'S';
            case 6:
            return 'S';
            default:
            return '?';
    }}
    
    return(
        <>
            <Container>
                <Topo>
                    <span>TrackIt</span>
                    <ImgUsuario><img src={user.image} alt="perfil" /></ImgUsuario>
                </Topo>
                <Conteudo>
                    <MenuSuperio>
                        <TituloHabito>Meus Hábitos</TituloHabito>
                        <ButaoAdd
                            variant="contained"
                            onClick={handleToggle}    
                        >
                            <AddIcon/>
                        </ButaoAdd>
                    </MenuSuperio>
                    {expanded && ( 
                        <Accordion expanded={expanded} elevation={0} sx={{ borderRadius:'5px'}} >
                            <AccordionDetails>
                                    <form onSubmit={AddHabito}>
                                        <TextField id="nome" label="Nome Hábito"  type="name"  fullWidth sx={{marginTop:'8px', borderRadius:'5px', border:'1px solid #D4D4D4'}} value={nomeHab} onChange={(e) => setNomeHab(e.target.value)} disabled={loading}/>
                                        <ToggleButtonGroup
                                            value={diasSelecionados}
                                            onChange={(e, newDias) => setDiasSelecionados(newDias)}
                                            // exclusive={false}
                                            sx={{display:'flex', msFlexDirection:'row', gap:"4px", marginTop:"8px"}}
                                            disabled ={loading}
                                        >
                                        {diasSemana.map((dia, index) => (
                                            <BotaoToggle key={index} value={index}  >
                                                {dia}
                                            </BotaoToggle>
                                        ))}                                            
                                        </ToggleButtonGroup>
                                        <BotaoIferiorForm>
                                            <Button sx={{ border:'none', background:'#ffff', color: '#52B6FF' }} onClick={() => setExpanded(false)}>Cancelar</Button>
                                            <Button type="submit" variant="contained" sx={{ border:'none', background:'#52B6FF', color: '#ffff' }}>{loading ? <ClipLoader color="#ffff" /> : "Salvar"}</Button>
                                        </BotaoIferiorForm>
                                        
                                    </form>       
                            </AccordionDetails>
                        </Accordion>
                    )}
                    {loadinginc && <PulseLoader color="#126BA5" />}
                    {!loadinginc &&
                    <>
                        {!listaHab &&  
                            <NenhumHabito>
                                <span>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</span>
                            </NenhumHabito>}
                        
                        {listaHab && 
                            <>   
                                {listaHab.map((habito) => (     
                                        <ListaHabitos  key={habito.id}>
                                            <span >{habito.name}</span> 
                                            <DiasSemana>
                                                {diasSemanaNum.map((num,i) => (
                                                    <DiaSemana key={i} fundo={ habito.days.includes(num) ? "#CFCFCF":"#FFFFFF"} colorLetra={ habito.days.includes(num) ? "#FFFFFF":"#CFCFCF"}>
                                                        {DiadaSemana(num)}
                                                    </DiaSemana>
                                                ))}
                                            </DiasSemana>
                                        </ListaHabitos>
                                    
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
                <Snackbar
                    open={erro}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={msgerro}
                    action={action}
                />
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

const MenuSuperio=styled.div`
    display:flex;
    align-items: center;
    justify-content: space-between;


`
const TituloHabito = styled.div`
    /* display:flex;
    align-items: center;
    justify-content: space-between; */
    margin-top: 22px;
    height: 29px;
    font-family: Lexend Deca;
    font-weight: 400;
    font-size: 22.98px;
    color:#126BA5;



    

`
const ButaoAdd =styled(Button)`
    width: 40px;
    height: 35px;
    border-radius: 4.64px;
    top:9px;
    


`

const NenhumHabito =styled.div`
    height: 74px;
    font-family: Lexend Deca;
    font-weight: 400;
    font-size: 17.98px;
    color:#666666;
    margin-top:28px;

`
    
const ListaHabitos =styled.div`
    gap:3px;
    background-color:#ffff;
    height: 91px;
    border-radius:5px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    
    span{
        font-family: Lexend Deca;
        font-weight: 400;
        font-size: 19.98px;
        color:#666666;
        margin-left:15px;

    }
`

const BotaoToggle=styled(ToggleButton)`
    display:flex;
    justify-content:center;
    width:30px;
    height: 30px;
    background: #ffff !important; //vai vim com props
    border-radius:5px !important;
    border:1px solid !important ;
    border-color:#D4D4D4 !important;
    font-family: Lexend Deca !important;
    font-weight: 400 !important;
    font-size: 19.98px !important;
    color:#DBDBDB !important;
    &.Mui-selected {
        background-color: #CFCFCF !important;
        color: #FFFFFF !important;
}
    
`
const BotaoIferiorForm =styled.div`
    margin-left:120px;
    margin-top: 29px;


`
const DiasSemana =styled.div`
    display:flex;
    flex-direction:row;
    margin-left:15px;
    gap:4px;
`

const DiaSemana =styled.div`
    width:30px;
    height: 30px;
    background: ${props => props.fundo}; //vai vim com props
    border-radius:5px;
    border:1px solid;
    border-color:#D4D4D4;
    display:flex;
    justify-content:center;
    font-family: Lexend Deca !important;
    font-weight: 400 !important;
    font-size: 19.98px !important;
    color:${props => props.colorLetra} !important;
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
        color: #fff;
        background-color: #52B6FF;
        
}
&:nth-child(2) {
        background-color: #fff;
        color: #D4D4D4;
}


`

