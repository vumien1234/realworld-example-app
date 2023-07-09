import { createContext, useLayoutEffect, useState } from "react";
import { USER } from "../models/user";
import { GetUser } from "../APIs/user";
import Loading from "../components/loading/loading";
const AuthContext = createContext();
function AuthProvider({children}) {
    // trạng thái người dùng 
    const [loading,setLoading] = useState(true)
    const [token,setToken] = useState(localStorage.getItem('jwt') || '')
    const [auth,setAuth] = useState({
        ...USER,
        logined : false,
    })
    const logout = ()=>{
        localStorage.removeItem('jwt')
        setToken('')
        setAuth({
            ...USER,
            logined:false
        })
    }
    const login = (jwt)=>{
        // lưu vào local,sau đó lưu vào state jwt
        localStorage.setItem('jwt',jwt)
        setToken(jwt)
    }
    useLayoutEffect(()=>{
        const fechData = async ()=>{
            setLoading(true)
            try {
                const response = await GetUser();
                setAuth({
                    logined :true,
                    ...response,
                })
            } catch (error) {
                logout();
            }finally{
                setLoading(false)
            }
        }
        if(token !== ''){
            fechData();
        }else{
            setLoading(false)
        }
    },[token])
    const value = {
        ...auth,
        action:{
            login,
            logout,
        }
    }

    return (
        <AuthContext.Provider value={value}>
            {loading ? (
                <Loading/>
            ):(
                <>
                    {children}
                </>
            )}
        </AuthContext.Provider>
    );
}

export {AuthContext,AuthProvider}  ;