"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { buttonVariants } from "./ui/button";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  const [active, setActive] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setActive(pathname === href);
  }, [pathname, href]);

  return (
    <div className="flex">
      <div className="relative flex items-center">
        <Link
          href={href}
          className={cn(
            buttonVariants({ variant: active ? "secondary" : "ghost" })
          )}
        >
          {children}
        </Link>
      </div>
    </div>
  );
};

export default NavLink;
