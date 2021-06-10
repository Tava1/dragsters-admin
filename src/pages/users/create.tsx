import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/AuthContext';
import Link from 'next/link';

import Header from '../../components/modules/Header';
import Input from '../../components/elements/Input';
import Button from '../../components/elements/Button';

import api from '../../services/api';

import styles from '../../styles/pages/CreateUser.module.scss'
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserSchema } from '../../schema/user';

export default function Create() {
  const { token } = useAuth();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(createUserSchema) });

  const handleNewUser = async (data) => {
    console.log(data);
    await api.post('/users', data, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log(response);
        router.push('/users/list');
      })
      .catch((error) => {
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
            <Link href="/users/list">Lista de usuários</Link>
          </section>

          <main>
            <form onSubmit={handleSubmit(handleNewUser)}>
              <Input
                name="fullname"
                type="text"
                label="Nome Completo"
                id="fullname"
                required
                register={register}
                error={errors.fullname?.message}
              />

              <div className={styles.inputGroup}>
                <Input
                  name="email"
                  type="mail"
                  label="E-mail"
                  id="email"
                  required
                  register={register}
                  error={errors.email?.message}
                />

                <Input
                  name="password"
                  type="password"
                  label="Senha"
                  id="password"
                  required
                  register={register}
                  error={errors.password?.message}
                />
              </div>

              <div className={styles.select}>
                <label htmlFor="role">Perfil</label>
                <select
                  id="role"
                  name="role"
                  {...register('role')}
                >
                  <option value="none">Selecionar</option>
                  <option value="stockist">Estoquista</option>
                  <option value="admin">Administrador</option>
                </select>
                <span>{errors.role?.message}</span>
              </div>

              <div className={styles.actions}>
                <Link href="/users/list">Cancelar</Link>
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