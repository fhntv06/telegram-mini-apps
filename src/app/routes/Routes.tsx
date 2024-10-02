import { Route, Routes as Switch } from "react-router-dom";
import { Main, UI } from "../../pages";

export const Routes = () => {
  // docs path for build

  return (
      <Switch>
        <Route
          path='/ui'
          element={<UI />}
        />

        <Route
          path='/'
          element={<Main />}
        />
      </Switch>
  )
}
