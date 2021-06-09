import { useEffect, useState } from 'react';

import Header from '../../components/modules/Header';
import Footer from '../../components/modules/Footer';
import ProductCard from '../../components/modules/ProductCard';

import styles from "../../styles/pages/ShowProducts.module.scss"
import api from '../../services/api';

export default function ShowProducts() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('products').then((response) => {
      setProducts(response.data);
    }).catch((error) => {
      console.log(error)
    });
  }, []);

  return (
    <>
      <Header />

      <div className={styles.hero}>
        <div className={styles.banner}></div>
        <div className={styles.logo}>
          <img src="/assets/images/vossen-logo.png" alt="Vossen" />
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.grid}>

          {products ? products.map(product => (
            <ProductCard
              key={product.product_id}
              id={product.product_id}
              showcase={product.showcases[0].path}
              title={product.product_name}
              fullTitle={product.product_fullname}
              price={product.price}
              brand={product.brand}
            />
          )) : <p>Nao tem nada</p>}
        </div>
      </div>

      <Footer />
    </>
  )
}