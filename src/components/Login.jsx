import styled from "styled-components";
import * as React from 'react';
import {Link,useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import logo from "../img/logo.png"
import { TextField, Button } from "@mui/material";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import { ClipLoader } from "react-spinners";   
import '@fontsource/lexend-deca'; 
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


export default function Login(){
    const [loading,setLoading] = useState(false)
    const [email, setEmail]= useState("")
    const [senha, setSenha]= useState("")
    const [user, setUser]=useContext(UserContext)
    const navigate = useNavigate()
    const [erro, setErro] = useState(false)
    const [msgerro, setMsgErro] = useState("")


    useEffect( () => {if (JSON.parse(localStorage.getItem("user")) != null){
            setUser(JSON.parse(localStorage.getItem("user")))
            navigate("/hoje")
        }}, [])

    function Login(e){
        e.preventDefault();

        const URL ="https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login"
        const body = {email,password:senha}
        setLoading(true)
        axios.post(URL, body)
            .then(res => {
                setUser(res.data)
                localStorage.setItem("user", JSON.stringify({
                    id:res.data.id,
                    name:res.data.name,
                    image:res.data.image,
                    token:res.data.token
                }))
                navigate("/hoje")
                setLoading(false)
            })
            
            .catch(err=>{ 
                setLoading(false)
                setErro(true)
                setMsgErro(err.response.data.message)
                // console.log((err.response.data.message))
            })
                
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


    return(
        
        <Container>
            <StyledLogo>
                <img src={logo} alt="logo"/>
            </StyledLogo>

            <StyledForm>
                <form onSubmit={Login} >
                    <ContainerForm>
                        <TextField type="email" id="email" label="email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} disabled={loading}fullWidth/>
                        <TextField id="senha" label="senha"  type="password" autoComplete="current-password" value={senha} onChange={e => setSenha(e.target.value)} disabled={loading}fullWidth  />
                        <Button type="submit"  variant="contained"  sx={{ width: '100%'}} disabled={loading}>{loading ? <ClipLoader color="#ffff" /> : "Entrar"}</Button>
                    </ContainerForm>
                </form>

            </StyledForm>
            <PageCadastro to="/cadastro">
                Não tem uma conta? Cadastre-se!
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
    .MuiButton-root{
        font-family: Lexend Deca !important;
        background-color:#52B6FF;
        height:45px;
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
    /* background: blue; */
    width:80%;
    margin-top:33px;

`