import { Router } from "express";

const userRouter = Router();

userRouter.get('/', (req, res) => {
    res.send({title: 'GET all users'});
});

userRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    res.send({title: `GET user with id ${id}`});
});

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