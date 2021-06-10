import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/AuthContext';
import Link from 'next/link';

import Input from '../../components/elements/Input';
import Button from '../../components/elements/Button';

import Header from '../../components/modules/Header';
import Footer from '../../components/modules/Footer';

import api from '../../services/api';

import styles from '../../styles/pages/UpdateUser.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateUserSchema } from '../../schema/user';

interface User {
  id: string;
  fullname: string;
  email: string,
  status: boolean;
  role: 'admin' | 'stockist';
  created_at: Date;
  updated_at: Date;
}

export default function Update() {
  const { token } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<User | null>();
  const [isActive, setIsActive] = useState<Boolean>();

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(updateUserSchema) });

  useEffect(() => {
    api.get(`/users/${id}`, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
      console.log(response.data)
      setUser(response.data);
      setIsActive(response.data.status);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  const handleUpdateUser = async (data) => {
    data.status = isActive;

    await api.put(`users/${id}`, data, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log(response)
        router.push('/users/list')
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const setStatus = (e) => {
    e.preventDefault();

    if (isActive === true) {
      setIsActive(false);
    }
    else {
      setIsActive(true);
    }
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.containerUpdate}>
          <section className={styles.header}>
            <div>
              <h2>Atualiazar Usuário</h2>
              <p>Atualize as informações do usuário.</p>
            </div>
            <Link href="/users/list">Lista de usuários</Link>
          </section>

          {user && (
            <main>
              <form onSubmit={handleSubmit(handleUpdateUser)}>

                <Input
                  name="fullname"
                  type="text"
                  title="Nome Completo"
                  id="fullname"
                  register={register}
                  required
                  defaultValue={user.fullname}
                  error={errors.fullname?.message}
                />

                <div className={styles.userEmail}>
                  <label>E-mail</label>
                  <span>{user.email}</span>
                </div>


                <div className={styles.select}>
                  <label htmlFor="role">Perfil</label>
                  <select
                    id="role"
                    name="role"
                    {...register('role')}
                    defaultValue={user.role}
                  >
                    <option value="none">Selecionar</option>
                    <option value="stockist">Estoquista</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>

                <div className={styles.status}>
                  <label>Ativo/Inativo</label>
                  {
                    isActive === true
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

                <div>
                  <Link href="/users/PasswordReset">
                    <a>Redefinir Senha</a>
                  </Link>
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
          )}

        </div>
      </div>
      <Footer />
    </>
  )
}