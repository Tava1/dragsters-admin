import styles from "./styles.module.scss"

const MAX_ITEMS = 10;
const CURRENT_ITEM = 1;
const MAX_LEFT = (MAX_ITEMS - CURRENT_ITEM) / 2;

const Pagination = ({ limit, total, offset, setOffset }) => {
  const currentPage = offset ? offset / limit + 1 : 1;
  const countPages = Math.ceil(total / limit);
  const firstPage = Math.max(currentPage - MAX_LEFT, 1);

  return (
    <div className={styles.container}>
      <ul>
        {Array.from({ length: Math.min(MAX_ITEMS, countPages) })
          .map((_, index) => index + firstPage)
          .map((page) => (
            <li key={page}>
              <button
                onClick={() => setOffset((page - 1) * limit)}
                className={
                  page === currentPage ? styles.currentPage : ''
                }
              >
                {page}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Pagination;