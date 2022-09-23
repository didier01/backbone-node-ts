import { Router } from "express";
import { getUsers, getUserId, postUser, updateUser, deleteUser } from '../controllers/user-controler';

const router = Router();

router.get('/', getUsers)
router.get('/:id', getUserId)
router.post('/', postUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)




export default router;
