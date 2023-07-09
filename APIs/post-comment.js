import {GET,POST} from '../APIs/config';
const GetArticleComment = (slug)=>{
    return GET(`/articles/${slug}/comments`)
}
const PostArticleComment = (slug)=>{
    return POST(`/articles/${slug}/comments`)
}
export {GetArticleComment,PostArticleComment}