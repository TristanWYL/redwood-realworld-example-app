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

const Routes = () => {
  return (
    <Router>
      <Route path="/" page={HomePage} name="home" />
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
