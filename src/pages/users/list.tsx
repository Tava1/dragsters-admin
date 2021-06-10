import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaEllipsisV, FaLock } from 'react-icons/fa';
import { useAuth } from '../../hooks/AuthContext';
import Link from 'next/link';

import Header from '../../components/modules/Header';
import Footer from '../../components/modules/Footer';
import Loading from '../../components/modules/Loading';
import Pagination from '../../components/modules/Pagination';

import api from '../../services/api';

import styles from '../../styles/pages/ListUsers.module.scss'

interface CurrentUser {
  id: string;
  fullname: string;
  email: string;
  status: boolean;
  role: string;
}

interface PaginationInfo {
  total: number;
}

const LIMIT = 10;

export default function List() {
  const router = useRouter();

  const { user, token } = useAuth();
  const [currentUser, setCurrentUser] = useState<CurrentUser>(user as CurrentUser);

  const [hasLoading, setHasLoading] = useState<Boolean>(true);
  const [users, setUsers] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({} as PaginationInfo);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    api.get(`/users?offset=${offset}&limit=${LIMIT}`, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
      const { usersWithoutPassword, resquestInfo } = response.data;
      setUsers(usersWithoutPassword);
      setPaginationInfo(resquestInfo);
    });

    setHasLoading(false);
  }, [users, offset]);

  async function setStatusProductTrue(id) {
    await api.patch(`/users/status/${id}`, { setStatus: true }, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
      console.log(response.data)
    })
  }

  async function setStatusProductFalse(id) {
    await api.patch(`/users/status/${id}`, { setStatus: false }, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
      console.log(response.data)
    })
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.containerList}>
          <section className={styles.header}>
            <div>
              <h2>Usuários<strong>{paginationInfo?.total}</strong></h2>
              <p>Gerenciamento de usuários cadastrados no sistema.</p>
            </div>
            <Link href="/menu">
              <a>
                Menu
              </a>
            </Link>

            {currentUser.role === 'admin' && (
              <Link href="/users/create">
                <a>
                  Novo usuário
                </a>
              </Link>
            )}

          </section>

          {hasLoading ? <Loading /> :
            users ?
              <main>
                <div className={styles.listHeader}>
                  <div className={styles.title}>
                    <span>NOME</span>
                  </div>
                  <div className={styles.description}>
                    <span>E-MAIL</span>
                  </div>
                  <div className={styles.rating}>
                    <span>TIPO/PERFIL</span>
                  </div>
                  <div className={styles.status}>
                    <span>STATUS</span>
                  </div>
                  {
                    currentUser.role === 'admin' && (
                      <div className={styles.actions}>
                        <span>AÇÕES</span>
                      </div>
                    )
                  }
                </div>

                {users && users.map(user => (
                  <div key={user.id} className={styles.listBody}>
                    <div className={styles.line}>
                      <div className={styles.title}>
                        <span>{user.fullname}</span>
                      </div>
                      <div className={styles.description}>
                        <span>{user.email}</span>
                      </div>
                      <div className={styles.rating}>
                        <span>{user.role}</span>
                      </div>

                      {currentUser.role === 'admin' ?
                        (
                          <div className={styles.status}>
                            {
                              user.status
                                ?
                                <button
                                  className={styles.active}
                                  onClick={() => setStatusProductFalse(user.id)}
                                >
                                  INATIVAR
                              </button>
                                :
                                <button
                                  className={styles.inactive}
                                  onClick={() => setStatusProductTrue(user.id)}
                                >
                                  REATIVAR
                              </button>
                            }
                          </div>
                        ) :
                        (
                          <div>
                            {
                              user.status ? (
                                <span>ATIVO</span>
                              ) : (
                                <span>INATIVO</span>
                              )
                            }
                          </div>
                        )
                      }

                      {currentUser.role === 'admin' && (
                        <div className={styles.actions}>
                          <span
                            onClick={() => router.push({
                              pathname: '/users/reset-password',
                              query: { id: user.id }
                            })}
                          >
                            <FaLock size={20} />
                          </span>
                          <span
                            onClick={() => router.push({
                              pathname: '/users/update',
                              query: { id: user.id }
                            })}
                          >
                            <FaEllipsisV size={20} />
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </main>

              : <p>Nenhum registro foi encontrado. Realize o cadastro de novos clientes.</p>
          }

        </div>

        {
          paginationInfo && (
            <Pagination
              limit={LIMIT}
              total={paginationInfo.total}
              offset={offset}
              setOffset={setOffset}
            />
          )
        }

      </div>
      <Footer />
    </>
  )
}