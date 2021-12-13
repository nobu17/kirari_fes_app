import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useUserAuth } from "../../contexts/UserAuthContext"

export default function LoginRoute({ component: Component, ...rest }: any) {
  const { state } = useUserAuth()

  return (
    <Route
      {...rest}
      render={(props) => {
        return state.isAuthrized ? <Redirect to="/" /> : <Component {...props} />
      }}
    ></Route>
  )
}
