import Image from "next/image";
import Link from "next/link";

export interface ProductCardProps {
  image: string;
  alt?: string;
  badge?: string;
  badgeType?: string;
  name: string;
  slug: string;
  desc: string;
  price: string;
  priceOld?: string;
  priceUnit?: string;
  features: string[];
  contactPhone?: string;
}

export default function ProductCard({
  image,
  alt,
  badge,
  badgeType,
  name,
  slug,
  desc,
  price,
  priceOld,
  priceUnit,
  features,
  contactPhone = "0855285872",
}: ProductCardProps) {
  return (
    <div className="product-card-home">
      <div className="product-img-wrapper">
        <Image
          src={image}
          alt={alt || name}
          width={400}
          height={300}
          className="product-img"
          style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%" }}
        />
        {badge && (
          <span className={`product-badge ${badgeType || ""}`}>{badge}</span>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-title">
          <Link href={slug}>{name}</Link>
        </h3>
        <p className="product-desc">{desc}</p>
        <div className="product-price">
          {price}
          {priceOld && <span className="price-old">{priceOld}</span>}
          {priceUnit && <span className="price-unit">{priceUnit}</span>}
        </div>
        <ul className="features-list">
          {features.map((f, i) => (
            <li key={i}>
              <svg className="w-4 h-4 text-[var(--color-secondary)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {f}
            </li>
          ))}
        </ul>
        <div className="cta-buttons">
          <a href={`tel:${contactPhone}`} className="btn-buy">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Mua ngay
          </a>
        </div>
      </div>
    </div>
  );
}
