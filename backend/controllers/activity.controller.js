import Activity from "../models/Activity.js";

// GET /api/activities
export const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ isActive: true });
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/activities/:slug
export const getActivityBySlug = async (req, res) => {
  try {
    const activity = await Activity.findOne({
      slug: req.params.slug,
      isActive: true
    });

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/activities
export const createActivity = async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /api/activities/:id
export const updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.status(200).json(activity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /api/activities/:id
export const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    res.status(200).json({ message: "Activity deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
