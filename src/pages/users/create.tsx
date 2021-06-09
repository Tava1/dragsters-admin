import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/AuthContext';
import Link from 'next/link';

import { Header } from '../../components/modules';
import { Input, Button } from '../../components/elements';

import api from '../../services/api';

import styles from '../../styles/pages/CreateUser.module.scss'

export default function Create() {
  const { token } = useAuth();
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const handleNewUser = async (data) => {
    await api.post('/users', data, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
      router.push('/users/List');

    }).catch((error) => {
      console.error(error);
    })
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.containerCreate}>
          <section className={styles.header}>
            <div>
              <h2>Novo Usuário</h2>
              <p>Reúna as informações necessárias e cadastre um novo usuário.</p>
            </div>
            <Link href="/users/List">Lista de usuários</Link>
          </section>

          <main>
            <form onSubmit={handleSubmit(handleNewUser)}>
              <Input
                name="fullname"
                type="text"
                title="Nome Completo"
                id="fullname"
                required
                register={register}
              />

              <div className={styles.inputGroup}>
                <Input
                  name="email"
                  type="mail"
                  title="E-mail"
                  id="email"
                  required
                  register={register}
                />

                <Input
                  name="password"
                  type="password"
                  title="Senha"
                  id="password"
                  required
                  register={register}
                />
              </div>

              <div className={styles.select}>
                <label htmlFor="role">Perfil</label>
                <select
                  id="role"
                  name="role"
                  {...register}
                >
                  <option value="none">Selecionar</option>
                  <option value="stockist">Estoquista</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>

              <div className={styles.actions}>
                <Link href="/users/List">Cancelar</Link>
                <Button
                  title="Salvar"
                  type="submit"
                />
              </div>
            </form>
          </main>
        </div>
      </div>
    </>
  )
}