import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/AuthContext';
import Link from 'next/link';

import Input from '../../components/elements/Input';
import Button from '../../components/elements/Button';

import Header from '../../components/modules/Header';
import Footer from '../../components/modules/Footer';


import styles from '../../styles/pages/CreateProduct.module.scss'
import api from '../../services/api';

export default function ResetPassword() {
  const router = useRouter();
  const { token } = useAuth();
  const { register, handleSubmit } = useForm();

  const handleUpdatePassword = async (data) => {
    const { id } = router.query;

    if (data.password === data.repeatPassword) {
      await api.patch(`/users/password/${id}`, { password: data.password }, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
        router.push('/users/list')
      }).catch((error) => {
        console.error(error);
      })
    }
  };
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.containerCreate}>

          <main>
            <form onSubmit={handleSubmit(handleUpdatePassword)}>

              <p>Se deseja efetuar a redefinição de senha do usuário responsável pelo e-mail: <strong>djjfd@jhss.com</strong>. Basta preencher os campos abaixo.</p>

              <div className={styles.inputGroup}>
                <Input
                  name="password"
                  type="password"
                  title="Senha"
                  id="password"
                  register={register}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <Input
                  name="repeatPassword"
                  type="password"
                  title="Confirme a senha"
                  id="password"
                  register={register}
                  required
                />
              </div>

              <div className={styles.actions}>
                <Link href="/users/list">Cancelar</Link>
                <Button
                  title="Próximo"
                  type="submit"
                />
              </div>
            </form>
          </main>
        </div>
      </div>
      <Footer />
    </>
  )
}