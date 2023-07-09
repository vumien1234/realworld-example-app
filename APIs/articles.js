import {GET,POST} from './config';

const getArticle = (params)=>{
    return GET('/articles',params)
}
const PostArticle = (article)=>{
    return POST('/articles',article)
}
const GetArticleSlug = (slug) => {
    return GET(`/articles/${slug}`);
};

export {getArticle,PostArticle,GetArticleSlug}