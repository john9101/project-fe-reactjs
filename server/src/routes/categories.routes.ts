
import express from 'express';
import { getCategories, createCategory } from '../controllers/categories.controllers';

const router = express.Router();

// Định nghĩa route để lấy danh sách các category và sử dụng controller tương ứng
router.get('/', getCategories);

// Định nghĩa route để tạo một category mới và sử dụng controller tương ứng
router.post('/', createCategory);

export default router;
