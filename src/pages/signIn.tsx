import { useState } from "react"

import { Input } from "../components/input"
import { Button } from "../components/Button"

export function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  function onSubmit(event: React.FormEvent) {
    e.preventDefault()
  }

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
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

      <Button type="submit" isLoading={isLoading}>
        Entrar
      </Button>
    </form>
  )
}
