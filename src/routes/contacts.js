const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const controller = require('../controllers/contactsController');

router.post('/',
  body('firstName').notEmpty(),
  body('lastName').notEmpty(),
  body('email').isEmail(),
  body('phone').optional().isMobilePhone(),
  controller.createContact);

router.get('/', controller.getContacts);

router.get('/:id',
  param('id').notEmpty(),
  controller.getContactById);

router.get('/email/:email',
  param('email').isEmail(),
  controller.getContactByEmail);

router.put('/:id',
  param('id').notEmpty(),
  body('firstName').notEmpty(),
  body('lastName').notEmpty(),
  body('email').isEmail(),
  body('phone').optional().isMobilePhone(),
  controller.updateContact);

router.delete('/:id',
  param('id').notEmpty(),
  controller.deleteContact);

module.exports = router;
