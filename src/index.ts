import Server from './provider/Server';
import {PORT,NODE_ENV} from './config';
import express from 'express';
import UsuarioControllers from './controllers/UsuarioControllers';
import GameController from './controllers/GameController';

const server = new Server({
    port:PORT,
    env:NODE_ENV,
    middlewares:[
        express.json(),
        express.urlencoded({extended:true})
    ],
    controllers:[
        UsuarioControllers.instance,
        GameController.instance
    ]
});

server.init();