import React, {useState, useEffect} from 'react'
import './App.css';
import {store} from './firebaseconfig'
import swal from 'sweetalert'

function App() {

  const[nombre, setNombre] = useState('')
  const[phone, setPhone] = useState('')
  const[usuariosAgenda, setUsuariosAgenda] = useState([])
  const[error, setError] = useState('')

  useEffect(() => {
    const getUsuarios = async() => {
      const { docs } = await store.collection('Agenda').get()
      const newArray = docs.map(item =>({id: item.id, ...item.data()}))
      setUsuariosAgenda(newArray)
    }
    getUsuarios()
  }, [])

  const setUsuarios = async (e) => {
    e.preventDefault()
    if(!nombre.trim()) {
      setError('El campo nombre está vacío')
    }
    if(!phone.trim()) {
      setError('El campo teléfono está vacío')
    }
    if(!phone.trim() && !nombre.trim()) {
      setError('Los campos nombre y teléfono están vacíos')
    }

    const usuario = {
      nombre: nombre,
      telefono: phone
    }

    try {
      const data = await store.collection('Agenda').add(usuario)
      const { docs } = await store.collection('Agenda').get()
      const newArray = docs.map(item =>({id: item.id, ...item.data()}))
      setUsuariosAgenda(newArray)
      console.log('Tarea añadida')
      swal(`Usuario ${nombre} registrado!`, `Se ha enviado un mensaje al número ${phone}`, "success")
    } catch (error) {
      console.error(error);
    }
    setNombre('')
    setPhone('')
  }

  return (
    <div className="App">
      <div className="row">
        <div className="col">
          <h2>Formulario de usuarios</h2>
          <form onSubmit={setUsuarios} className="form-group ml-3">
            <input 
              value={nombre}
              onChange={(e) =>{setNombre(e.target.value)}}
              className="form-control"
              type="text"
              placeholder="Introduce el nombre"
            />
            <input
              value={phone}
              onChange={(e) =>{setPhone(e.target.value)}}
              className="form-control mt-3"
              type="text"
              placeholder="Introduce el teléfono"
            />
            <input  type="submit" value="Registrar" className="btn btn-dark btn- mt-3"/>
          </form>
          {
            error ? 
            (
              <div><p className="alert alert-danger" role="alert">{error}</p></div>
            )
            :
            (<span></span>)
          }
        </div>
        <div className="col">
          <h2>Lista de tu agenda</h2>
          <ul className="list-group">
          {
            usuariosAgenda.length !== 0 ?
            (usuariosAgenda.map(item => (
              <li className="list-group-item" key={item.id}>{item.nombre} -- {item.telefono}</li>
            )))
            :
            (<span><p className="alert alert-warning" role="alert">Lo siento, no hay usuarios en tu agenda</p></span>)
          }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
