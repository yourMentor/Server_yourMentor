const User = require('../models/user');

exports.follow = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    
    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10));
      res.status(200).json({ success: true, message: 'success' });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
    next(error);
  }
};
