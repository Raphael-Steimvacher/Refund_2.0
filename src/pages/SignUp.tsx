import { useState } from "react"

import { Input } from "../components/input"
import { Button } from "../components/Button"

export function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()
  }

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
      <Input
        required
        legend="Nome"
        placeholder="Seu Nome"
        onChange={(event) => setName(event.target.value)}
      />

      <Input
        required
        legend="Email"
        type="email"
        placeholder="SeuEmail@email.com"
        onChange={(event) => setEmail(event.target.value)}
      />

      <Input
        required
        legend="Senha"
        type="password"
        placeholder="S1234!"
        onChange={(event) => setPassword(event.target.value)}
      />

      <Input
        required
        legend="Confirme a Senha"
        type="password"
        placeholder="S1234!"
        onChange={(event) => setPasswordConfirm(event.target.value)}
      />

      <Button type="submit" isLoading={isLoading}>
        Criar conta
      </Button>

      <a
        href="/"
        className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear"
      >
        Já tenho uma conta
      </a>
    </form>
  )
}
