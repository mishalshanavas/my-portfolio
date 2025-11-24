import Balancer from "react-wrap-balancer";
import type { ReactNode } from "react";

export function CaptionComponent({ children }: { children: ReactNode }) {
  return (
    <span className="block w-full text-xs my-3 text-gray-600 dark:text-gray-400 text-center leading-normal">
      <Balancer>
        <span className="[&>a]:text-black [&>a]:dark:text-white [&>a]:hover:text-gray-600 [&>a]:dark:hover:text-gray-400">{children}</span>
      </Balancer>
    </span>
  );
}
