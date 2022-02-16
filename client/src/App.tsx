/* eslint-disable @typescript-eslint/no-unused-vars */

import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";

import { TokenContextProvider } from './hooks/tokenContext';

//If i can get the code from the url, it means that the user logged in
export const code = new URLSearchParams(window.location.search).get("code") as string

const App: React.FC = () => {
  return (
    <TokenContextProvider>
      {code ? <Dashboard code={code} /> : <Login />}
    </TokenContextProvider>
  );
}

export default App;
