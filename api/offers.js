// /api/offers.js

export default async function handler(req, res) {
  // 🔹 Configura CORS e métodos permitidos
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // 🔹 Responde rapidamente a requisições OPTIONS
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    // 🔹 Faz a chamada à API real de ofertas
    const response = await fetch("https://api.milhaspix.com/simulate-offers-list");

    if (!response.ok) {
      throw new Error(`Erro na API externa: ${response.status}`);
    }

    // 🔹 Retorna o JSON obtido
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Erro ao buscar ofertas:", error);
    res.status(500).json({ error: "Erro ao buscar ofertas" });
  }
}
