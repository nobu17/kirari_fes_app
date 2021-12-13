import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAdminAuth } from "../../contexts/AdminAuthContext"

export default function AdminLoginRoute({ component: Component, ...rest }: any) {
  const { state } = useAdminAuth()

  return (
    <Route
      {...rest}
      render={(props) => {
        return state.isAuthrized ? <Redirect to="/admin" /> : <Component {...props} />
      }}
    ></Route>
  )
}
