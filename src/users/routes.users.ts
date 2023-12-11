import express from 'express';
import  usersController  from './controller.users';

const usersRouter = express.Router();

// usersRouter.get('/',usersController.getAlllUsers)
usersRouter.get('/verifypasswordchange', usersController.verifyPasswordChange); 
// usersRouter.get('/:id',usersController.getUserByID)
// usersRouter.put('/update/:id',usersController.updateUserById)
// usersRouter.put('/changepassword',usersController.changePassword)
// usersRouter.post('/register', usersController.registerUser);
// usersRouter.post('/login', usersController.loginUser);
// usersRouter.delete('/delete/:id', usersController.deleteUserById);


export default usersRouter;

