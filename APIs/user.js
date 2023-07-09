import {DELETE, GET,POST,PUT} from './config';
const Register = (user)=>{
    return POST('/users',user)
}
const Login = (user)=>{
    return POST('users/login',user)
}
const GetUser = () =>{
    return GET('/user')
}
const PostArticle = (article)=>{
    return POST('/articles',article)
}
const UpdateUser = (user)=>{
    return PUT('/user',user)
}
const GetArticleSlug = (slug) => {
    return GET(`/articles/${slug}`);
};
const FollowAuth = (username)=>{
    return POST(`/profiles/${username}/follow`)
}
const UnFollowAuth = (username)=>{
    return DELETE(`/profiles/${username}/follow`)
}
const Favorite = (slug)=>{
    return POST(`/articles/${slug}/favorite`)
}
const UnFavorite = (slug)=>{
    return DELETE(`/articles/${slug}/favorite`)
}
export {Register,Login,GetUser,
    PostArticle,UpdateUser,GetArticleSlug,FollowAuth,UnFollowAuth,Favorite,UnFavorite};