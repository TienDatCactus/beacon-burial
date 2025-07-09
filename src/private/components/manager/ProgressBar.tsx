import { formatCurrency } from "@/lib/utils";

const ProgressBar = ({
  label,
  value,
  percentage,
  color = "var(--primary)",
}: {
  label: string;
  value: number;
  percentage: number;
  color?: string;
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="font-medium">{formatCurrency(value)}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className="h-2 rounded-full"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
