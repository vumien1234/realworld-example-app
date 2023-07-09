import {GET} from '../APIs/config';
const getTag = ()=>{
    return GET('/tags')
}
export {getTag}