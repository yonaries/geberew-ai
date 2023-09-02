"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "./icons";
import { Edit } from "lucide-react";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: keyof typeof Icons;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex h-full flex-col justify-between space-x-2 lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {" "}
      <div className="flex flex-col justify-between space-y-1">
        <Image
          src={require("../assets/images/logo-light.svg")}
          alt="Jegool"
          width={50}
        />
        <div className="h-5"></div>
        {items.map((item) => {
          const Icon = Icons[item.icon];

          return (
            <div
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "flex items-center justify-start space-x-4 rounded-md",
                pathname === item.href
                  ? "bg-muted hover:bg-muted"
                  : "hover:bg-muted hover:underline"
              )}
              key={item.href}
            >
              {item.icon && <Icon className="h-4 w-4" />}
              <Link key={item.href} href={item.href}>
                {item.title}
              </Link>
            </div>
          );
        })}
        {pathname.includes("creator") && (
          <Button variant="outline" className="space-x-4">
            <Link href="/creator/post/new" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Create Post
            </Link>
          </Button>
        )}
      </div>
      {/*<AccountSwitcher />*/}
    </nav>
  );
}