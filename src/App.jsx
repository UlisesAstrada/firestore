import React, {useState, useEffect} from 'react'
import './App.css';

function App() {

  const[nombre, setNombre] = useState('')
  const[phone, setPhone] = useState('')
  const[usuario, setUsuario] = useState([])

  const setUsuarios = (e) => {
    e.preventDefault()
    if(!nombre.trim()) 
  }

  return (
    <div className="App">
      <div className="row">
        <div className="col">
          <h2>Formulario de usuarios</h2>
          <form className="form-group ml-3">
            <input 
              onChange={(e) =>{setNombre(e.target.value)}}
              className="form-control"
              type="text"
              placeholder="Introduce el nombre"
            />
            <input
              onChange={(e) =>{setPhone(e.target.value)}}
              className="form-control mt-3"
              type="text"
              placeholder="Introduce el número"
            />
            <input  type="submit" value="Registrar" className="btn btn-dark btn- mt-3"/>
          </form>
        </div>
        <div className="col">
          <h2>Lista de tu agenda</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
