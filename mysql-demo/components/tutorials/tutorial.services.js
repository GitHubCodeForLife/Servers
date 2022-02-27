const Tutorial = require("./tutorial.model");
// Create and Save a new Tutorial
exports.create = async (data) => {
  try {
    const result = await Tutorial.create({
      title: data.title,
      description: data.description,
      published: data.published,
    });
    return {
      success: true,
      message: "Tutorial created successfully",
      data: result,
    };
  } catch (error) {
    return {
      error: error.message || "Some error occurred while creating User!",
    };
  }
};
exports.getAll = async () => {
  try {
    const tutorials = await Tutorial.findAll();
    return tutorials;
  } catch (error) {}
};

exports.getDataByPage = async (page) => {
  try {
    const tutorials = await Tutorial.findAll({
      limit: 10,
      offset: page,
    });
    return tutorials;
  } catch (error) {}
};

exports.update = async (data) => {
  try {
    const tutorial = await Tutorial.update(
      {
        title: data.title,
        description: data.description,
        published: data.published,
      },
      {
        where: {
          id: data.id,
        },
      }
    );
    return tutorial;
  } catch (error) {
    return {
      error: error.message || "Some error occurred while creating User!",
    };
  }
};

exports.deleteOne = async (id) => {
  try {
    const tutorial = await Tutorial.destroy({
      where: {
        id: id,
      },
    });
    return tutorial;
  } catch (error) {
    return {
      error: error.message || "Some error occurred while creating User!",
    };
  }
};
