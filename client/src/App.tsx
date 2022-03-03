/* eslint-disable @typescript-eslint/no-unused-vars */

import Router from './routes/routes';
import { DataContextProvider } from './context/dataContext';

const App: React.FC = () => {
  return (

    <>
      <DataContextProvider>
        <Router />
      </DataContextProvider>
    </>

  );
}

export default App;
