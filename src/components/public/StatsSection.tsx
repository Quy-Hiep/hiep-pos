export interface StatItem {
  icon: string;
  number: string;
  label: string;
}

const DEFAULT_STATS: StatItem[] = [
  { icon: "👥", number: "500+", label: "Khách hàng tin dùng" },
  { icon: "🛡️", number: "12", label: "Tháng bảo hành" },
  { icon: "🎧", number: "24/7", label: "Hỗ trợ kỹ thuật" },
  { icon: "🚀", number: "30 phút", label: "Cài đặt & sử dụng" },
];

interface Props {
  stats?: StatItem[];
}

export default function StatsSection({ stats = DEFAULT_STATS }: Props) {
  return (
    <section className="py-8 lg:py-12">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-[var(--color-primary)] mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-[var(--color-text-light)] font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
