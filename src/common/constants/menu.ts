import {
  ArrowLeftStartOnRectangleIcon,
  BookOpenIcon,
  ClipboardDocumentCheckIcon,
  InboxStackIcon,
  PresentationChartLineIcon,
  UsersIcon,
} from "@heroicons/vue/24/outline";
import type { ISidebarMenu } from "../interfaces/menu";

export const adminMenus: { title: string; items: ISidebarMenu[] }[] = [
  {
    title: "MENU",
    items: [
      {
        label: "Dashboard",
        path: "/admin/dashboard",
        iconName: PresentationChartLineIcon,
        roles: ["Admin", "Petugas"],
      },
      {
        label: "Borrowing",
        path: "/admin/borrowing",
        iconName: ClipboardDocumentCheckIcon,
        roles: ["Admin", "Petugas"],
      },
      {
        label: "Return",
        path: "/admin/books-return",
        iconName: InboxStackIcon,
        roles: ["Admin", "Petugas"],
      },
    ],
  },
  {
    title: "MASTER DATA",
    items: [
      {
        label: "Books",
        path: "/admin/books",
        pathnames: ["admin-books-create", "admin-books-edit-id"],
        iconName: BookOpenIcon,
        roles: ["Admin"],
      },
      {
        label: "User Management",
        path: "/admin/user-management",
        iconName: UsersIcon,
        roles: ["Admin"],
      },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      {
        label: "Logout",
        path: "/logout",
        iconName: ArrowLeftStartOnRectangleIcon,
        roles: ["Admin", "Petugas"],
      },
    ],
  },
];

export const studentMenu: ISidebarMenu[] = [
  {
    label: "Peminjaman Buku",
    path: "/student/borrow-submission",
    roles: ["Mahasiswa"],
  },
  {
    label: "Riwayat Peminjaman",
    path: "/student/history",
    roles: ["Mahasiswa"],
  },
  {
    label: "Logout",
    path: "/logout",
    roles: ["Mahasiswa"],
  },
];
