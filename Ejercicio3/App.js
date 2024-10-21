import React, { useState, useEffect, useCallback, useRef } from 'react';

//Creamos una clase donde se estructura un evento. Los datos del evento se manejaran en un objeto especifico (Encapsulacion)
class Evento {
  constructor(id, titulo, descripcion, fecha, ubicacion) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.fecha = fecha;
    this.ubicacion = ubicacion;
  }
}

//Componente principal que contendra toda la logica del gestor de eventos
function App() {
  //Usamos useState para manejar la lista de eventos (Estado local)
  const [eventos, setEventos] = useState([]); 

  //Almacenamos el evento actualmente seleccionado para editarlo (Estado de adicion)
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null); 

  //Usamos useRef para referenciar los inputs del formulario, evitando renders innecesarios
  const tituloRef = useRef();
  const descripcionRef = useRef();
  const fechaRef = useRef();
  const ubicacionRef = useRef();

  //Encapsulamos la creacion de eventos usando un callback para evitar recrear la funcion en cada render
  const crearEvento = useCallback(() => {
    const nuevoEvento = new Evento(
      Date.now(),  //El ID es unico basado en el timestamp actual
      tituloRef.current.value,
      descripcionRef.current.value,
      fechaRef.current.value,
      ubicacionRef.current.value
    );

    setEventos((prevEventos) => [...prevEventos, nuevoEvento]);  //Este sera la actualizacion inmutable del estado
    limpiarFormulario();  //Aqui limpiamos el formulario al finalizar la creacion
  }, []);

  //Guardamos el evento seleccionado en el estado y rellenamos el formulario para edicion
  const seleccionarEvento = useCallback((evento) => {
    setEventoSeleccionado(evento);
    tituloRef.current.value = evento.titulo;
    descripcionRef.current.value = evento.descripcion;
    fechaRef.current.value = evento.fecha;
    ubicacionRef.current.value = evento.ubicacion;
  }, []);

  //Actualizamos un evento seleccionado al reusar la clase Evento (Polimorfismo)
  const actualizarEvento = useCallback(() => {
    const eventoActualizado = new Evento(
      eventoSeleccionado.id,
      tituloRef.current.value,
      descripcionRef.current.value,
      fechaRef.current.value,
      ubicacionRef.current.value
    );

    //Creamos un nuevo array con los cambios aplicados
    setEventos((prevEventos) =>
      prevEventos.map((evento) =>
        evento.id === eventoSeleccionado.id ? eventoActualizado : evento
      )
    );

    setEventoSeleccionado(null);  //Se resetea el estado de seleccion
    limpiarFormulario();  //Se limpia el formulario
  }, [eventoSeleccionado]);

  //Usamos un callback para evitar una recreacion innecesaria en cada render por eso eliminamos el evento
  const eliminarEvento = useCallback((id) => {
    setEventos((prevEventos) => prevEventos.filter((evento) => evento.id !== id)); 
  }, []);

  //Reseteamos los valores de los inputs para la limpieza del formulario
  const limpiarFormulario = () => {
    tituloRef.current.value = '';
    descripcionRef.current.value = '';
    fechaRef.current.value = '';
    ubicacionRef.current.value = '';
  };

  //Usamos useEffect para ejecutar cada vez que se cambie la lista de eventos (Monitoreo del estado)
  useEffect(() => {
    console.log('Eventos cargados:', eventos);  //Monitoreo del estado
  }, [eventos]);  //Solo se ejecutara cuando los eventos cambien

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gestión de Eventos</h1>

      {/* Formulario para crear o actualizar eventos */}
      <div>
        <input ref={tituloRef} type="text" placeholder="Título" />
        <input ref={descripcionRef} type="text" placeholder="Descripción" />
        <input ref={fechaRef} type="date" placeholder="Fecha" />
        <input ref={ubicacionRef} type="text" placeholder="Ubicación" />

        {eventoSeleccionado ? (
          <button onClick={actualizarEvento}>Actualizar Evento</button>
        ) : (
          <button onClick={crearEvento}>Crear Evento</button>
        )}
      </div>

      {/* Lista de eventos disponibles */}
      <h2>Lista de Eventos</h2>
      <ul>
        {eventos.map((evento) => (
          <li key={evento.id}>
            <strong>{evento.titulo}</strong> - {evento.descripcion} - {evento.fecha} - {evento.ubicacion}
            <button onClick={() => seleccionarEvento(evento)}>Editar</button>
            <button onClick={() => eliminarEvento(evento.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

