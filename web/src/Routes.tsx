// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'
import ArticlesLayout from 'src/layouts/ArticlesLayout'
import MainLayout from './layouts/MainLayout/MainLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={MainLayout}>
        <Route path="/login" page={SignPage} name="login" />
        <Route path="/register" page={SignPage} name="register" />
        <Route path="/" page={HomePage} name="home" />
        <Route path="/settings" page={SettingPage} name="settings" />
        <Route path="/profile" page={ProfilePage} name="profile" />
      </Set>
      <Set wrap={ArticlesLayout}>
        <Route path="/articles/new" page={ArticleNewArticlePage} name="newArticle" />
        <Route path="/articles/{id:Int}/edit" page={ArticleEditArticlePage} name="editArticle" />
        <Route path="/articles/{id:Int}" page={ArticleArticlePage} name="article" />
        <Route path="/articles" page={ArticleArticlesPage} name="articles" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
