export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { mile_value } = req.query;

  if (!mile_value) {
    return res.status(400).json({ error: "Parâmetro 'mile_value' é obrigatório" });
  }

  try {
    const response = await fetch(`https://api.milhaspix.com/simulate-ranking?mile_value=${mile_value}`);
    if (!response.ok) throw new Error("Erro na API externa");

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro ao buscar ranking:", error);
    return res.status(500).json({ error: "Erro interno" });
  }
}
