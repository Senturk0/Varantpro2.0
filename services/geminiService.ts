import { GoogleGenAI, Type } from "@google/genai";
import { SelectionCriteria, Warrant } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchWarrants = async (criteria: SelectionCriteria): Promise<Warrant[]> => {
  if (!criteria.symbol || !criteria.direction || !criteria.riskGroup) {
    throw new Error("Eksik kriterler.");
  }

  // Define the schema for structured JSON output
  const warrantSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        code: { type: Type.STRING, description: "Varant kısa kodu (Örn: ARABA, GADCB)" },
        underlying: { type: Type.STRING, description: "Dayanak varlık kodu (Örn: GARAN)" },
        issuer: { type: Type.STRING, enum: ["IS", "AK", "INFO"], description: "İhraççı kurum" },
        type: { type: Type.STRING, enum: ["CALL", "PUT"], description: "Varant tipi (Alım/Satım)" },
        maturityDate: { type: Type.STRING, description: "Vade tarihi (DD.MM.YYYY)" },
        strikePrice: { type: Type.NUMBER, description: "Kullanım fiyatı" },
        price: { type: Type.NUMBER, description: "Varantın güncel piyasa fiyatı" },
        delta: { type: Type.NUMBER, description: "Delta değeri (0-1 arası)" },
        gamma: { type: Type.NUMBER, description: "Gama değeri" },
        theta: { type: Type.NUMBER, description: "Teta değeri (Günlük değer kaybı)" },
        sensitivity: { type: Type.NUMBER, description: "Duyarlılık" },
        leverage: { type: Type.NUMBER, description: "Etkin kaldıraç" }
      },
      required: ["code", "underlying", "issuer", "type", "maturityDate", "strikePrice", "price", "delta", "gamma", "theta", "sensitivity", "leverage"]
    }
  };

  // Determine date instructions based on risk group
  let dateInstruction = "";
  let riskContext = "";
  
  switch (criteria.riskGroup) {
    case '0-15':
      dateInstruction = "Vade tarihleri bugünden itibaren 2 gün ile 15 gün arasında olmalı (Çok Yakın Vade).";
      riskContext = "Bu varantlar vadesine çok az kaldığı için Teta (zaman değeri kaybı) çok yüksek olmalı, Kaldıraç çok yüksek olabilir.";
      break;
    case '16-30':
      dateInstruction = "Vade tarihleri bugünden itibaren 16 gün ile 30 gün arasında olmalı.";
      riskContext = "Teta değeri belirgindir. Kaldıraç ortalamanın üzerindedir.";
      break;
    case '31-60':
      dateInstruction = "Vade tarihleri bugünden itibaren 31 gün ile 60 gün arasında olmalı.";
      riskContext = "Dengeli risk profili. Makul kaldıraç ve delta.";
      break;
    case '60-90':
      dateInstruction = "Vade tarihleri bugünden itibaren 60 gün ile 90 gün arasında olmalı.";
      riskContext = "Daha düşük kaldıraç, daha düşük Teta etkisi.";
      break;
  }

  const prompt = `
    Kullanıcı şu kriterlere göre BIST 30 varantlarını arıyor:
    Hisse: ${criteria.symbol}
    Yön (Tip): ${criteria.direction} (CALL = Alım/Yükseliş, PUT = Satım/Düşüş)
    Risk Grubu: ${criteria.riskGroup} gün vadeye kalan.

    Lütfen bu kriterlere uygun, gerçekçi piyasa verilerine dayanan 6 ile 12 adet arasında varant verisi oluştur.
    
    Veri kaynakları olarak şunları simüle et: İş Varant, Ak Varant, İnfo Varant.
    Varant kodlarını gerçekçi formatlarda üret.
    
    Tarih ve Risk Talimatları:
    - ${dateInstruction}
    - ${riskContext}
    
    Önemli:
    - ${criteria.direction === 'CALL' ? 'Kullanım fiyatları (Strike Price) hisse fiyatına yakın veya biraz üzerinde olsun.' : 'Kullanım fiyatları hisse fiyatına yakın veya biraz altında olsun.'}
    - Delta, Gama, Teta ve Kaldıraç değerleri vadeye ve paraya yakınlığa göre tutarlı, matematiksel olarak mantıklı olsun.
    - JSON formatında yanıtla.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: warrantSchema,
        temperature: 0.3
      },
    });

    const text = response.text;
    if (!text) return [];

    const data = JSON.parse(text) as Warrant[];
    return data;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
};