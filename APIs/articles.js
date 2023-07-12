import {GET,POST, PUT} from './config';

const getArticle = (params)=>{
    return GET('/articles',params)
}
const PostArticle = (article)=>{
    return POST('/articles',article)
}
const GetArticleSlug = (slug) => {
    return GET(`/articles/${slug}`);
};
const PutArticle = (slug, data) => {
    return PUT(`/articles/${slug}`,data);
};

export {getArticle,PostArticle,GetArticleSlug,PutArticle}