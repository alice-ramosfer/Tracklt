import { BrowserRouter,Link,Route, Routes, useNavigate } from "react-router-dom"
import Hoje from "./Hoje";
import Login from "./Login";
import Cadastro from "./Cadastro";
import Habitos from "./Habitos";
import { useState } from "react";
import UserContext from "../contexts/UserContext";

export default function Tracklt(){
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [user, setUser] = useState(null);
    return(
        <>
            <UserContext.Provider value={[user, setUser]}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login token= {token} setToken={setToken}/>}/>
                        <Route path="/cadastro" element={<Cadastro/>}/>
                        <Route path="/hoje" element={<Hoje token= {token}/>}/>
                        <Route path="/habitos" element={<Habitos token= {token}/>}/>
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    )
}

