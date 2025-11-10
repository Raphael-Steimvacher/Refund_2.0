import { BrowserRouter } from "react-router"

import { useAuth } from "../Hooks/useAuth"

import { Loading } from "../components/Loading"

import { AuthRoutes } from "./AuthRoutes"
import { EmployeeRoutes } from "./EmployeeRoutes"
import { ManagerRoutes } from "./managerRoutes"

const isLoading = false

export function Routes() {
  const { session } = useAuth()

  function Route() {
    switch (session?.user.role) {
      case "employee":
        return <EmployeeRoutes />
        break
      case "manager":
        return <ManagerRoutes />
        break
      default:
        return <AuthRoutes />
        break
    }
  }

  if (isLoading) {
    return <Loading />
  }
  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  )
}
