import { Response, Request } from "express";
import AbstractController from "./AbstractController";
import db from "../models";
import DepartamentoModel from "../modelsNOSQL/departamentoNOSQL.ts";

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
    this.router.get("/testPipeline", this.getTestPipeline.bind(this));
    this.router.post("/consultaDepartamento", this.getDepartamentos.bind(this));
  }

  //Podemos crecer los metodos de instancia y solo asociar con otro this.router.get o post no importa
  //Metodos de instancia
  //Se declara privada porque solo init routes la va a usar

  private getTestPipeline(req: Request, res: Response) {
    try {
      console.log("Prueba Exitosa");
      res.status(200).send("<h1>Prueba Exitosa</h1>");
    } catch (error: any) {
      console.log(error);
      res.status(500).send("Internal Server Error " + error);
    }
  }

  private async getConsultarUsuarios(req: Request, res: Response) {
    try {
      console.log("Consultar Usuarios");
      let Usuarios = await db["Usuario"].findAll(); //Select * FROM Usuario
      res.status(200).json(Usuarios);
    } catch (error: any) {
      console.log(error);
      res.status(500).send("Internal Server Error " + error);
    }
  }

  private async getDepartamentos(req: Request, res: Response) {
    try {
      const dptos = await DepartamentoModel.scan().exec().promise();
      console.log(dptos);
      res.status(200).send(dptos[0].Items);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error " + error);
    }
  }

  private async postCrearDepartamento(req: Request, res: Response) {
    try {
      console.log(req.body);
      await DepartamentoModel.create(req.body); //INSERT
      console.log("Departamento Creado");
      res.status(200).send("<h1>Departamento Creado</h1>");
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error " + error);
    }
  }

  private async postCrearUsuario(req: Request, res: Response) {
    try {
      await db.Usuario.create(req.body); //INSERT
      console.log("Usuario Creado");

      res.status(200).send("<h1>Usuario Creado</h1>");
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error " + err);
    }
  }
}
export default UsuarioController;
