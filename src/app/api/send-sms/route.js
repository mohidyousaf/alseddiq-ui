import twilio from "twilio";

export async function POST(req) {
  try {
    const { phoneNumber, message } = await req.json();

    // Validate inputs
    if (!phoneNumber || !message) {
      return new Response(
        JSON.stringify({ error: "Phone number and message are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Initialize Twilio Client
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    // Send SMS
    const smsResponse = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number
      to: phoneNumber,
    });

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        sid: smsResponse.sid,
        status: smsResponse.status,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending SMS:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send SMS" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
