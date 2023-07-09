import { GET } from "./config"

const getArticle = (params)=>{
    return GET('/articles',params)
}
export {getArticle}