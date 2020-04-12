#project setup

## Enviroment Variables
copy .env sample into .env file and update variable values 

#sequelize cli command

### install

    npm install -g sequelize-cli

### migrations

    sequelize migration:generate -- name [migration file name]
    sequelize db:migrate

### seeders
    
    sequelize seed:generate --name [seed file name]
    sequelize db:seed:all

  Use the --seed option to provide a specific seed to run
    sequelize db:seed -- seed [seed file name]

### rollback
    sequelize db:migrate:undo --name [miration file name]

