import express, { NextFunction, Request, Response } from "express";
import { initializeRoutes } from "./routes";
import { mongoDbConnect } from "./helpers";

const main = async () => {

  const app = express();
  app.use(express.json());
  const PORT = process.env.PORT || 3000;

  console.log('Connecting to MongoDB');
  await mongoDbConnect();
  console.log('Connected to MongoDB');

  app.get("/health", (req, res) => {
    res.status(200).send({ success: true, msg: "Server is healthy" });
  });

  initializeRoutes(app);

  app._router.stack.forEach(function (r: any) {
    if (r.route && r.route.path) {
      Object.keys(r.route.methods).forEach((method) => {
        console.log(`${method.toUpperCase()} http://localhost:${PORT}${r.route.path}`);

      });
    }
  });

  app.use((error: any, request: Request, response: Response, next: NextFunction) => {
    if (!error) {
      return process.nextTick(next)
    }
    console.error(error)

    const { statusCode = 500, message } = error

    if (typeof statusCode == 'number' && typeof message == 'string') {
      response.status(statusCode).send({ success: false, msg: message });
    } else {
      console.log('Internal Server Error');
      response.status(500).send({ success: false, msg: 'Internal Server Error' });
    }
  })

  app.listen(PORT, () => {
    console.log(`\n\nStarted Server. Server running on http://localhost:${PORT}`);
  });

}

if (require.main === module)
  main();