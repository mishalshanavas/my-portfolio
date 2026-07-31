import Balancer from "react-wrap-balancer";
import type { ReactNode } from "react";

export function CaptionComponent({ children }: { children: ReactNode }) {
  return (
    <span className="block w-full text-xs my-3 text-gray-600 dark:text-gray-400 text-center leading-normal">
      <Balancer>
        <span className="[&>a]:text-gray-900 [&>a]:dark:text-gray-100 [&>a]:hover:text-[color:var(--accent)]">{children}</span>
      </Balancer>
    </span>
  );
}
