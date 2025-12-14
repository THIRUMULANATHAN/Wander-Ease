import Package from "../models/Package.js";

/* ------------------ HELPERS ------------------ */

const extractDaysFromDuration = (duration) => {
  const match = duration.match(/(\d+)\s*Days/i);
  return match ? parseInt(match[1]) : null;
};

const categoryTourTypeMap = {
  hiking: ["Hiking", "Adventure"],
  yachting: ["Yachting"],
  india: ["Cultural", "Adventure"]
};

/* ------------------ GET ALL ------------------ */
// GET /api/packages?category=hiking
export const getAllPackages = async (req, res) => {
  try {
    const filter = { isActive: true };
    if (req.query.category) filter.category = req.query.category;

    const packages = await Package.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: packages.length,
      data: packages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* ------------------ FEATURED ------------------ */
// GET /api/packages/featured
export const getFeaturedPackages = async (req, res) => {
  try {
    const packages = await Package.find({
      isFeatured: true,
      isActive: true
    }).limit(20);

    res.status(200).json({
      success: true,
      data: packages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* ------------------ GET BY ID ------------------ */
// GET /api/packages/:id
export const getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);

    if (!pkg || !pkg.isActive) {
      return res.status(404).json({
        success: false,
        message: "Package not found"
      });
    }

    res.status(200).json({
      success: true,
      data: pkg
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* ------------------ CREATE ------------------ */
// POST /api/packages (ADMIN)
export const createPackage = async (req, res) => {
  try {
    const {
      title,
      description,
      coverImage,
      gallery,
      duration,
      itinerary,
      category,
      tourType,
      price
    } = req.body;

    /* 🔒 Required field safety */
    if (!title || !description || !coverImage || !duration || !category || !tourType || !price) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    /* 🔒 Duplicate title check */
    const exists = await Package.findOne({
      title: { $regex: `^${title}$`, $options: "i" }
    });

    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Package with this title already exists"
      });
    }

    /* 🔒 Category ↔ TourType */
    if (!categoryTourTypeMap[category]?.includes(tourType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid tourType for selected category"
      });
    }

    /* 🔒 Gallery rule */
    if (!gallery || gallery.length < 3) {
      return res.status(400).json({
        success: false,
        message: "At least 3 gallery images are required"
      });
    }

    /* 🔒 Duration ↔ Itinerary */
    const expectedDays = extractDaysFromDuration(duration);
    if (!expectedDays || itinerary.length !== expectedDays) {
      return res.status(400).json({
        success: false,
        message: "Itinerary days must exactly match duration days"
      });
    }

    /* 🔒 Price sanity */
    if (price <= 0 || price > 500000) {
      return res.status(400).json({
        success: false,
        message: "Invalid price range"
      });
    }

    const pkg = await Package.create(req.body);

    res.status(201).json({
      success: true,
      data: pkg
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/* ------------------ UPDATE ------------------ */
// PUT /api/packages/:id (ADMIN)
export const updatePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);

    if (!pkg || !pkg.isActive) {
      return res.status(404).json({
        success: false,
        message: "Package not found"
      });
    }

    Object.assign(pkg, req.body);
    await pkg.save();

    res.status(200).json({
      success: true,
      data: pkg
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/* ------------------ DELETE (SOFT) ------------------ */
// DELETE /api/packages/:id (ADMIN)
export const deletePackage = async (req, res) => {
  try {
    await Package.findByIdAndUpdate(req.params.id, {
      isActive: false
    });

    res.status(200).json({
      success: true,
      message: "Package deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
