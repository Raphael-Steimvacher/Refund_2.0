import { useState } from "react"

import { Input } from "../components/input"

export function Dashboard() {
  const [name, setName] = useState("")
  function fetchRefunds(event: React.FormEvent) {
    event.preventDefault()
  }
  return (
    <div className="bg-gray-500 rounded-xl p-10 md:min-w-[768px]">
      <h1 className="text-g-100 font-bold text-xl flex-1">Solicitações</h1>

      <form
        onSubmit={fetchRefunds}
        className="flex flex-1 items-center justify-between pb-6 border-b-[1px] border-b-gray-400 md:flex-row gap-2 mt-6"
      >
        <Input
          placeholder="Pesquisar pelo nome"
          onChange={(event) => setName(event.target.value)}
        />
      </form>
    </div>
  )
}
