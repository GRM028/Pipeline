import {Model,Sequelize} from 'sequelize';
import UsuarioController from '../controllers/UsuarioControllers';

interface UsuarioAttributes {
    id:number;
    username:string;
    email:string;
}

module.exports = (sequelize:any,DataTypes:any) => {
    class Usuario extends Model<UsuarioAttributes> implements UsuarioAttributes{
        public id!:number;
        public username!:string;
        public email!:string;

        static associate(models:any){

        }

    }
    Usuario.init({
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING(50),
            allowNull:false
        }
    },{
        sequelize,
        modelName:'Usuario'
    });
    return Usuario;

}