import {GET} from './config';
const getTag = ()=>{
    return GET('/tags')
}
export {getTag}