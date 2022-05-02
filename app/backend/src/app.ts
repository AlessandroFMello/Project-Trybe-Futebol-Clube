import express from 'express';
import cors from 'cors';
import loginRouter from './routes/loginRoutes';
import teamsRouter from './routes/teamsRoutes';
import errorMiddleware from './middlewares/errorMiddleware';

class App {
  public app: express.Express;
  // ...

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.errorMiddleware();
    // ...
  }

  private corsConfig():void {
    const options: cors.CorsOptions = {
      methods: 'GET, OPTIONS, POST, DELETE, PUT',
      origin: '*',
    };

    this.app.use(cors(options));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.corsConfig();
    this.app.use(express.json());
    // ...
  }

  private routes(): void {
    this.app.use('/login', loginRouter);
    this.app.use('/teams', teamsRouter);
  }

  private errorMiddleware(): void {
    this.app.use(errorMiddleware);
  }

  // ...
  public start(PORT: string | number):void {
    // ...
    this.app.use(express.json());
    this.app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
