import 'reflect-metadata';
import './containers';
import express from 'express';
import { AppDataSource } from 'ormconfig';

const app = express();

app.use(express.json());

// app.use(
//   cors({
//     origin: '*',
//     methods: 'GET,POST,PUT,DELETE',
//     allowedHeaders:
//       'Origin, X-Requested-With, Content-Type, Accept, Authorization',
//   }),
// );

AppDataSource.initialize()
  .then(() => {
    console.log('📦 Conectado ao banco de dados!');

    // app.use(routes);
    // app.use(errorHandler);

    app.listen(3000, () => {
      console.log('🚀 Servidor rodando na porta 3000');
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados', err);
  });
