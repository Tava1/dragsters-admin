import { useState } from 'react';
import Link from 'next/link';
import { FaUser, FaProductHunt } from 'react-icons/fa';
import { useAuth } from '../hooks/AuthContext';

import Header from '../components/modules/Header';
import Footer from '../components/modules/Footer';

import styles from '../styles/pages/Menu.module.scss'

interface CurrentUser {
  id: string;
  fullname: string;
  email: string;
  status: boolean;
  role: string;
}

export default function Menu() {
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState<CurrentUser>(user as CurrentUser);

  return (
    <>
      <Header />
      <section className={styles.container}>
        <div className={styles.containerMenu}>
          <div className={styles.grid}>
            <div className={styles.item}>
              <Link href="/users/list">
                <a>
                  <FaUser size={90} />
                  <h3>Usuários</h3>
                </a>
              </Link>
            </div>
            <div className={styles.item}>
              <Link href="/products/list">
                <a>
                  <FaProductHunt size={90} />
                  <h3>Produtos</h3>
                </a>
              </Link>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}