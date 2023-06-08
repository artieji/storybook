import { createContext } from "react";

export const ResizeContext = createContext<Record<"l" | "m" | "s" | "xs", boolean> | undefined>(undefined);