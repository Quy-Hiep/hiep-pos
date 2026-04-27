"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ContactSettings {
  contactPhone: string;
  socialZalo: string;
  socialFacebook: string;
}

export default function FloatingButtons() {
  const [settings, setSettings] = useState<ContactSettings>({
    contactPhone: "0855285872",
    socialZalo: "0855285872",
    socialFacebook: "HiepPOS",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/settings");
        if (response.ok) {
          const data = await response.json();
          setSettings({
            contactPhone: data.contactPhone || "0855285872",
            socialZalo: data.socialZalo || "0855285872",
            socialFacebook: data.socialFacebook || "HiepPOS",
          });
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div className="floating-btn-group">
      <a href={`tel:${settings.contactPhone}`} className="fab-item fab-call" title="Gọi điện">
        <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      </a>
      <a
        href={`https://zalo.me/${settings.socialZalo}`}
        className="fab-item fab-zalo"
        title="Nhắn Zalo"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/images/icons/icon_zalo_50x50.png"
          alt="Zalo"
          width={32}
          height={32}
          className="fab-icon-zalo"
        />
      </a>
      <a
        href={`https://www.facebook.com/${settings.socialFacebook}`}
        className="fab-item fab-facebook"
        title="Facebook"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/images/icons/icon-facebook-100x100.png"
          alt="Facebook"
          width={32}
          height={32}
          className="fab-icon-facebook"
        />
      </a>
    </div>
  );
}
