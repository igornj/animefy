/* eslint-disable @typescript-eslint/no-unused-vars */

import Router from './routes/routes';
import { store } from './features/store';
//import { Provider } from 'react-redux'

const App: React.FC = () => {
  return (

    <>
      <Router />
    </>

  );
}

export default App;
