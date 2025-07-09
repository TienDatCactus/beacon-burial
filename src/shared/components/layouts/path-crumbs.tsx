"use client";
import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface PathCrumbsProps {
  homeLabel?: string;
  showHomeIcon?: boolean;
  className?: string;
  customSegments?: Record<string, string>;
  maxItems?: number;
}

export default function PathCrumbs({
  homeLabel = "Trang chủ",
  showHomeIcon = true,
  className = "",
  customSegments = {},
  maxItems = 0, // 0 means show all
}: PathCrumbsProps) {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    // Skip rendering breadcrumbs on home page
    if (pathname === "/") return [];

    // Split the pathname into segments
    const segments = pathname.split("/").filter(Boolean);

    // Create array of breadcrumb items with paths and labels
    return segments
      .map((segment, index) => {
        // Build the path for this breadcrumb
        const path = `/${segments.slice(0, index + 1).join("/")}`;

        // Handle special cases like (anonymous) route group in Next.js
        if (segment.startsWith("(") && segment.endsWith(")")) {
          return null;
        }

        // Get label from customSegments if available, otherwise prettify the segment
        const label =
          customSegments[segment] ||
          segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (letter) => letter.toUpperCase());

        return { path, label, segment };
      })
      .filter(Boolean); // Remove null items
  }, [pathname, customSegments]);

  // Don't render anything if we have no breadcrumbs
  if (breadcrumbs.length === 0) return null;

  // Determine if we need to truncate breadcrumbs
  const shouldTruncate = maxItems > 0 && breadcrumbs.length > maxItems;

  // Get the breadcrumbs to display
  const visibleBreadcrumbs = shouldTruncate
    ? [
        // Always show the first item
        breadcrumbs[0],
        // Show ellipsis if truncating
        { path: "", label: "", segment: "ellipsis" },
        // Show the last n-1 items (where n is maxItems)
        ...breadcrumbs.slice(breadcrumbs.length - (maxItems - 1)),
      ]
    : breadcrumbs;

  return (
    <Breadcrumb className={`py-3 ${className}`}>
      <BreadcrumbList>
        {/* Home link */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/" className="flex items-center hover:text-primary">
              {showHomeIcon && <Home className="h-4 w-4 mr-1" />}
              <span className="hidden sm:inline">{homeLabel}</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        {/* Breadcrumb items */}
        {visibleBreadcrumbs.map((breadcrumb, index) => (
          <React.Fragment
            key={
              breadcrumb?.segment === "ellipsis" ? "ellipsis" : breadcrumb?.path
            }
          >
            {breadcrumb?.segment === "ellipsis" ? (
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem>
                {index === visibleBreadcrumbs.length - 1 ? (
                  <BreadcrumbPage>{breadcrumb?.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={breadcrumb?.path || "#"}>
                      {breadcrumb?.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            )}

            {index < visibleBreadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// Create a separate BreadcrumbEllipsis component since we didn't import it
function BreadcrumbEllipsis() {
  return (
    <span className="flex items-center">
      <span className="mx-1">...</span>
    </span>
  );
}
