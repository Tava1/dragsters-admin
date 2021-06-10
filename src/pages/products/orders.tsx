import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaEye, FaEllipsisV, FaBars } from 'react-icons/fa';
import Link from 'next/link';
import { format } from 'cpf';

import Header from '../../components/modules/Header';
import Footer from '../../components/modules/Footer';
import Loading from '../../components/modules/Loading';

import styles from '../../styles/pages/Orders.module.scss'

import api from '../../services/api';

interface MyOrders {
  id: string;
  customers_id: string;
  order_number: string;
  shipping: number;
  order_status: {
    id: number;
    description: string;
  }
  total: number;
  updated_at: Date;
  created_at: Date;
  customer: {
    id: string;
    cpf: string;
  }
}

interface OrdersResponse {
  orders: MyOrders[];
}

export default function Orders() {
  const router = useRouter();
  const [ordersAvailable, setOrdersAvailable] = useState<OrdersResponse>({} as OrdersResponse);
  const [statusOrderChanged, setStatusOrderChanged] = useState({});

  useEffect(() => {
    api.get('/order').then(response => {
      setOrdersAvailable(response.data);

      console.log(response.data)
    }).catch((error) => {
      console.error(error);
    })
  }, [statusOrderChanged]);

  const changeStatus = async (value, order_id) => {
    const data = {
      "order_status_id": value
    }

    api.patch(`/order/update-status/${order_id}`, data).then(response => {
      setStatusOrderChanged(response.data)
    }).catch((error) => {
      console.error(error);
    })
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.containerList}>
          <section className={styles.header}>
            <div>
              <h2>Pedidos</h2>
              <p>Gerenciamento de pedidos.</p>
            </div>
          </section>

          <div className={styles.orders}>
            {ordersAvailable && ordersAvailable.orders?.map(ord => (
              <div key={ord.id} className={styles.ordersRow}>
                <div className={styles.ordersItem}>
                  <span>#{ord.order_number}</span>
                  <span>CPF: {format(ord.customer.cpf)}</span>
                </div>
                <div className={styles.ordersItem}>
                  <span>Data da compra: {new Date(ord.created_at).toLocaleString()}</span>
                  <span>Última atualização: {new Date(ord.updated_at).toLocaleString()}</span>
                  <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(ord.total) + Number(ord.shipping))}</span>
                  <select onChange={(e) => changeStatus(e.target.value, ord.id)} value={ord.order_status.id} name="" id="">
                    <option value="1">Aguardando pagamento</option>
                    <option value="2">Pagamento Rejeitado</option>
                    <option value="3">Pagamento Aprovado</option>
                    <option value="4">Aguardando Retirada</option>
                    <option value="5">Em trânsito</option>
                    <option value="6">Entregue</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}