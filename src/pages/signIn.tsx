import { useActionState } from "react"

import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { string } from "zod"

export function SignIn() {
  const [state, formAction, isLoading] = useActionState(signIn, null)

  async function signIn(prevState: any, formData: FormData) {
    const email = formData.get("email")
    const password = formData.get("password")

    return { email, password }
  }

  return (
    <form action={formAction} className="w-full flex flex-col gap-4">
      <Input
        name="email"
        required
        legend="E-mail"
        type="email"
        placeholder="SeuEmail@email.com"
        defaultValue={String(state?.email)}
        autoComplete="username"
      />

      <Input
        name="password"
        required
        legend="Senha"
        type="password"
        placeholder="S1234!"
        defaultValue={String(state?.password)}
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
