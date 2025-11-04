import { Input } from "../components/input"
import { Button } from "../components/Button"

export function SignIn() {
  return (
    <form action="" className="w-full flex flex-col gap-4">
      <Input
        required
        legend="Email"
        type="email"
        placeholder="SeuEmail@email.com"
      />

      <Input required legend="Senha" type="password" placeholder="S1234!" />

      <Button>Entrar</Button>
    </form>
  )
}
