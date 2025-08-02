import styled from "styled-components";
import * as React from 'react';
import {Link,useNavigate } from "react-router-dom"
import { useState } from "react";
import logo from "../img/logo.png"
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import '@fontsource/lexend-deca'; 
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';



export default function Cadastro(){
    const [loading,setLoading] = useState(false)
    const [email, setEmail]= useState("")
    const [senha, setSenha]= useState("")
    const [nome, setNome]= useState("")
    const [foto, setFoto]= useState("")
    const navigate = useNavigate();
    const [erro, setErro] = useState(false)
    const [msgerro, setMsgErro] = useState("")

    const body ={
	    email,
	    name:nome,
	    image:foto,
	    password:senha
    }
    const URL="https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up"

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

    function Cadastrar(e){

        e.preventDefault();
        setLoading(true)
        axios.post(URL, body)
        .then(res => {
            navigate("/") 
            console.log("cadatrado")
            setLoading(false)
        })
        .catch(err => {
            setErro(true)
            setMsgErro(err.response.data.message)
            setLoading(false)
        })

    }
    return(
        
        <Container>
            <StyledLogo>
                <img src={logo} alt="logo"/>
            </StyledLogo>

            <StyledForm>
                <form onSubmit={Cadastrar} >
                    <ContainerForm>
                        <TextField type="email" id="email" label="email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} disabled={loading} fullWidth/>
                        <TextField id="senha" label="senha"  type="password" autoComplete="current-password" value={senha} onChange={e => setSenha(e.target.value)} disabled={loading}fullWidth  />
                        <TextField id="nome" label="nome"  type="name"  value={nome} onChange={e => setNome(e.target.value)} fullWidth disabled={loading} />
                        <TextField id="foto" label="foto"  type="text"  value={foto} onChange={e => setFoto(e.target.value)} fullWidth  disabled={loading}/>
                        <Button type="submit" variant="contained"  sx={{ width: '100%' }}>{loading ? <ClipLoader color="#ffff" /> : "Cadastrar"}</Button>
                    </ContainerForm>
                </form>

            </StyledForm>
            <PageCadastro to="/">
                Já tem uma conta? Faça login!
            </PageCadastro>
            <Snackbar
                open={erro}
                autoHideDuration={6000}
                onClose={handleClose}
                message={msgerro}
                action={action}
            />
        </Container>
        
    )
}


const Container=styled.div`
    /* background: red; */
    max-width:800px; 
    min-height:100vh;
    margin: auto;
    display:flex;
    align-items:center;
    flex-direction:column;
    position:relative;
    font-family: Lexend Deca;
    font-weight: 400;
    font-size: 13.98px;
`
const ContainerForm = styled.div`
    display:flex;
    align-items:center;
    flex-direction:column;
    gap:10px;
    margin-top:33px;
    .MuiButton-root{
        font-family: Lexend Deca !important;
        background-color:#52B6FF;
        height:45px;
        font-family: Lexend Deca;
        font-weight: 400;
        font-size: 15px;
    }

    .MuiInputBase-root{
        height:45px;     

    }

    .MuiInputLabel-root {
        font-family: 'Lexend Deca' !important;
        color: #DBDBDB;
        font-size: 17px;
        /* transform: translateX(30%) !important;   */
        margin-top:-5px !important;
        text-align: center !important;
        
    } 
 
`
const PageCadastro = styled(Link)`
    margin-top:25px;
    

`
const StyledLogo = styled.header`
    margin-top:68px;

`
const StyledForm= styled.div`
    width:80%;

`
