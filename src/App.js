import { Routes, Route } from 'react-router-dom'

import { HomePage } from './pages/home-page/HomePage'
import { CreateAccountPage } from './pages/create-account-page/CreateAccountPage'
import { LoginPage } from './pages/login-page/LoginPage'
import { EditAccountPage } from './pages/edit-account-page/EditAccountPage'
import { SingleArticlePage } from './pages/single-article-page/SingleArticlePage'
import { CreateArticlePage } from './pages/create-article-page/CreateArticlePage'
import { EditArticlePage } from './pages/edit-article-page/EditArticlePage'
import { route } from "./helpers/helpers";

import { Layout } from './components/layout/Layout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />}/>
        <Route path={route.createAccount} element={<CreateAccountPage />}/>
        <Route path={route.Login} element={<LoginPage />}/>
        <Route path={route.editAccount} element={<EditAccountPage />}/>
        <Route path={route.Id} element={<SingleArticlePage />}/>
        <Route path={route.createArticle} element={<CreateArticlePage />}/>
        <Route path={route.editArticleId} element={<EditArticlePage />}/>
      </Route>
    </Routes>
  )
}

export default App
