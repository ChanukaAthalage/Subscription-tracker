import { Router } from "express";
import {getUsers, getUser} from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', getUser);

userRouter.post('/', (req, res) => {
    res.send({title: 'POST create user'});
});

userRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    res.send({title: `PUT update user with id ${id}`});
});

userRouter.delete('/:id', (req, res) => {
    res.send({title: `DELETE user with the id ${id}`})
});

export default userRouter;