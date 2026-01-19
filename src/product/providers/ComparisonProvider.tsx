import { FC, useState } from "react";

import { comparisonContextDefaultValue, ComparisonContext } from "../contexts";
import { Product } from "../models";

export type ComparisonProviderProp = Partial<typeof comparisonContextDefaultValue>;

export const ComparisonProvider: FC<ComparisonProviderProp> = (props) => {
  const [open, setOpen] = useState(props?.isModalOpen ?? false);
  const [products, setProducts] = useState<Product[]>(props?.products ?? [])

  const isInComparison = (p: Product) => !!products.find(product => product.id === p.id)

  return (
    <ComparisonContext.Provider
      value={{
        isModalOpen: open,
        open: () => setOpen(true),
        close: () => setOpen(false),
        products,
        maximumProduct: props.maximumProduct ?? 4,
        isInComparison,
        addProduct: async (newProduct: Product) => {
          if (isInComparison(newProduct)) {
            return
          }

          setProducts([...products, newProduct])
        },
        removeProduct: async ({ id }: Product) => {
          setProducts(products.filter(product => product.id !== id))
        },
        reset: () => setProducts([])
      }}
    >
      {props.children}
    </ComparisonContext.Provider>
  );
};
