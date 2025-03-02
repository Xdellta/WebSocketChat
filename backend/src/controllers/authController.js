const prisma = require('../../prisma/prismaClient');

async function login(req, res) {
  try {
    const userNumber = req.body.userNumber;

    if (![1, 2].includes(userNumber)) {
      return res.status(400).json({
        success: false,
        message: 'User number must be 1 or 2.',
      });
    }

    const rows = await prisma.users.findMany();

    if (!rows || rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No data in the database.',
      });
    }

    res.status(200).json({
      success: true,
      userId: rows[userNumber - 1].user_id,
      message: 'User logged in successfully.',
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal server error. ${error}`,
    });
    console.error(error);
  }
}

module.exports = { login };