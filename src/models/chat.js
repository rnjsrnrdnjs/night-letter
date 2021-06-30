const Sequelize = require('sequelize');

module.exports = class Chat extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
				content:{
                    type: Sequelize.STRING(1000),
                    allowNull: false,
                    unique: true,
				},
				
                send: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                    unique: false,
                },
				receive:{
                    type: Sequelize.STRING(100),
                    allowNull: false,
                    unique: false,
				},
				read:{
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    unique: false,
				}
			},
			{
				sequelize,
				timestamps:true,
				underscored:false,
				modelName:'Chat',
				tableName:'chats',
				paranoid:false,
				charset:'utf8',
				collate:'utf8_general_ci',
			}
        );
    }

    static associate(db) {
		db.Chat.belongsTo(db.User);
	}
};