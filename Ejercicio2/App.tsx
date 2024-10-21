import React, { useEffect, useState, useReducer, useContext, useRef, useMemo, useCallback, createContext, ReactNode } from "react";

//Usamos Interface para definir el tipo de datos del estado global
interface Estado {
  datos: string[];  
  filtro: string;   
}

//Definimos las acciones que el reducer puede manejar
type Accion = 
  | { type: "AGREGAR_DATO"; payload: string }  //Agregamos un nuevo dato
  | { type: "FILTRAR"; payload: string };      //Filtramos los datos existentes

//Usamos Reducer para manejar las transiciones del estado en funcion de las acciones
function estadoReducer(estado: Estado, accion: Accion): Estado {
  switch (accion.type) {
    case "AGREGAR_DATO":
      return { ...estado, datos: [...estado.datos, accion.payload] };  //Añadimos un nuevo dato
    case "FILTRAR":
      return { ...estado, filtro: accion.payload };  //Actualizamos el filtro
    default:
      return estado;  //Retornamos el estado sin cambios si la accion no es válida
  }
}

//Creamos el estado inicial del contexto
const estadoInicial: Estado = { datos: [], filtro: "" };

//Creamos un contexto para gestionar el estado global de la aplicacion
const EstadoContext = createContext<{ estado: Estado; dispatch: React.Dispatch<Accion> } | undefined>(undefined);

//Creaos el proveedor del contexto que permitira que los componentes accedan al estado global
const EstadoProvider = ({ children }: { children: ReactNode }) => {
  const [estado, dispatch] = useReducer(estadoReducer, estadoInicial);  //Usamos Reducer para manejar el estado

  return (
    <EstadoContext.Provider value={{ estado, dispatch }}>
      {children}
    </EstadoContext.Provider>
  );
};

//Creamos el Hook personalizado para consumir el contexto global
const useEstadoGlobal = () => {
  const context = useContext(EstadoContext);
  if (!context) throw new Error("useEstadoGlobal debe usarse dentro de un EstadoProvider");  //Aroojamos un error si no se usa correctamente
  return context;
};

//Creamos otro Hook personalizado para simular datos aleatorios cada 2 segundos
const useDatosSimulados = () => {
  const [datos, setDatos] = useState<string[]>([]);  //Aqui esta el Estado local para almacenar los datos simulados

  useEffect(() => {
    const intervalo = setInterval(() => {
      const nuevoDato = `Dato ${Math.floor(Math.random() * 100)}`;  //Generamos un dato aleatorio
      setDatos((prevDatos) => [...prevDatos, nuevoDato]);  //Agregamos el nuevo dato
    }, 2000);

    return () => clearInterval(intervalo);  //Limpiamos el intervalo al desmontar el componente
  }, []);

  return datos;
};

//Se crea el componente principal de la aplicacion
const App: React.FC = () => {
  const { estado, dispatch } = useEstadoGlobal();  //Estado global y función dispatch para actualizar el estado global 
  const datosSimulados = useDatosSimulados();  //Usamos datos simulados en tiempo real
  const inputRef = useRef<HTMLInputElement>(null);  //Referencia para acceder al valor del input

  //Se memoriza la funcion para evitar renders innecesarios
  const agregarDato = useCallback(() => {
    const nuevoDato = inputRef.current?.value || "";  //Obtenemos el valor del input
    if (nuevoDato) {
      dispatch({ type: "AGREGAR_DATO", payload: nuevoDato });  //Agregamos el dato al estado global
    }
  }, [dispatch]);

  //Filtramos los datos solo cuando el estado cambia
  const datosFiltrados = useMemo(() => {
    return estado.datos.filter((dato) => dato.includes(estado.filtro));  //Filtramos los datos por coincidencia
  }, [estado.datos, estado.filtro]);

  //Actualiza cada vez que el estado cambia
  useEffect(() => {
    console.log("Estado actualizado:", estado);
  }, [estado]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tablero en Tiempo Real</h1>

      {/* Input para agregar un nuevo dato */}
      <div>
        <input ref={inputRef} type="text" placeholder="Agregar nuevo dato" />
        <button onClick={agregarDato}>Agregar Dato</button>
      </div>

      {/* Input para filtrar los datos */}
      <div>
        <input
          type="text"
          placeholder="Filtrar datos"
          onChange={(e) => dispatch({ type: "FILTRAR", payload: e.target.value })}
        />
      </div>

      {/* Lista de datos simulados */}
      <h2>Datos Simulados</h2>
      <ul>
        {datosSimulados.map((dato, index) => (
          <li key={index}>{dato}</li>
        ))}
      </ul>

      {/* Lista de datos filtrados */}
      <h2>Datos Filtrados</h2>
      <ul>
        {datosFiltrados.map((dato, index) => (
          <li key={index}>{dato}</li>
        ))}
      </ul>
    </div>
  );
};

//Envolvemos la aplicacion en el proveedor del estado global
const AppConEstado = () => (
  <EstadoProvider>
    <App />
  </EstadoProvider>
);

export default AppConEstado;
