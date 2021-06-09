import { FaSearch } from 'react-icons/fa';

import styles from './styles.module.scss';

const SearchBar = () => (
  <div className={styles.containerSearchBar}>
    <FaSearch size={20} />
    <input type="text" placeholder="Busca por produtos" />
  </div>
)

export default SearchBar;