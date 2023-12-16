import express from "express";
import { moviesController, authController } from "../controller";
import { asyncWrapper } from "../helpers";

const initializeRoutes = (app: express.Application) => {

  app.get('/movies', asyncWrapper(moviesController.getAllMovies));

  app.get('/search', asyncWrapper(moviesController.searchMovies));

  app.post('/movies', asyncWrapper(authController.requiresAdmin), asyncWrapper(moviesController.createMovie));

  app.put('/movies/:id', asyncWrapper(authController.requiresAdmin), asyncWrapper(moviesController.updateMovie));

  app.delete('/movies/:id', asyncWrapper(authController.requiresAdmin), asyncWrapper(moviesController.deleteMovie));
}

export { initializeRoutes };