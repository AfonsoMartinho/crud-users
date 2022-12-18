import './app.gb.scss';
import { Homepage } from './views/homepage';

export const App: React.FC = (props) => {
  return (
    <div className="crud-users">
      <Homepage />
    </div>
  )
}

export default App
