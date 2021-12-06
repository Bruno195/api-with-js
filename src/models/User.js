const Sequelize = require("sequelize")
const {Model} = require("sequelize")
const bcrypt = require("bcryptjs")

class User  extends Model{
    static init(sequelize){
        super.init({
            nome: {
               type: Sequelize.STRING,
               defaultValue: "",
               validate: {
                   len: {
                    args: [3, 255],   
                    msg: "Field name cant be void"
                   }

               }
            },
            email: {
                type: Sequelize.STRING,
                defaultValue: "",
                unique: {
                    msg: "Email already exists "
                },
                validate: {
                    isEmail: {
                   
                     msg: "Email is invalid"
                    }
 
                }
             },
            password_hash: {
                type: Sequelize.STRING,
                defaultValue: "",
               
             },
            password: {
                type: Sequelize.VIRTUAL,
                defaultValue: "",
                validate: {
                    len: {
                     args: [6, 50],   
                     msg: "The password need stay between 6 and 50 caracters"
                    }
 
                }
             },

            
        }, {
            sequelize
        })
        this.addHook("beforeSave", async user => {
           if(user.password){
               
               user.password_hash = await bcrypt.hash(user.password, 8)
           } 
        })
       return this 
    } 

    passwordIsValid(password){
        return bcrypt.compare(password, this.password_hash)
    }



} 

module.exports = User