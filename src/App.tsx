import { useState } from 'react';
import Language from './pages/Language';
import ProductKey from './pages/ProductKey';

function App() {

  const [state, setState] = useState(0);

  const goToProductKey = () => {
    setState(1);
  }

  const goToOsSelection = () => {
    setState(2);
  }

  const validateKey = (key: string[]) => {
    for(let i = 0; i < key.length; i++) {
      if(key[i].length !== 5) {
        return;
      }
    }
    setState(3);
  }

  switch (state) {
    case 0:
      return (
        <Language goToProductKey={goToProductKey} /> 
      )
    case 1:
      return (
        <ProductKey goToOsSelection={goToOsSelection} validateKey={validateKey} />
      )
  }
}

export default App
