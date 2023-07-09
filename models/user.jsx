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
    "comments": [
        {
          "id": 0,
          "createdAt": "2023-07-09T09:06:50.424Z",
          "updatedAt": "2023-07-09T09:06:50.424Z",
          "body": "string",
          "author": {
            "username": "string",
            "bio": "string",
            "image": "string",
            "following": true
          }
        }
    ]
}
const POST_ARTICLE_COMMENT = {
  "comment": {
    "body": "string"
  }
}
export {USER_SIGNUP,USER_LOGIN,USER,ARTICLE,GET_ARTICLE_SLUG,GET_ARTICLE_COMMENT,
POST_ARTICLE_COMMENT};