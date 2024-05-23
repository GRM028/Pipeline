import { Response, Request } from "express";
import AbstractController from "./AbstractController";
import db from "../models";


//Hereda de AbstractController por eso usamos extends
class UsuarioController extends AbstractController {
  //Singleton tecnica de programación, fuerza que la clase solo tenga una instancia y que sea reutilizable
  //Atributo de clase privado y estático
  private static _instance: UsuarioController;

  //Si no existe la instancia la genera
  //Si existe la regresa
  public static get instance(): AbstractController {
    if (!this._instance) {
      this._instance = new this("Usuario");
    }
    return this._instance;
  }

  //Declarar todas las rutas del controlador
  //Metodo de clase estático que devuelve la instancia
  protected initRoutes(): void {
    //Como especificamos el get, podemos usarlo como atributo en lugar de metodo
    //Similar a la promesa de javaScript
    this.router.post("/postUsuarioPipeline", this.postUsuarioPipeline.bind(this));
    this.router.get("/getUsuarioPipeline", this.getUsuarioPipeline.bind(this));
    
  }

  //Podemos crecer los metodos de instancia y solo asociar con otro this.router.get o post no importa
  //Metodos de instancia
  //Se declara privada porque solo init routes la va a usar

  private async getUsuarioPipeline(req: Request, res: Response) {
    try {
      console.log("Consultar Usuarios");
      let juegos = await db["Usuario"].findAll(); //Select * FROM AGENTE
      res.status(200).json(juegos);
    } catch (error: any) {
      console.log(error);
      res.status(500).send("Internal Server Error " + error);
    }
  }

  private async postUsuarioPipeline(req: Request, res: Response) {
    try {
      console.log(req.body);
      await db.Usuario.create(req.body); //INSERT
      console.log("Juego Creado");
      res.status(200).send("<h1>Usuario Creado</h1>");
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error " + error);
    }
  }
}
  export default UsuarioController;
