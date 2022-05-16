import { NextFunction, Request, Response, Router } from 'express';
import db from '@databases';
import { CreateUserDto } from '@dtos/users.dto';
import usersService from '@services/users.service';
import validationMiddleware from '@middlewares/validation.middleware';

const api = Router();
const baseUrl = '/users';
const userService = new usersService();

api.get(baseUrl, async (_: Request, res: Response) => {
  const user = await db.user.findMany();
  res.json(user);
});

api.get(`${baseUrl}/:id`, async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const user = await userService.findUserById(Number(id));
    res.json(user);
  } catch (error) {
    next(error);
  }
});

api.post(baseUrl, validationMiddleware(CreateUserDto, 'body'), async (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email;
  const password = req.body.password;
  const createUserDto: CreateUserDto = { email, password };
  try {
    const user = await userService.createUser(createUserDto);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

api.post(`${baseUrl}/:id`, async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { email, password }: CreateUserDto = req.body;
  const createUserDto = { email, password };
  try {
    const user = await userService.updateUser(Number(id), createUserDto);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

api.delete(`${baseUrl}/:id`, async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const user = await userService.deleteUser(Number(id));
    res.json(user);
  } catch (error) {
    next(error);
  }
});

export { api };
