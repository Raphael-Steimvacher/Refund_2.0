import { BrowserRouter } from "react-router"

import { Loading } from "../components/Loading"

import { AuthRoutes } from "./AuthRoutes"
import { EmployeeRoutes } from "./EmployeeRoutes"
import { ManagerRoutes } from "./managerRoutes"

const isLoading = false

export function Routes() {
  if (isLoading) {
    return <Loading />
  }
  return (
    <BrowserRouter>
      <ManagerRoutes />
    </BrowserRouter>
  )
}
