const City = require('../models/city');

exports.getByName = async (req, res) => {
  try {
    const { name } = req.query; // Assuming the search query is passed as a query parameter
    const regex = new RegExp(`^${name}`, 'i');

    const cities = await City.find({
      $or: [{ slug: regex }, { name: regex }]
    }).limit(20);

    res.json(cities);
  } catch (err) {
    console.error('Error searching cities:', err);
    res.status(500).send('Internal Server Error');
  }
};
