var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//Clase TareaBase donde encapsulamos las propiedades mediante el constructor
var TareaBase = /** @class */ (function () {
    function TareaBase(nombre, //Propiedad publica donde se facilita el acceso
    estado //Estado en que inicia la tarea por defecto 
    ) {
        if (estado === void 0) { estado = "pendiente"; }
        this.nombre = nombre;
        this.estado = estado;
    }
    //Creamos el metodo generico ejecutar para que este presente en todas las clases hijas
    TareaBase.prototype.ejecutar = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("Ejecucion de la tarea ".concat(this.nombre));
                this.estado = "completada"; //El estado se actualiza de pendiente a completada ya que se ha completado la tarea
                return [2 /*return*/];
            });
        });
    };
    //Creaos el metoddo mostrarEstado para poder visualizar el estado de la tarea
    TareaBase.prototype.mostrarEstado = function () {
        console.log("Tarea: ".concat(this.nombre, " - Estado: ").concat(this.estado));
    };
    return TareaBase;
}());
//Extendemos la clase TareaBase en TareaAsincrona para reutilizar el las propiedades de la clase (Herencia)
var TareaAsincrona = /** @class */ (function (_super) {
    __extends(TareaAsincrona, _super);
    function TareaAsincrona(nombre) {
        return _super.call(this, nombre) || this; //Se reutiliza el constructor de la clase TareaBase con super
    }
    return TareaAsincrona;
}(TareaBase));
//Creamos la clase generia GestorDeTareas para la gestion de multiples tareas y usmaos T para extender el metodo ejecutar de TareaBase
var GestorDeTareas = /** @class */ (function () {
    function GestorDeTareas(tareas) {
        this.tareas = tareas;
    } //Encapsulacion de la lista de tareas
    //Creamos un metodo asincrono para ejecutar todas las tareas de forma secuencial (uso de Promises)
    GestorDeTareas.prototype.ejecutarTareas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, tarea;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = this.tareas;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        tarea = _a[_i];
                        return [4 /*yield*/, tarea.ejecutar()];
                    case 2:
                        _b.sent();
                        tarea.mostrarEstado(); //Mostraremos el estado de las tareas depues de cada ejecucion
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return GestorDeTareas;
}());
//Ejemplo del Event Loop y usaremos microtareas y macrotareas (las microtareas tienen prioridad sobre las macrotareas)
//Usamos process.nextTick para las mirotareas ya que estas se deben ejecutar antes que otras tareas 
process.nextTick(function () { return console.log("Microtarea: Validacion rapida de los datos ha sido completada"); });
//Promise.resolve se encola como microtarea despues de process.nextTick porque las tareas programas con process.nextTick tienen prioridad sobre las promesas
Promise.resolve().then(function () { return console.log("Microtarea: Datos obtenidos del API"); });
//Usamos setTimeout para las macrotareas ya que estas se ejecutan despues de las microtareas
setTimeout(function () { return console.log("Macrotarea: Los datos han sido guardados en la base de datos"); }, 0);
//Usamos setImmediate en las macrotareas porque tambien se ejecutan despues de las microtareas en el ismo ciclo del Event Loop
setImmediate(function () { return console.log("Macrotarea: La interfaz del usuario ha sido actualizada"); });
//Creamos algunas tareas usando POO para mostrar la herencia y polimorfismo del codigo
var tarea1 = new TareaAsincrona("Cargar datos");
var tarea2 = new TareaAsincrona("Procesar datos");
var tarea3 = new TareaAsincrona("Guardar datos");
//Creamos un gestor para administrar y ejecutar las tareas
var gestor = new GestorDeTareas([tarea1, tarea2, tarea3]);
//Ejecutamos las tareas de forma secuencial y mostramos un mensaje al finalizar la ejecucion
gestor.ejecutarTareas().then(function () {
    console.log("Todas las tareas asincronas han sido completadas");
});
