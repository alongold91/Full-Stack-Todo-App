import { Router } from 'express';
import { createNewList, getUserLists, updateList, deleteUserList } from '../controllers/lists';
import { validateData } from '../middleware/validationMiddleware';
import { createListSchema, deleteListSchema, updaterListSchema } from '../middleware/shcemas/listsSchema';

const router = Router();

router.get('/', getUserLists);
router.post('/create', validateData(createListSchema), createNewList);
router.patch('/update', validateData(updaterListSchema), updateList);
router.delete('/delete', validateData(deleteListSchema), deleteUserList)


export default router;
