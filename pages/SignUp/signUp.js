import classNames from "classnames/bind";
import styles from "./signUp.module.scss";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { USER_SIGNUP } from '../../models/user';
import { Register } from '../../APIs/user';
import { TextInput, Button, Box } from '@mantine/core';
// import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
const cx = classNames.bind(styles);
function SignUp() {
    const nav = useNavigate();
    const [user,setUser] = useState(USER_SIGNUP)
    const [loading,setLoading] = useState(false)
    // const form = useForm({
    //     initialValues: { username: '', email: '', password: ''},
    //     validate: {
    //         username: (value) => (value.length < 5 ? 'Name must have at least 2 letters' : null),
    //         email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    //         password: (value) => (
    //             /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(value) ? null : 'Password must have at least 8 characters and contain both letters and numbers'
    //         ),
    //     },
    // });
    const changeUser = (value,type)=>{
        setUser({
            'user':{
                ...user.user,
                [type]:value,
            }
        })
    }
    const handleSubmit = async ()=>{
        setLoading(true);
        try {
            await Register(user);
            setUser(USER_SIGNUP);
            notifications.show({
                title: 'Đăng kí thành công',
                message: 'Vui lòng đăng nhập 😍 ',
                color: 'green',
            })
            nav('/signIn')
        } catch (error) {
            console.log(error.response.data.errors)
            notifications.show({
                title: 'Đăng kí thất bại',
                message: 'Vui lòng đăng kí lại! 🤥',
                color: 'red',
            })
        }finally{
            setLoading(false)
        }
    }
    return (
        <>
            <Box maw={500} mx="auto">
                <form onSubmit={handleSubmit} className={cx('wrapper')}>
                    <div className={cx('title')}>
                        <h1>Sign Up</h1>
                        <Link to={'/signUp'}>Need an account</Link>
                    </div>
                    <TextInput
                        onChange={(e)=>changeUser(e.target.value,'username')}
                        value ={user.user.username}
                        placeholder="username"
                        label="username"
                        // {...form.getInputProps('username')} 
                    />
                    <TextInput
                        onChange={(e)=>changeUser(e.target.value,'email')}
                        value={user.user.email}
                        placeholder="email"
                        label="email"
                        // {...form.getInputProps('email')}
                    />
                    <TextInput
                        onChange={(e)=>changeUser(e.target.value,'password')}
                        value = {user.user.password}
                        label="password"
                        placeholder="password"
                        mt="md"
                        // {...form.getInputProps('password')}
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