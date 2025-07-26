
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Url } from "../models/URL.models.js";
import crypto from "crypto";

const isValidURL = (url) => {
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
};


async function generateRandomCode(length = 6) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'; // URL-safe
  const alphabetLength = alphabet.length;
  let result = '';


  const randomBytes = crypto.randomBytes(length);

  for (let i = 0; i < length; i++) {
    const index = randomBytes[i] % alphabetLength;
    result += alphabet[index];
  }

  return result;
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

    const existing = await Url.findOne({ originalURL });
    if (existing) {
      return res
        .status(200)
        .json(new ApiResponse(200, existing, "URL already shortened"));
    }


    const shortCode = await generateRandomCode();

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

    console.log("Redirecting to:", searchedUrl.originalURL);
    


    return res.redirect(searchedUrl.originalURL);
  } catch (err) {
    next(err);
  }
};

export { createShortenURL, redirectToOriginalUrl };
