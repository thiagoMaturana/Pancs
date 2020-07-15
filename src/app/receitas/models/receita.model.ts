export interface Receita {
  id: string;
  nome: string;
  ingredientes: string[];
  modoDePreparo: string;
  observacao?: string;
  photoUrl: string[];
  tipo: string;
}