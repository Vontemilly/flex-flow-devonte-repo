const router = require('express').Router();
const { Diet } = require('../../models');
const withAuth = require('../../utils/auth');

//GET request for all diets
router.get('/', (req,res) => {
    Diet.findAll({})
    .then(dietData => res.json(dietData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});
// GET request by id
router.get('/:id', (req, res) => {
    Diet.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(DietData => res.json(DietData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

//POST request for new diet
router.post('/', async (req, res) => {
  try {
    const newDiet = await Diet.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.json(newDiet);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELTE request by id 
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const dietData = await Diet.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    //If request is succesfull, the id should not be found
    if (!dietData) {
      res.status(404).json({ message: 'Diet ID not found' });
      return;
    }
    res.status(200).json(dietData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;