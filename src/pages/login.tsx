import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';

import Footer from '../components/modules/Footer';
import Button from '../components/elements/Button';
import Input from '../components/elements/Input';

import styles from '../styles/pages/Login.module.scss'

import { useAuth } from '../hooks/AuthContext';

const Header = dynamic(import('../components/modules/Header'), { ssr: false })

export default function Login() {
  const { register, handleSubmit } = useForm();

  const { signIn } = useAuth();

  return (
    <>
      <Header />
      <section className={styles.container}>
        <div className={styles.containerLogin}>
          <div className={styles.content}>
            <div>
              <h2>ACESSO AO SISTEMA</h2>
              <p>Apenas internos possuem acesso ao sistema. Para mais informações contacte um administrador.</p>
            </div>
            <div>
              <form onSubmit={handleSubmit(signIn)}>
                <Input
                  id="email"
                  name="email"
                  label="E-mail"
                  type="mail"
                  required
                  register={register}
                />

                <Input
                  id="password"
                  name="password"
                  label="Senha"
                  type="password"
                  required
                  register={register}
                />

                <Button
                  title="Entrar"
                  type="submit"
                />
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}