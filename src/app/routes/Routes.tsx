import { Route, Routes as Switch } from "react-router-dom";
import { Main, UI } from "../../pages";

export const Routes = () => {
  // docs path for build

  return (
      <Switch>
        <Route
          path='/telegram-mini-apps/ui'
          element={<UI />}
        />

        <Route
          path='/telegram-mini-apps/'
          element={<Main />}
        />
      </Switch>
  )
}
