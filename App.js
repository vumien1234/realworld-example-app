import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./Layout/DefaultLayout/defaultLayout";
import { DarkLightContext } from "./contexts/darkLightContext";
import { useContext } from "react";
import MyArticle from "./pages/MyArticle/myAticle";
import "./index.css";
import Home from "./pages/home/home";
import SignIn from "./pages/SignIn/signIn";
import SignUp from "./pages/SignUp/signUp";
import Setting from "./pages/Setting/setting";
import NewActive from "./pages/NewActive/newActive";
import { GuesRouter, AuthRouter } from "./middleware/authMiddleware";
import NotFound from "./pages/404NotFound/404NotFound";
import ArticlePage from "./pages/articlePage/article-page";

function App() {
  const checkdarklight = useContext(DarkLightContext);
  
  return (
    <div className={checkdarklight.darkLight}>
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<GuesRouter />}>
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
          </Route>
          <Route element={<AuthRouter />}>
            <Route path="/setting" element={<Setting />} />
            <Route path="/newActive" element={<NewActive />} />
            <Route path="/myArticle" element={<MyArticle />} />
          </Route>
          <Route path="/articlepage/:slug" element={<ArticlePage />} />
          {/* 04 not found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </DefaultLayout>
    </div>
  );
}

export default App;
