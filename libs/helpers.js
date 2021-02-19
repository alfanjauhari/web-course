const bcrypt = require('bcrypt');

module.exports = {
  response: (res, data) => {
    return res.status(data.code).json({
      code: data.code,
      success: data.success,
      message: data.message,
      content: data.content
    });
  },
  isEmpty: data => {
    for (const i in data) {
      if (Object.prototype.hasOwnProperty.call(data, i)) {
        return false;
      }
    }

    return true;
  },
  hashPassword: async data => {
    const password = await bcrypt.hash(data, 10);

    return password;
  }
};
