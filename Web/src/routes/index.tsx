import { BrowserRouter } from "react-router"

import { useAuth } from "../Hooks/useAuth"

import { Loading } from "../components/Loading"

import { AuthRoutes } from "./AuthRoutes"
import { EmployeeRoutes } from "./EmployeeRoutes"
import { ManagerRoutes } from "./managerRoutes"

export function Routes() {
  const { session, isLoading } = useAuth()

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
