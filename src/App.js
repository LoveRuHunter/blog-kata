import { Routes, Route } from 'react-router-dom'

import { HomePage } from './pages/home-page/HomePage'
import { CreateAccountPage } from './pages/create-account-page/CreateAccountPage'
import { LoginPage } from './pages/login-page/LoginPage'
import { EditAccountPage } from './pages/edit-account-page/EditAccountPage'
import { SingleArticlePage } from './pages/single-article-page/SingleArticlePage'
import { CreateArticlePage} from './pages/create-article-page/CreateArticlePage'
import { EditArticlePage} from './pages/edit-article-page/EditArticlePage'

import { Layout } from './components/layout/Layout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />}/>
        <Route path="create-account" element={<CreateAccountPage />}/>
        <Route path="login" element={<LoginPage />}/>
        <Route path="edit-account" element={<EditAccountPage />}/>
        <Route path="/:id" element={<SingleArticlePage />}/>
        <Route path="create-article" element={<CreateArticlePage />}/>
        <Route path="edit-article/:id" element={<EditArticlePage />}/>
      </Route>
    </Routes>
  )
}

export default App
