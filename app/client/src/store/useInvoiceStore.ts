import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { InvoiceStore } from "./types/Invoice.types";
import { nanoid } from "nanoid";

export const useInvoiceStore = create<InvoiceStore>()(
  persist(
    (set) => ({
      invoices: [],
      addInvoice: (data) => {
        set((state) => ({
          invoices: [
            {
              id: nanoid(),
              confirmation: false,
              ...data,
            },
            ...state.invoices,
          ],
        }));
      },
      toggleInvoiceConfirmation: (id: string) => {
        set((state) => ({
          invoices: state.invoices.map((invoice) =>
            invoice.id === id
              ? { ...invoice, confirmation: !invoice.confirmation }
              : invoice,
          ),
        }));
      },
      deleteInvoice: (id: string) => {
        set((state) => ({
          invoices: state.invoices.filter((invoice) => invoice.id !== id),
        }));
      },
    }),
    { name: "InvoiceRegistryDetails" },
  ),
);
