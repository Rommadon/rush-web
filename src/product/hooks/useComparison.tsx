import { useContext } from "react"
import { ComparisonContext } from "../contexts"

export const useComparison = () => {
  const context = useContext(ComparisonContext)

  return context
}