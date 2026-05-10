"use client";

import { useRouter } from "next/navigation";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode
} from "react";

type ViewTransitionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

export const ViewTransitionLink = forwardRef<HTMLAnchorElement, ViewTransitionLinkProps>(
  function ViewTransitionLink({ href, children, onClick, ...props }, ref) {
    const router = useRouter();

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);

      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) {
        return;
      }

      event.preventDefault();

      const navigate = () => router.push(href);

      if (document.startViewTransition) {
        document.startViewTransition(navigate);
        return;
      }

      navigate();
    };

    return (
      <a ref={ref} href={href} onClick={handleClick} {...props}>
        {children}
      </a>
    );
  }
);
