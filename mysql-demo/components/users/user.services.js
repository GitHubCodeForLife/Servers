const User = require("./user.model");

exports.findOneByEmail = async (email) => {
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    return {
      error: error.message || "Some error occurred while creating User!",
    };
  }
};

exports.createNewOne = async (user) => {
  try {
    const result = await User.create({
      name: user.name,
      password: user.password,
      email: user.email,
    });
    return result;
  } catch (error) {
    return {
      error: error.message || "Some error occurred while creating User!",
    };
  }
};

exports.findOneById = async (id) => {
  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    return user;
  } catch (error) {
    return {
      error: error.message || "Some error occurred while creating User!",
    };
  }
};
