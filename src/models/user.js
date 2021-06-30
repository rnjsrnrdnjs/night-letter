const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                mac: {
                    type: Sequelize.STRING(60),
                    allowNull: false,
                    unique: true,
                },
				dday:{//30
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    unique: false,
				}
			},
			{
				sequelize,
				timestamps:false,
				underscored:false,
				modelName:'User',
				tableName:'users',
				paranoid:false,
				charset:'utf8',
				collate:'utf8_general_ci',
			}
        );
    }

    static associate(db) {
		db.User.hasMany(db.Chat);
	}
};