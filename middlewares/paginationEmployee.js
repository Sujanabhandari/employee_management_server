import User from "../models/Users.js";
import asyncHandler from "../utils/asyncHandler.js";

const paginationEmployee = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    if (endIndex < await User.countDocuments().exec()) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }
    
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }
    results.hits = await User.count({});
    results.results = await User.find().limit(limit).skip(startIndex).exec();
    res.paginationEmployee = results
    next();
});

export default paginationEmployee;
