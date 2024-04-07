const propertymodel = require("../Model/property");

const addProperties = async (req, res) => {
  try {
    const response = await propertymodel.create({
      ...req.body,
      userRef: req.user._id,
    });
    res.json({
      success: true,
      result: response,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: false,
      message: "something wrong",
    });
  }
};

const getProperty = async (req, res) => {
  try {
    if (req.params.id !== undefined) {
      const property = await propertymodel.findById(req.params.id);
      if (!property) {
        return res.status(404).json({
          success: false,
          message: "Property not found!",
        });
      }

      res.json({
        success: true,
        result: property,
      });
    } else {
      const properties = await propertymodel.find({});
      res.json({
        success: true,
        result: properties,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateProperty = async (req, res) => {
  const property = await propertymodel.findById(req.params.id);
  if (!property) {
    return next(errorHandler(404, "propertymodel not found!"));
  }
  if (req.user._id !== property.userRef) {
    return next(
      errorHandler(401, "You can only update your own propertymodels!")
    );
  }

  try {
    const updatedProperty = await propertymodel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProperty);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: error,
    });
  }
};

const deleteProperty = async (req, res) => {
  const property = await propertymodel.findById(req.params.id);

  if (!property) {
    return res.status(404).json({
      success: false,
      message: "property not found",
    });
  }

  if (req.user._id !== property.userRef) {
    return res.status(404).json({
      success: false,
      message: "property not found",
    });
  }

  try {
    await propertymodel.findByIdAndDelete(req.params.id);
    res.json("property has been deleted!");
  } catch (error) {
    next(error);
  }
};

const getsearchProperties = async (req, res) => {
  try {
    // Pagination parameters initialization
    const limit = parseInt(req.query.limit) || 6;
    const startIndex = parseInt(req.query.startIndex) || 0;

    // Query parameters initialization
    const parking =
      req.query.parking === undefined || req.query.parking === "false"
        ? { $in: [false, true] }
        : req.query.parking;
    const type =
      req.query.type === undefined || req.query.type === "all"
        ? { $in: ["sale", "rent"] }
        : req.query.type;
    const searchTerm = req.query.searchTerm || "";

    // Sorting parameters initialization
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";
    

    // Query building
    const filterproperty = await propertymodel
      .find({
        title: { $regex: searchTerm, $options: "i" },
        parking,
        type,
      })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    console.log(filterproperty);
    // Sending response
    res.json({
      success: true,
      result: filterproperty,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: error,
    });
  }
};

module.exports = {
  addProperties,
  getProperty,
  updateProperty,
  deleteProperty,
  getsearchProperties,
};
