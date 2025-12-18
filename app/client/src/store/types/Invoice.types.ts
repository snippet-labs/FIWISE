export interface Invoice {
  id: string;
  name: string;
  month: string;
  year: number;
  level: string;
  fees: number;
  confirmation: boolean;
}

export type InvoiceStore = {
  invoices: Invoice[];
  addInvoice: (data: Omit<Invoice, "id" | "confirmation">) => void;
  toggleInvoiceConfirmation: (id: string) => void;
  deleteInvoice: (id: string) => void;
};
