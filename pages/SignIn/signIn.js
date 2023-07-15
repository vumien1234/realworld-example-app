import { TextInput, Button, Box } from '@mantine/core';
import classNames from "classnames/bind";
import styles from "./signIn.module.scss";
import { Link } from 'react-router-dom';
import {USER_LOGIN } from '../../models/user';
import { Login } from '../../apis/user';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { notifications } from '@mantine/notifications';
import { useForm } from "@mantine/form";
const cx = classNames.bind(styles);
function SignIn() {
    const auth = useContext(AuthContext)
    const [loading,setLoading] = useState(false)
    const nav = useNavigate()
    const form = useForm({
        initialValues: { ...USER_LOGIN.user },
        validate: {
          email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
          password: (value) =>
            /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(value)
              ? null
              : "Password must have at least 8 characters and contain both letters and numbers",
        },
    });
    const handleSubmit = async (value)=>{
        let user = { user: { ...value } }
        setLoading(true)
        try {
            const response = await Login(user);
            auth.action.login(response.user.token)
            nav('/')
            notifications.show({
                title: "Đăng nhập thành công",
                message: "Vui lòng đăng nhập 😍 ",
                color: "green",
            });
        } catch (error) {
            let errors = error.response.data.errors;

            Object.keys(errors).forEach((key) => {
                let fieldErrors = errors[key];

                fieldErrors.forEach((message) => {
                notifications.show({
                    title: "Đăng nhập thất bại",
                    message: `${key}: ${message} 🤥`,
                    color: "red",
                });
                });
            });
        }finally{
            setLoading(false)
        }
    }
    return (
        <Box maw={500} mx="auto">
            <form onSubmit={form.onSubmit(handleSubmit)} className={cx('wrapper')}>
                <div className={cx('title')}>
                    <h1>Sign in</h1>
                    <Link to={'/signUp'}>Need an account</Link>
                </div>
                    <TextInput
                        placeholder="email"
                        type='text'
                        name='email'
                        label="email"
                        {...form.getInputProps("email")}
                        disabled={loading}
                    />
                    <TextInput
                        label="password"
                        type='password'
                        placeholder="password"
                        {...form.getInputProps("password")}
                        disabled={loading}
                    />
                <Button loading={loading} className={cx('button-submit')} type="submit" mt="md" >
                    Submit
                </Button>
            </form>
        </Box>
    );
    
}

export default SignIn;