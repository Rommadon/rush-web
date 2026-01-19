import { createContext } from "react";

import { Product } from '../models'

export const comparisonContextDefaultValue = {
  products: [] as Product[],
  isModalOpen: false,
  open: () => {},
  close: () => {},
  reset: () => {},
  addProduct: async (_: Product) => {},
  removeProduct: async (_: Product) => {},
  isInComparison: (_: Product) => false,
  maximumProduct: 4,
}

export const ComparisonContext = createContext(comparisonContextDefaultValue);

export default ComparisonContext;