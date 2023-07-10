const USER = {
    "user": {
        "email": "",
        "token": "",
        "username": "",
        "bio": "",
        "image": ""
    }
}
const ARTICLE = {
    "article": {
        "title": "",
        "description": "",
        "body": "",
        "tagList": [
            ""
        ]
    }
    
}
const USER_SIGNUP = {
    "user": {
        "username": "",
        "email": "",
        "password": ""
    }
}
const USER_LOGIN = {
    "user": {
        "email": "",
        "password": ""
    }
}
const GET_ARTICLE_SLUG = {
        
    "slug": "loading...",
    "title": "loading...",
    "description": "loading...",
    "body": "loading...",
    "tagList": [],
    "createdAt": "2023-07-07T06:42:34.051Z",
    "updatedAt": "2023-07-07T06:42:34.051Z",
    "favorited": true,
    "favoritesCount": 0,
    "author": {
        "username": "loading...",
        "bio": "loading...",
        "image": "loading...",
        "following": true
    }

}
const GET_ARTICLE_COMMENT = {
    "id": 0,
    "createdAt": "",
    "updatedAt": "",
    "body": "",
    "author": {
    "username": "",
    "bio": "",
    "image": "",
    "following": true
    }
}
const POST_ARTICLE_COMMENT = {
  "comment": {
    "body": ""
  }
}
export {USER_SIGNUP,USER_LOGIN,USER,ARTICLE,GET_ARTICLE_SLUG,GET_ARTICLE_COMMENT,
POST_ARTICLE_COMMENT};