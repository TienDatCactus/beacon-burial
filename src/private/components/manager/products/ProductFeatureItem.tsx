import { Check } from "lucide-react";

const ProductFeatureItem = ({ feature }: { feature: string }) => {
  return (
    <div className="flex items-start gap-2 py-1">
      <div className="mt-0.5 bg-primary/10 rounded-full p-1 shrink-0">
        <Check className="h-3.5 w-3.5 text-primary" />
      </div>
      <p className="text-sm text-gray-700">{feature}</p>
    </div>
  );
};

export default ProductFeatureItem;
