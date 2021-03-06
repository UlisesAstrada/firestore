import React, {useState, useEffect} from 'react'
import './App.css';
import {store} from './firebaseconfig'
import swal from 'sweetalert'

function App() {

  const[modoEdicion, setModoEdicion] = useState(null)
  const[idUsuario, setIdUsuario] = useState('')
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
      console.log('Usuario añadido')
      swal(`Usuario ${nombre} registrado!`, `Número agendado: ${phone}`, "success")
    } catch (error) {
      console.error(error);
    }
    setNombre('')
    setPhone('')
  }

  const deleteUser = async (id) => {
    try {
      await store.collection('Agenda').doc(id).delete()
      const { docs } = await store.collection('Agenda').get()
      const newArray = docs.map(item =>({id: item.id, ...item.data()}))
      setUsuariosAgenda(newArray)
      console.log('Usuario eliminado')
    } catch (error) {
      console.error(error)
    }
  }

  const editUser = async (id) => {
    try {
      const data = await store.collection('Agenda').doc(id).get()
      const { nombre, telefono } = data.data()
      setIdUsuario(id)
      setNombre(nombre)
      setPhone(telefono)
      setModoEdicion(true)
      console.log(data.data())
    } catch (error) {
      console.error(error);
    }
  }

  const setUpdate = async (e) => {
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
    
    const updatedUser = {
      nombre: nombre,
      telefono: phone
    }

    try {
      await store.collection('Agenda').doc(idUsuario).set(updatedUser)
      const { docs } = await store.collection('Agenda').get()
      const newArray = docs.map(item =>({id: item.id, ...item.data()}))
      setUsuariosAgenda(newArray)
    } catch (error) {
      console.error(error);
    }
    
    setNombre('')
    setPhone('')
    setIdUsuario('')
    setModoEdicion(false)
  }
  

  return (
    <div className="App">
      <div className="row">
        <div className="col">
          <h2>Agregar contacto</h2>
          <form onSubmit={modoEdicion ? setUpdate : setUsuarios} className="form-group ml-3">
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
            {
              modoEdicion ?
              (
                <input  type="submit" value="EDITAR" className="btn btn-dark btn- mt-3"/>
              )
              :
              (
                <input  type="submit" value="REGISTRAR" className="btn btn-dark btn- mt-3"/>
              )
            }
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
                <li className="list-group-item" key={item.id}>{item.nombre} -- {item.telefono}
                  <button onClick={(id) => {editUser(item.id)}} className="btn btn-primary float-right ml-2">EDITAR</button>
                  <button onClick={(id) => {deleteUser(item.id)}} className="btn btn-danger float-right">ELIMINAR</button>
                </li>
            )))
            :
            (<span><p className="alert alert-warning" role="alert">No hay usuarios en tu agenda</p></span>)
          }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
