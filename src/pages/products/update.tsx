import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Header from '../../components/modules/Header';

import Input from '../../components/elements/Input';
import Button from '../../components/elements/Button';
import TextArea from '../../components/elements/TextArea';

import styles from '../../styles/pages/UpdateProduct.module.scss';
import api from '../../services/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateProductSchema } from '../../schema/product';

interface ShowcaseInfo {
  id: string;
  filename: string;
  path: string;
}

interface ProductDetail {
  product_id: string;
  product_name: string;
  product_fullname: string,
  brand: string;
  description: string;
  stars: number;
  status: boolean;
  supply: number;
  price: string;
  showcase: ShowcaseInfo[]
}

export default function Update() {
  const router = useRouter();
  const { id } = router.query;

  const [productDetail, setProductDetail] = useState<ProductDetail | null>();
  const [productId, setProductID] = useState('');
  const [isActive, setIsActive] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(updateProductSchema) });

  useEffect(() => {
    api.get(`/products/${id}`).then((response) => {
      const { product } = response.data

      setProductDetail(product)
      setProductID(product.product_id);
      setIsActive(product.status);
    }).catch((error) => {
      console.error(error);
    })
  }, []);

  const setStatus = (e) => {
    e.preventDefault();

    if (isActive) {
      setIsActive(false);
      console.log(`to false: ${isActive}`)
      return;
    }
    setIsActive(true);
    console.log(`to true: ${isActive}`)
  }

  const handleUpdateProduct = async (data) => {
    console.log(data)

    data.status = isActive;

    await api.put(`/products/${id}`, data).then((response) => {
      console.log(response);
      router.push('/products/list');
    }).catch((error => {
      console.error(error)
    }));
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.containerUpdate}>

          <header>
            <div>
              <h2>Atualiazar Produto <strong>{productId}</strong></h2>
              <p>Atualize as informações do produto.</p>
            </div>
          </header>

          {productDetail && (
            <main>
              <form onSubmit={handleSubmit(handleUpdateProduct)}>
                <div className={styles.inputGroup}>
                  <Input
                    name="product_name"
                    type="text"
                    label="Titulo"
                    id="product_name"
                    required
                    register={register}
                    defaultValue={productDetail.product_name}
                    error={errors.product_name?.message}
                  />

                  <Input
                    name="product_fullname"
                    type="text"
                    label="Titulo completo"
                    id="product_fullname"
                    required
                    register={register}
                    defaultValue={productDetail.product_fullname}
                    error={errors.product_fullname?.message}
                  />

                  <Input
                    name="brand"
                    type="text"
                    label="Marca"
                    id="product_brand"
                    required
                    register={register}
                    defaultValue={productDetail.brand}
                    error={errors.brand?.message}
                  />
                </div>

                <TextArea
                  id="description"
                  name="description"
                  label="Descrição"
                  defaultValue={productDetail.description}
                  required
                  register={register}
                  error={errors.description?.message}

                />

                <div className={styles.inputGroup}>
                  <Input
                    name="supply"
                    type="number"
                    title="Estoque"
                    id="supply"
                    required
                    defaultValue={productDetail.supply}
                    register={register}
                    error={errors.supply?.message}
                  />

                  <Input
                    name="price"
                    type="number"
                    title="Preço"
                    id="price"
                    required
                    defaultValue={productDetail.price}
                    register={register}
                    error={errors.price?.message}
                  />

                  <Input
                    name="stars"
                    type="number"
                    title="Avaliação"
                    id="stars"
                    disabled
                    required
                    defaultValue={productDetail.stars}
                    register={register}
                  />

                  <div className={styles.status}>
                    <label>Ativo/Inativo</label>
                    {
                      isActive
                        ?
                        <button
                          className={styles.active}
                          onClick={setStatus}
                        >
                          INATIVAR
                        </button>
                        :
                        <button
                          className={styles.inactive}
                          onClick={setStatus}
                        >
                          REATIVAR
                        </button>
                    }
                  </div>
                </div>

                <div className={styles.actions}>
                  <Link href="/products/list">Cancelar</Link>
                  <Button
                    title="Salvar"
                    type="submit"
                  />
                </div>
              </form>
            </main>
          )}

        </div>
      </div>
    </>
  )
}