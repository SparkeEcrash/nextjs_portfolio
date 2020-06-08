const express = require('express');
const router = express.Router();

const blogCtrl = require('../controllers/blog');
const authService = require('../services/auth');

router.get('', blogCtrl.getBlogs);

router.get('/me', authService.checkJWT, authService.checkRole('siteOwner'), blogCtrl.getUserBlogs);

//"/me" has to be above "/:id" to be checked first

router.get('/:id', blogCtrl.getBlogById);

router.get('/s/:slug', blogCtrl.getBlogBySlug);

router.post('', authService.checkJWT, authService.checkRole('siteOwner'), blogCtrl.createBlog);

router.patch('/:id', authService.checkJWT, authService.checkRole('siteOwner'), blogCtrl.updateBlog);

router.delete('/:id', authService.checkJWT, authService.checkRole('siteOwner'), blogCtrl.deleteBlog);

module.exports = router;