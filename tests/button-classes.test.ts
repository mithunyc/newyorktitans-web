import { describe, expect, it } from "vitest";
import React, { isValidElement, type ReactElement } from "react";
import { Button } from "../components/ui/Button";

type ClassNameProps = { className?: string };

(globalThis as typeof globalThis & { React: typeof React }).React = React;

function buttonClassName(props?: Parameters<typeof Button>[0]): string {
  const element = Button({ children: "Action", ...props });
  if (!isValidElement(element)) throw new Error("Button did not return a React element");
  return String((element as ReactElement<ClassNameProps>).props.className);
}

describe("Button class merging", () => {
  it("preserves primary CTA contrast and body font size", () => {
    const className = buttonClassName({ variant: "primary", size: "lg", children: "Action" });

    expect(className).toContain("bg-gold");
    expect(className).toContain("!text-midnight");
    expect(className).toContain("text-bodyLg");
    expect(className).toContain("[&_*]:![color:inherit]");
  });

  it("preserves secondary and tertiary text color with body font size", () => {
    const secondary = buttonClassName({ variant: "secondary", children: "Action" });
    const tertiary = buttonClassName({ variant: "tertiary", children: "Action" });

    expect(secondary).toContain("!text-white");
    expect(secondary).toContain("text-body");
    expect(tertiary).toContain("!text-white");
    expect(tertiary).toContain("text-body");
  });
});
