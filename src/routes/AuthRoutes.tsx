import { Route, Routes } from "react-router"

import { AuthLayout } from "../components/AuthLayout"

import { SignIn } from "../pages/signIn"
import { SignUp } from "../pages/SignUp"
import { NotFound } from "../pages/NotFound"

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
