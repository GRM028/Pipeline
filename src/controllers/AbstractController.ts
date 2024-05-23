import { Router } from "express";

abstract class AbstractController {

    //getters y setters no llevan guion bajo al inicio
    private _router: Router;
    private _prefix: string;

    //Usamos this en lugar de escribir AbstractController        
    //Obtiene el almacenamiento de rutas
    public get router(): Router {
        return this._router;
    }
    //Modifica la variable _router
    public set router(router: Router) {
        this._router = router;
    }

    public get prefix(): string {
        return this._prefix;
    }
    
    //Constructor protegido que recibe un prefijo para las rutas de este controlador
    protected constructor(prefix: string) {
        this._prefix = prefix;
        this._router = Router();
        this.initRoutes();
    }

    //Metodo abstracto solo puede aparecer en una clase abstracta
    protected abstract initRoutes(): void;

}

export default AbstractController;