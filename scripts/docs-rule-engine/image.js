// imageChecker.js
import fs from 'fs/promises';
import sharp from 'sharp';

export async function checkImageResolution(imagePath) {
  try {
    // Read the image file
    const imageBuffer = await fs.readFile(imagePath);

    // Get image metadata
    const metadata = await sharp(imageBuffer).metadata();

    // Check if the resolution matches the criteria
    const width = metadata.width;
    const height = metadata.height;

    // Check if width is 1920 and height is between 1080 and 1250
    return width === 1920 && height >= 1080 && height <= 1250;
  } catch (error) {
    console.error('Error checking image resolution:', error);
    return false;
  }
}

