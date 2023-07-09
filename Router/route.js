import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/home';
import NewActive from '../pages/NewActive/newActive';
import SignIn from '../pages/SignIn/signIn';
import SignUp from '../pages/SignUp/signUp';
import Setting from '../pages/Setting/setting';
import MyArticle from '../pages/MyArticle/myAticle';
import ArticlePage from '../pages/articlePage/article-page';
const PublicRoutes = [
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signIn" element={<SignIn />} />
    <Route path="/signUp" element={<SignUp />} />
  </Routes>
]

const PrivateRoutes = [

  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/setting" element={<Setting />} />
    <Route path="/newActive" element={<NewActive />} />
  </Routes>
]

const PageRoutes = [
  <Routes>
    <Route path="/myArticle" element={<MyArticle />} />
    <Route path='/articlepage' element={<ArticlePage/>}/>
  </Routes>
]

export { PublicRoutes, PrivateRoutes, PageRoutes };
