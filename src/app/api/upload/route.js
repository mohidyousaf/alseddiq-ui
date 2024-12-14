import FormData from "form-data";

export async function POST(req) {
  try {
    const body = await req.formData();
    const fileBlob = body.get("file"); // Retrieve file as Blob
    const fileName = body.get("fileName"); // Retrieve fileName

    if (!fileBlob) {
      return new Response(
        JSON.stringify({ error: "No file provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Convert Blob to Buffer
    const arrayBuffer = await fileBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Debug: Log FormData content
    console.log("Uploading file:", fileName);

    // Prepare FormData for Cloudinary
    const formData = new FormData();
    formData.append("file", buffer, fileName);
    formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);

    // Send request to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`,
      {
        method: "POST",
        body: formData,
        headers: formData.getHeaders(), // Ensure headers are set properly
      }
    );

    const data = await response.json();

    if (data.secure_url) {
      return new Response(JSON.stringify({ url: data.secure_url }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      console.error("Cloudinary response:", data);
      throw new Error("Cloudinary upload failed");
    }
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return new Response(
      JSON.stringify({ error: "Failed to upload file to Cloudinary" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
