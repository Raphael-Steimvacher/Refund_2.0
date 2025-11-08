import { BrowserRouter } from "react-router"

import { Loading } from "../components/Loading"

import { AuthRoutes } from "./AuthRoutes"
import { EmployeeRoutes } from "./EmployeeRoutes"
import { ManagerRoutes } from "./managerRoutes"

const isLoading = false

const session = {
  user: {
    role: "",
  },
}

export function Routes() {
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
