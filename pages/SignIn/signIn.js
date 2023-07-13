import { TextInput, Button, Box } from '@mantine/core';
import classNames from "classnames/bind";
import styles from "./signIn.module.scss";
import { Link } from 'react-router-dom';
import {USER_LOGIN } from '../../models/user';
import { Login } from '../../APIs/user';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { notifications } from '@mantine/notifications';
const cx = classNames.bind(styles);
function SignIn() {
    const auth = useContext(AuthContext)
    const nav = useNavigate()
    const [user,setUser] = useState(USER_LOGIN)
    const changeUser = (value,type) =>{
        setUser({
            'user':{
                ...user.user,
                [type]:value
            }
        })
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        notifications.show({
            title: 'Đăng nhập thành công',
            message: 'Chào  mừng bạn đã quay trở lại 😘',
            color: 'green',
        })
        try {
            const response = await Login(user);
            auth.action.login(response.user.token)
            nav('/')
        } catch (error) {
            notifications.show({
                title: 'Đăng nhập thất bại',
                message: 'Vui lòng đăng nhập lại! 🤥',
                color: 'red',
            })
            console.log(error)
        }
    }
    return (
        <Box maw={500} mx="auto">
            <form onSubmit={handleSubmit} className={cx('wrapper')}>
                <div className={cx('title')}>
                    <h1>Sign in</h1>
                    <Link to={'/signUp'}>Need an account</Link>
                </div>
                    <TextInput
                        value={user.user.email}
                        onChange={(e)=>changeUser(e.target.value,'email')}
                        placeholder="email"
                        type='text'
                        name='email'
                        label="email"
                    />
                    <TextInput
                        value={user.user.password}
                        onChange={(e)=>changeUser(e.target.value,'password')}
                        label="password"
                        type='password'
                        placeholder="password"
                    />
                <Button className={cx('button-submit')} type="submit" mt="md" >
                    Submit
                </Button>
            </form>
        </Box>
    );
    
}

export default SignIn;