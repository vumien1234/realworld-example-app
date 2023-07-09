import { GET,POST,PUT} from './config';
const Register = (user)=>{
    return POST('/users',user)
}
const Login = (user)=>{
    return POST('users/login',user)
}
const GetUser = () =>{
    return GET('/user')
}
const UpdateUser = (user)=>{
    return PUT('/user',user)
}


export {Register,Login,GetUser,UpdateUser};