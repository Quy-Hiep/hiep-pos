"use client";

import { signOut } from "next-auth/react";

interface AdminHeaderProps {
  title: string;
}

export default function AdminHeader({ title }: AdminHeaderProps) {
  return (
    <header className="admin-header">
      <h1 className="admin-header-title">{title}</h1>
      <div className="admin-header-actions">
        <span className="admin-header-user">admin@hieppos.com</span>
        <button
          className="admin-logout-btn"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
        >
          Đăng xuất
        </button>
      </div>
    </header>
  );
}
