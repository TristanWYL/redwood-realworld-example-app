import ArticleCell from 'src/components/Article/ArticleCell'

type ArticlePageProps = {
  id: number
}

const ArticleList = ({ id }: ArticlePageProps) => {
  return <ArticleCell id={id} />
}

export default ArticleList
