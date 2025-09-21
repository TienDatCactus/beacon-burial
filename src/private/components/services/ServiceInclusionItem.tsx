import { Check } from "lucide-react";

const ServiceInclusionItem: React.FC<{
  item: { [key: string]: any };
}> = ({ item }) => {
  return (
    <div className="flex items-start gap-2 py-1">
      <div className="mt-1 bg-primary/10 rounded-full p-1 shrink-0">
        <Check className="h-3.5 w-3.5 text-primary" />
      </div>
      <div>
        <p className="font-medium text-gray-800">{item.name}</p>
        <p className="text-sm text-gray-600 mt-0.5">{item.description}</p>
      </div>
    </div>
  );
};

export default ServiceInclusionItem;
