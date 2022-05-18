const Pagination = ({ page, setPage, pages }) => {
  const list = []
  for (let i = 1; i < pages + 1; i++) {
    list.push(
      <li className={(i === page ? 'active' : '') + ' page-item'} key={i}>
        <div
          className="page-link"
          onClick={() => setPage(i)}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
        >
          {i}
        </div>
      </li>
    )
  }

  return (
    pages > 1 && (
      <nav>
        <ul className="pagination">{list.map((item) => item)}</ul>
      </nav>
    )
  )
}

export default Pagination
