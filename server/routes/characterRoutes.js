const express = require('express');
const router = express.Router();
const Character = require('../models/Character');

// GET all
router.get('/', async (req, res) => {
  const characters = await Character.find();
  res.json(characters);
});

// POST
router.post('/', async (req, res) => {
    console.log('✅ POST /api/characters route hit');
    try {
      const newCharacter = new Character(req.body);
      const saved = await newCharacter.save();
      res.json(saved);
    } catch (err) {
      console.error('❌ Error saving character:', err.message);
      res.status(500).json({ error: err.message });
    }
  });  

// PUT
router.put('/:id', async (req, res) => {
  const updated = await Character.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Character.findByIdAndDelete(req.params.id);
  res.json({ message: 'Character deleted' });
});

module.exports = router;
