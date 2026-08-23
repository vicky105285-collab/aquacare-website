/**
 * Cloudinary Storage Helper for Yuvanthika Aquacare CMS
 * Supports uploading images (JPG, PNG, WebP) and project videos (MP4)
 * with automatic optimization, transformations, and folder organization.
 */

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  format: string;
  bytes: number;
}

export async function uploadToCloudinary(
  fileBuffer: Buffer,
  fileName: string,
  folderName: string,
  mimeType: string
): Promise<CloudinaryUploadResult | null> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName) {
    console.warn("Cloudinary configuration missing. Falling back to local storage.");
    return null;
  }

  try {
    const isVideo = mimeType.startsWith("video/");
    const resourceType = isVideo ? "video" : "image";
    const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    const formData = new FormData();
    const blob = new Blob([new Uint8Array(fileBuffer)], { type: mimeType });
    formData.append("file", blob, fileName);
    formData.append("folder", `yuvanthika/${folderName}`);

    if (uploadPreset) {
      formData.append("upload_preset", uploadPreset);
    }

    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Cloudinary upload failed:", errText);
      return null;
    }

    const data = await response.json();
    return {
      secure_url: data.secure_url,
      public_id: data.public_id,
      format: data.format,
      bytes: data.bytes,
    };
  } catch (error) {
    console.error("Cloudinary upload exception:", error);
    return null;
  }
}
