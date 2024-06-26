import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const databaseConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Wehave2vaio!',
    database: 'path_demo',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true, 
};

export default databaseConfig;