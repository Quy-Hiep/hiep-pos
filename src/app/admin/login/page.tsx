"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Email hoặc mật khẩu không đúng.");
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-logo">
          <Image src="/images/icons/logo.png" alt="Hiệp POS" width={120} height={40} style={{ width: "auto", height: "auto" }} />
        </div>
        <h1 className="admin-login-title">Đăng nhập quản trị</h1>

        {error && <div className="admin-login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-form-group">
            <label htmlFor="email" className="admin-form-label">Email</label>
            <input
              id="email"
              type="email"
              className="admin-form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@hieppos.com"
              required
              autoComplete="email"
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="password" className="admin-form-label">Mật khẩu</label>
            <input
              id="password"
              type="password"
              className="admin-form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="admin-login-btn" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}
