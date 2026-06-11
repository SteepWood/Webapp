import {
  FileText,
  FolderKanban,
  LayoutDashboard,
  MapPinned,
  MessageSquareQuote,
  Settings,
  Star,
} from "lucide-react";

export const ADMIN_NAV_ITEMS = [
  {
    href: "/admin/",
    label: "Dashboard",
    icon: LayoutDashboard,
    exact: true as const,
  },
  {
    href: "/admin/quotes/",
    label: "Quote Requests",
    icon: MessageSquareQuote,
  },
  {
    href: "/admin/testimonials/",
    label: "Testimonials",
    icon: Star,
  },
  {
    href: "/admin/blog/",
    label: "Blog Posts",
    icon: FileText,
  },
  {
    href: "/admin/projects/",
    label: "Projects",
    icon: FolderKanban,
  },
  {
    href: "/admin/services-locations/",
    label: "Services & Locations",
    icon: MapPinned,
  },
  {
    href: "/admin/settings/",
    label: "Settings",
    icon: Settings,
  },
] as const;
