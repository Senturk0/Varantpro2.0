export type Direction = 'CALL' | 'PUT'; // Alım (Yükseliş) | Satım (Düşüş)
// Risk Groups based on days to maturity
export type RiskGroup = '0-15' | '16-30' | '31-60' | '60-90';

export interface SelectionCriteria {
  symbol: string | null;
  direction: Direction | null;
  riskGroup: RiskGroup | null;
}

export interface Warrant {
  code: string;
  underlying: string;
  issuer: 'IS' | 'AK' | 'INFO'; // İş, Ak, İnfo
  type: Direction;
  maturityDate: string;
  strikePrice: number;
  price: number; // Güncel fiyat
  delta: number;
  gamma: number; 
  theta: number;
  sensitivity: number; // Duyarlılık
  leverage: number; // Kaldıraç
  logoUrl?: string; // Optional logo for issuer
}

export interface BistStock {
  code: string;
  name: string;
}