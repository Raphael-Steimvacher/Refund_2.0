import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { z, ZodError } from "zod"
import { AxiosError } from "axios"

import { CATEGORIES, CATEGORIES_KEYS } from "../Utils/Categories"
import fileSvg from "../assets/file.svg"
import { api } from "../Services/Api"

import { Input } from "../components/Input"
import { Select } from "../components/Select"
import { Upload } from "../components/Upload"
import { Button } from "../components/Button"
import { formatCurrency } from "../Utils/FormatCurrency"

const refundSchema = z.object({
  name: z.string().min(3, {
    message: "Informe um nome claro para sua solicitação de reembolso",
  }),
  category: z.string().min(1, { message: "Informe a categoria" }),
  amount: z.coerce
    .number({ message: "Informe um valor válido " })
    .positive({ message: "Informe um valor válido e superior a zero" }),
})

export function Refund() {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [fileURL, setFileURL] = useState<string | null>(null)

  const navigate = useNavigate()
  const Params = useParams<{ id: string }>()

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()

    if (Params.id) {
      return navigate(-1)
    }

    try {
      setIsLoading(true)

      if (!file) {
        return alert("selecione um arquivo de comprovante")
      }

      const fileUploadForm = new FormData()
      fileUploadForm.append("file", file)

      const response = await api.post("/uploads", fileUploadForm)

      const data = refundSchema.parse({
        name,
        category,
        amount: amount.replace(",", "."),
      })

      await api.post("/refunds", {
        ...data,
        filename: response.data.filename,
      })

      navigate("/confirm", { state: { fromSubmit: true } })
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        return alert(error.issues[0].message)
      }

      if (error instanceof AxiosError) {
        return alert(error.response?.data.message)
      }

      alert("Não foi possível realizar a solicitação")
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchRefund(id: string) {
    try {
      const { data } = await api.get<RefundAPIResponse>(`/refunds/${id}`)

      setName(data.name)
      setCategory(data.category)
      setAmount(formatCurrency(data.amount))
      setFileURL(data.filename)
    } catch (error) {
      console.log(error)

      if (error instanceof AxiosError) {
        return alert(error.response?.data.message)
      }

      alert("Não foi possível carregar")
    }
  }

  useEffect(() => {
    if (Params.id) {
      fetchRefund(Params.id)
    }
  }, [Params.id])

  return (
    <form
      onSubmit={onSubmit}
      className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-lg"
    >
      <header>
        <h1 className="text-xl font-bold text-gray-100">
          Solicitação de reembolso
        </h1>
        <p className="text-sm text-gray-200 mt-2 mb-4">
          Dados de despesa para solicitar reembolso.
        </p>
      </header>

      <Input
        required
        legend="Nome da solicitação"
        value={name}
        onChange={(event) => setName(event.target.value)}
        disabled={!!Params.id}
      />

      <div className="flex gap-4">
        <Select
          required
          legend="Categoria"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          disabled={!!Params.id}
        >
          {CATEGORIES_KEYS.map((category) => (
            <option key={category} value={category}>
              {CATEGORIES[category].name}
            </option>
          ))}
        </Select>

        <Input
          legend="Valor"
          required
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          disabled={!!Params.id}
        />
      </div>

      {Params.id && fileURL ? (
        <a
          href={`http://localhost:3333/uploads/${fileURL}`}
          target="_blank"
          className="text-sm text-green-100 font-semibold flex items-center justify-center gap-2 my-6 hover:opacity-70 transition ease-linear"
        >
          <img src={fileSvg} alt="Ícone de arquivo" />
          Abrir comprovante
        </a>
      ) : (
        <Upload
          filename={file && file.name}
          onChange={(event) =>
            event.target.files && setFile(event.target.files[0])
          }
        />
      )}

      <Button type="submit" isLoading={isLoading}>
        {Params.id ? "voltar" : "Enviar"}
      </Button>
    </form>
  )
}
