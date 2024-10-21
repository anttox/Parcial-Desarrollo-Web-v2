//Se establece un tipo de unión para los diferntes estados de las tareas coo pendiente y completada
type EstadoTarea = "pendiente" | "completada";

//Clase TareaBase donde encapsulamos las propiedades mediante el constructor
class TareaBase {
    constructor(
        public nombre: string,  //Propiedad publica donde se facilita el acceso
        public estado: EstadoTarea = "pendiente"  //Estado en que inicia la tarea por defecto 
    ) {}

    //Creamos el metodo generico ejecutar para que este presente en todas las clases hijas
    async ejecutar(): Promise<void> {
        console.log(`Ejecucion de la tarea ${this.nombre}`);
        this.estado = "completada";  //El estado se actualiza de pendiente a completada ya que se ha completado la tarea
    }

    //Creaos el metoddo mostrarEstado para poder visualizar el estado de la tarea
    mostrarEstado(): void {
        console.log(`Tarea: ${this.nombre} - Estado: ${this.estado}`);
    }
}

//Extendemos la clase TareaBase en TareaAsincrona para reutilizar el las propiedades de la clase (Herencia)
class TareaAsincrona extends TareaBase {
    constructor(nombre: string) {
        super(nombre);  //Se reutiliza el constructor de la clase TareaBase con super
    }
}

//Creamos la clase generia GestorDeTareas para la gestion de multiples tareas y usmaos T para extender el metodo ejecutar de TareaBase
class GestorDeTareas<T extends TareaBase> {
    constructor(public tareas: T[]) {}  //Encapsulacion de la lista de tareas

    //Creamos un metodo asincrono para ejecutar todas las tareas de forma secuencial (uso de Promises)
    async ejecutarTareas(): Promise<void> {
        for (const tarea of this.tareas) {
            await tarea.ejecutar();  
            tarea.mostrarEstado(); //Mostraremos el estado de las tareas depues de cada ejecucion
        }
    }
}

//Ejemplo del Event Loop y usaremos microtareas y macrotareas (las microtareas tienen prioridad sobre las macrotareas)
//Usamos process.nextTick para las mirotareas ya que estas se deben ejecutar antes que otras tareas 
process.nextTick(() => console.log("Microtarea: Validacion rapida de los datos ha sido completada"));

//Promise.resolve se encola como microtarea despues de process.nextTick porque las tareas programas con process.nextTick tienen prioridad sobre las promesas
Promise.resolve().then(() => console.log("Microtarea: Datos obtenidos del API"));

//Usamos setTimeout para las macrotareas ya que estas se ejecutan despues de las microtareas
setTimeout(() => console.log("Macrotarea: Los datos han sido guardados en la base de datos"), 0);

//Usamos setImmediate en las macrotareas porque tambien se ejecutan despues de las microtareas en el ismo ciclo del Event Loop
setImmediate(() => console.log("Macrotarea: La interfaz del usuario ha sido actualizada"));

//Creamos algunas tareas usando POO para mostrar la herencia y polimorfismo del codigo
const tarea1 = new TareaAsincrona("Cargar datos");
const tarea2 = new TareaAsincrona("Procesar datos");
const tarea3 = new TareaAsincrona("Guardar datos");

//Creamos un gestor para administrar y ejecutar las tareas
const gestor = new GestorDeTareas([tarea1, tarea2, tarea3]);

//Ejecutamos las tareas de forma secuencial y mostramos un mensaje al finalizar la ejecucion
gestor.ejecutarTareas().then(() => {
    console.log("Todas las tareas asincronas han sido completadas");
});


