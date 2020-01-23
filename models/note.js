var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

// create a sequelize instance with our local postgres database information.
var sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

// setup User model and its fields.
var Note = sequelize.define('notes', {
    userName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    hooks: {
      // beforeCreate: (user) => {
      //   const salt = bcrypt.genSaltSync();
      //   user.password = bcrypt.hashSync(user.password, salt);
      // }
    },
    instanceMethods: {
      // validPassword: function(password) {
      //   return bcrypt.compareSync(password, this.password);
      // }
    }    
});

// create all the defined tables in the specified database.
sequelize.sync()
    .then(() => console.log('notes table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

// export User model for use in other files.
module.exports = Note;