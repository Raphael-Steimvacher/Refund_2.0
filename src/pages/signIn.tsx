import { useState } from "react"

import { Input } from "../components/Input"
import { Button } from "../components/Button"

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)

  function onAction(formData: FormData) {
    // const email = formData.get("email")
    console.log(formData.get("email"))
  }

  return (
    <form action={onAction} className="w-full flex flex-col gap-4">
      <Input
        name="email"
        required
        legend="E-mail"
        type="email"
        placeholder="SeuEmail@email.com"
        autoComplete="username"
      />

      <Input
        name="password"
        required
        legend="Senha"
        type="password"
        placeholder="S1234!"
        autoComplete="current-password"
      />

      <Button type="submit" isLoading={isLoading}>
        Entrar
      </Button>

      <a
        href="/signUp"
        className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear"
      >
        Criar Conta
      </a>
    </form>
  )
}
