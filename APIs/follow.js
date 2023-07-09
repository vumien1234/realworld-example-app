import {DELETE,POST} from './config';
const FollowAuth = (username)=>{
    return POST(`/profiles/${username}/follow`)
}
const UnFollowAuth = (username)=>{
    return DELETE(`/profiles/${username}/follow`)
}
export {FollowAuth,UnFollowAuth};