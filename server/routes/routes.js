const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const medicinesAPI = require("../routes/medicines");
const categoryAPI = require("../routes/categories");
const userRoleAPI = require("../routes/userRole");
const userAPI = require("../routes/user");

/////////////////////////////////// CATEGORY API ////////////////////////////////////////////

router.post("/api/category/new/add", categoryAPI.addCategory); // add category

router.post("/api/category/get_all", categoryAPI.getCategories); // get all category

router.put("/api/category/update/:id", categoryAPI.updateCategory); // update category

router.delete("/api/category/delete/:id", categoryAPI.deleteCategory); // delete category



/////////////////////////////////// MEDICINE API ////////////////////////////////////////////

router.post("/api/medicine/new/add", medicinesAPI.addMedicine); // add new medicine

router.post("/api/medicines/get_all", medicinesAPI.getMedicines); // get all medicines

router.put("/api/medicine/update/:id", medicinesAPI.updateMedicine); // update category

router.delete("/api/medicine/delete/:id", medicinesAPI.deleteMedicine); // delete medicine



/////////////////////////////////// USER ROLE API ////////////////////////////////////////////

router.post("/api/user_role/new/add", userRoleAPI.addUserRole); // add new userRole

router.post("/api/user_role/get_all", userRoleAPI.getUserRole); // get all userRole

router.put("/api/user_role/update/:id", userRoleAPI.updateUserRole); // update userRole

router.delete("/api/user_role/delete/:id", userRoleAPI.deleteUserRole); // delete userRole



/////////////////////////////////// USER API ////////////////////////////////////////////

router.post("/api/user/new/add", userAPI.addUser); // add new user

router.post("/api/user/get_all", userAPI.getUser); // get all user

router.put("/api/user/update/:id", userAPI.updateUser); // update user

router.delete("/api/user/delete/:id", userAPI.deleteUser); // delete user

module.exports = router;
