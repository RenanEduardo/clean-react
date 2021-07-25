import React from 'react'
import Styles from './login-styles.scss'
import { LoginHeader, Input, FormStatus, Footer } from '@/presentation/components'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form action="" className={Styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite sua e-mail"/>
        <Input type="password" name="password" placeholder="Digite sua senha"/>
        <button className={Styles.submit} type="submit">Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export default Login