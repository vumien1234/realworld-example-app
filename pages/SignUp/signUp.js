import classNames from "classnames/bind";
import styles from "./signUp.module.scss";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { USER_SIGNUP } from '../../models/user';
import { Register } from '../../APIs/user';
import { TextInput, Button, Box } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
function SignUp() {
    const nav = useNavigate();
    const [user,setUser] = useState(USER_SIGNUP)
    // const [message,setMessage] = useState('')
    const [loading,setLoading] = useState(false)
    const changeUser = (value,type)=>{
        setUser({
            'user':{
                ...user.user,
                [type]:value,
            }
        })
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        setLoading(true);
        try {
            await Register(user);
            setUser(USER_SIGNUP);
            nav('/signIn')
            alert('đăng kí thành công')
        } catch (error) {
            alert('đăng kí thất bại')
            console.log(error.response.data.errors)
        }finally{
            setLoading(false)
        }
    }
    return (
        <>
            <Box maw={500} mx="auto">
                <form onSubmit={handleSubmit} className={cx('wrapper')}>
                {/* <span>{message}</span> */}
                    <div className={cx('title')}>
                        <h1>Sign Up</h1>
                        <Link to={'/signUp'}>Need an account</Link>
                    </div>
                    <TextInput
                        onChange={(e)=>changeUser(e.target.value,'username')}
                        value ={user.user.username}
                        placeholder="username"
                        label="username"
                    />
                    <TextInput
                        onChange={(e)=>changeUser(e.target.value,'email')}
                        value={user.user.email}
                        placeholder="email"
                        label="email"
                    />
                    <TextInput
                        onChange={(e)=>changeUser(e.target.value,'password')}
                        value = {user.user.password}
                        label="password"
                        placeholder="password"
                        mt="md"
                    />
                    <Button disabled={loading} className={cx('button-submit')} type="submit" mt="md" >
                        Submit
                    </Button>
                </form>
            </Box>
        </>
    );
    
}

export default SignUp;