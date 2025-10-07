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
    const response = await fetch(
      `https://api.milhaspix.com/simulate-ranking?mile_value=${mile_value}`
    );

    if (!response.ok) {
      throw new Error(`Erro na API externa: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Erro ao buscar ranking:", error);
    res.status(500).json({ error: "Erro ao buscar ranking" });
  }
}
