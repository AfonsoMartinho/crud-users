import React from 'react';
import { observer } from 'mobx-react-lite';
import './app.gb.scss';
import { UsersPage } from './views/UsersPage';


export const App: React.FC = observer((props) => {
    return (
        <div className="crud-users">
          <UsersPage />
        </div>
    );
  }
);

export default App
