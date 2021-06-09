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
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState<CurrentUser>(user as CurrentUser);

  return (
    <header className={styles.navigationContainer}>
      <div className={styles.navigationBar}>
        <div className={styles.logo}>
          <h1>
            <Link href="/">
              <a>
                DRAGSTERS
              </a>
            </Link>
          </h1>
        </div>

        <nav>
          <ul>
            <li>
              <Link href="/products/ShowProducts">
                <a>Inicio</a>
              </Link>
            </li>
            <li><a href="#">Rodas</a></li>
            <li><a href="#">Sobre</a></li>
            <li><a href="#">Contato</a></li>
          </ul>

          {
            !currentUser ? (
              <div className={styles.signInSignOut}>
                <Link href="/customers/login">
                  <a>Entrar</a>
                </Link>
                <Link href="/customers/register">
                  <a>Registrar</a>
                </Link>
              </div>
            ) : (
              <div className={styles.signInSignOut}>
                <a
                  href="/login">{currentUser.fullname}
                </a>
              </div>
            )
          }
        </nav>
      </div>
    </header>
  );
}

export default Header;