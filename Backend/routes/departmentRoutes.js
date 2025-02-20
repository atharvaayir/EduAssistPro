const express=require('express');
const router=express.Router();
const {createDepartment,getAllDepartments,getDepartmentById,updateDepartment,deleteDepartment}=require('../controllers/departmentController');


router.get('/',getAllDepartments);

router.get('/:id',getDepartmentById);

router.post('/create',createDepartment);

router.put('/update/:id',updateDepartment);

router.delete('/delete/:id',deleteDepartment);



module.exports=router;