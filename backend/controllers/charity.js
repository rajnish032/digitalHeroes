const Charity = require("../models/charity");
const User = require("../models/user");
const validator = require("validator");

module.exports.createCharity = async (req, res) => {
  const { name, description, image, website, minimumContribution } = req.body;

  if (!name || !description) {
    return res.status(400).json({
      success: false,
      message: "Name and description are required",
    });
  }

  if (image && !validator.isURL(image, {
    protocols: ["http", "https"],
    require_protocol: true,
  })) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid image URL.",
    });
  }

  const charityExists = await Charity.findOne({ name });

  if (charityExists) {
    return res.status(400).json({
      success: false,
      message: "Charity already exists",
    });
  }

  const charity = await Charity.create({
    name,
    description,
    image,
    website,
    minimumContribution,
  });

  res.status(201).json({
    success: true,
    message: "Charity created successfully",
    charity,
  });
};

module.exports.getAllCharities = async (req, res) => {
  const charities = await Charity.find({ isActive: true });

  res.status(200).json({
    success: true,
    charities,
  });
};

module.exports.getCharityById = async (req, res) => {
  const charity = await Charity.findById(req.params.id);

  if (!charity) {
    return res.status(404).json({
      success: false,
      message: "Charity not found",
    });
  }

  res.status(200).json({
    success: true,
    charity,
  });
};

module.exports.updateCharity = async (req, res) => {
  const charity = await Charity.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!charity) {
    return res.status(404).json({
      success: false,
      message: "Charity not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Charity updated successfully",
    charity,
  });
};

module.exports.deleteCharity = async (req, res) => {
  const charity = await Charity.findById(req.params.id);

  if (!charity) {
    return res.status(404).json({
      success: false,
      message: "Charity not found",
    });
  }

  charity.isActive = false;

  await charity.save();

  res.status(200).json({
    success: true,
    message: "Charity deleted successfully",
  });
};

exports.selectCharity = async (req, res) => {
  const { id } = req.params;

  // Check Charity
  const charity = await Charity.findOne({
    _id: id,
    isActive: true,
  });

  if (!charity) {
    return res.status(404).json({
      success: false,
      message: "Charity not found",
    });
  }

  // Update User
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      selectedCharity: charity._id,
    },
    {
      new: true,
    }
  ).populate("selectedCharity");

  return res.status(200).json({
    success: true,
    message: "Charity selected successfully",
    selectedCharity: user.selectedCharity,
  });
};