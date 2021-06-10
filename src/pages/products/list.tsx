import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaEye, FaEllipsisV } from 'react-icons/fa';
import Link from 'next/link';

import Header from '../../components/modules/Header';
import Footer from '../../components/modules/Footer';
import Loading from '../../components/modules/Loading';

import styles from '../../styles/pages/ListProducts.module.scss'

import api from '../../services/api';

export default function List() {
  const router = useRouter();
  const [hasLoading, setHasLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products').then((response) => {
      setProducts(response.data);
    });

    setHasLoading(false);
  }, [products]);

  async function setStatusProductTrue(id) {
    await api.patch(`/products/${id}/true`).then((response) => {
      console.log(response.data)
    })
  }

  async function setStatusProductFalse(id) {
    await api.patch(`/products/${id}/false`).then((response) => {
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
              <h2>Produtos <strong>{products.length}</strong></h2>
              <p>Gerenciamento de produtos cadastrados no sistema.</p>
            </div>
            <Link href="/products/create">Novo Produto</Link>
          </section>

          {hasLoading ? <Loading /> :
            products.length > 0 ?
              <main>
                <div className={styles.listHeader}>
                  <div className={styles.id}>
                    <span>#ID</span>
                  </div>
                  <div className={styles.title}>
                    <span>TITULO</span>
                  </div>
                  <div className={styles.description}>
                    <span>DESCRIÇÃO</span>
                  </div>
                  <div className={styles.rating}>
                    <span>AVALIAÇÃO</span>
                  </div>
                  <div className={styles.supply}>
                    <span>ESTOQUE</span>
                  </div>
                  <div className={styles.price}>
                    <span>PREÇO</span>
                  </div>
                  <div className={styles.actions}>
                    <span>AÇÕES</span>
                  </div>
                </div>

                {products && products.map(product => (
                  <div className={styles.listBody}>
                    <div key={product.product_id} className={styles.line}>
                      <div className={styles.id}>
                        <span>###</span>
                      </div>
                      <div className={styles.title}>
                        <span>{product.product_name}</span>
                      </div>
                      <div className={styles.description}>
                        <span>{product.product_fullname}</span>
                      </div>
                      <div className={styles.rating}>
                        <span>{product.stars}</span>
                      </div>
                      <div className={styles.supply}>
                        <span>{product.supply}</span>
                      </div>
                      <div className={styles.price}>
                        <span>R${product.price}</span>
                      </div>
                      <div className={styles.status}>
                        {
                          product.status
                            ?
                            <button
                              className={styles.active}
                              onClick={() => setStatusProductFalse(product.product_id)}
                            >
                              INATIVAR
                        </button>
                            :
                            <button
                              className={styles.inactive}
                              onClick={() => setStatusProductTrue(product.product_id)}
                            >
                              REATIVAR
                        </button>
                        }
                      </div>
                      <div className={styles.actions}>

                        <span
                          onClick={() => router.push({
                            pathname: '/showcase',
                            query: { id: product.product_id }
                          })}
                        >
                          <FaEye size={20} />
                        </span>
                        <span
                          onClick={() => router.push({
                            pathname: '/products/update',
                            query: { id: product.product_id }
                          })}
                        >
                          <FaEllipsisV size={20} />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </main>

              : <p>Nenhum registro foi encontrado. Realize o cadastro de novos produtos.</p>
          }
        </div>
      </div>
      <Footer />
    </>
  )
}