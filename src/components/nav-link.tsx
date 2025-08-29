"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenuButton } from "@/components/ui/sidebar";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <SidebarMenuButton asChild isActive={isActive}>
      <Link href={href}>{children}</Link>
    </SidebarMenuButton>
  );
}
