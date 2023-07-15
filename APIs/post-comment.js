import {DELETE, GET,POST} from './config';
const GetArticleComment = (slug)=>{
    return GET(`/articles/${slug}/comments`)
}
const PostArticleComment = (slug,data)=>{
    return POST(`/articles/${slug}/comments`,data)
}
const DeleteComment = (slug,id)=>{
    return DELETE(`/articles/${slug}/comments/${id}`)
}
export {GetArticleComment,PostArticleComment,DeleteComment}