const Sequelize = require("sequelize")
const {Model} = require("sequelize")
const appConfig = require("../config/appConfig")

class Foto extends Model {
    static init(sequelize) {
        super.init({
          originalname: {
            type: Sequelize.STRING,
            defaultValue: '',
            validate: {
              notEmpty: {
               
                msg: 'Field not stay empty',
              },
            },
          },
          filename: {
            type: Sequelize.STRING,
            defaultValue: '',
            validate: {
              notEmpty: {
               
                msg: 'Field not stay empty',
              },
            },
          },
          
          url: {
            type: Sequelize.VIRTUAL,
            get(){
              return `${appConfig.url}/images/${this.getDataValue("filename")}`
            }
          },

        }, {
          sequelize,
          tableName: "fotos"

        });
        return this;
      }
      static associate(models){
        this.belongsTo(models.Aluno, {foreignKey: "aluno_id"})
      }
    
}

module.exports = Foto