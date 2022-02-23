/* eslint-disable @typescript-eslint/no-unused-vars */

import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";

import { TokenContextProvider } from './context/tokenContext';
import Router from './routes/routes';

//If i can get the code from the url, it means that the user logged in
//{code ? <Dashboard /> : <Login />} 
// export const code = new URLSearchParams(window.location.search).get("code") as string

// localStorage.setItem('code', code);

// if (!code) console.log('App não pegou nenhum code');

const App: React.FC = () => {
  return (
    // <TokenContextProvider>
    <>
      <Router />
    </>


    // </TokenContextProvider>
  );
}

export default App;
