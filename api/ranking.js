// /api/ranking.js
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const { mile_value } = req.query;

  if (!mile_value) {
    res.status(400).json({ error: "Parâmetro 'mile_value' é obrigatório" });
    return;
  }

  try {
    // 🔹 Chamada real à API externa
    const response = await fetch(
      `https://api.milhaspix.com/simulate-ranking?mile_value=${mile_value}`
    );

    if (!response.ok) {
      throw new Error(`Erro na API externa: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("⚠️ Erro ao buscar ranking:", error.message);

    // 🔹 Retorno seguro (mock) para não travar o front-end
    const mockData = {
      ranking: [
        { position: 1, mile_value: 16.56, description: "oferta padrão" },
        { position: 2, mile_value: 16.50, description: "oferta padrão" },
        { position: 3, mile_value: 16.45, description: "oferta padrão" },
        { position: 4, mile_value: 16.40, description: "sua posição" },
      ],
    };

    res.status(200).json(mockData);
  }
}
