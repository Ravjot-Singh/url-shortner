import { nanoid } from "nanoid";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Url } from "../models/URL.models.js";

const isValidURL = (url) => {
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
};

async function generateUniqueShortCode(length = 6) {
  let shortCode;
  let exists = true;

  while (exists) {
    shortCode = nanoid(length);
    exists = await Url.findOne({ shortURL: shortCode });
  }

  return shortCode;
}

const createShortenURL = async (req, res, next) => {
  try {
    const { originalURL } = req.body;

    if (!originalURL) {
      throw new ApiError(400, "Original URL is required.");
    }

    if (!isValidURL(originalURL)) {
      throw new ApiError(400, "Invalid URL provided.");
    }

    // Check if URL is already shortened
    const existing = await Url.findOne({ originalURL });
    if (existing) {
      return res
        .status(200)
        .json(new ApiResponse(200, existing, "URL already shortened"));
    }

    // Generate unique short code locally
    const shortCode = await generateUniqueShortCode();

    const newUrl = await Url.create({
      originalURL,
      shortURL: shortCode,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, newUrl, "URL shortened successfully"));
  } catch (err) {
    next(err);
  }
};

const redirectToOriginalUrl = async (req, res, next) => {
  try {
    const { shortURL } = req.params;

    const searchedUrl = await Url.findOne({ shortURL });

    if (!searchedUrl) {
      throw new ApiError(404, "URL not found");
    }

    res.redirect(searchedUrl.originalURL);
  } catch (err) {
    next(err);
  }
};

export { createShortenURL, redirectToOriginalUrl };
