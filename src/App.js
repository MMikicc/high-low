import React from 'react';
import { Provider } from 'react-redux';
import Canvas from './Core/Canvas';
import Interface from './Interface/Interface';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <div>
        <Canvas />
        <div className="container-fluid">
          <Interface />
        </div>
      </div>
    </Provider>
  );
}

