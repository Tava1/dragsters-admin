import Link from 'next/link';
import { useAuth } from '../../../hooks/AuthContext';

import styles from './styles.module.scss';

import { useState } from 'react';

interface CurrentUser {
  id: string;
  fullname: string;
  email: string;
  status: boolean;
  role: string;
}

const Header = () => {
  const { user, signOut } = useAuth();
  const [currentUser, setCurrentUser] = useState<CurrentUser>(user as CurrentUser);

  return (
    <header className={styles.navigationContainer}>
      <div className={styles.navigationBar}>
        <div className={styles.logo}>
          <h1>
            <Link href="/menu">
              <a>
                DRAGSTERS
              </a>
            </Link>
          </h1>
        </div>


        <nav>
          {currentUser && (
            <ul>
              <li>
                <Link href="/menu">
                  <a>Menu</a>
                </Link>
              </li>
              <li>
                <Link href="/users/list">
                  <a>Usuários</a>
                </Link>
              </li>
              <li>
                <Link href="/products/list">
                  <a>Produtos</a>
                </Link>
              </li>
              <li>
                <Link href="/products/orders">
                  <a>Pedidos</a>
                </Link>
              </li>
            </ul>
          )}

          {
            currentUser && (
              <div className={styles.signInSignOut}>
                <button onClick={signOut}>
                  {currentUser.fullname}
                </button>
              </div>
            )
          }
        </nav>
      </div>
    </header>
  );
}

export default Header;