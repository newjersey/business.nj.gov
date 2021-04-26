import { useEffect } from "react";

export const useMountEffect = (fun: () => void): void => useEffect(fun, []);

export const onEscape = (e: KeyboardEvent, handler: () => void): void => {
  if (e.key === "Escape") {
    e.preventDefault();
    handler();
  }
};

export const templateEval = (template: string, args: Record<string, string>): string =>
  template.replace(/\${(\w+)}/g, (_, v) => args[v]);
