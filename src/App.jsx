import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="row">
        <div className="col">
          <h2>Formulario de usuarios</h2>
          <form className="form-group">
            <input 
              className="form-control"
              type="text"
              placeholder="Introduce el nombre"
            />
            <input
              className="form-control mt-3"
              type="text"
              placeholder="Introduce el nombre"
            />
            <input type="submit" value="Registrar" className="btn btn-dark btn- mt-3"/>
          </form>
        </div>
        <div className="col">

        </div>
      </div>
    </div>
  );
}

export default App;
