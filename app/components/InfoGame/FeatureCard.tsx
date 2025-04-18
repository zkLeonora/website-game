// app/components/infoGame/FeatureCard.tsx
type Props = {
    title: string;
    description: string;
  };
  
  export default function FeatureCard({ title, description }: Props) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    );
  }
  