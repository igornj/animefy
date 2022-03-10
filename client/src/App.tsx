/* eslint-disable @typescript-eslint/no-unused-vars */

import Router from './routes/routes';
import { DataContextProvider } from './context/dataContext';
import GlobalStyle from './styles/globalStyles';

const App: React.FC = () => {
  return (

    <>
      <GlobalStyle />
      <DataContextProvider>
        <Router />
      </DataContextProvider>
    </>

  );
}

export default App;
