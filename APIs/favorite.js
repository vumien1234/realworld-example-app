import {DELETE,POST} from './config';
const Favorite = (slug)=>{
    return POST(`/articles/${slug}/favorite`)
}
const UnFavorite = (slug)=>{
    return DELETE(`/articles/${slug}/favorite`)
}
export {Favorite,UnFavorite};