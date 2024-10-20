import React from "react";
import { useTotalSongQuery } from "@/redux/slices/home/homeApi";
import { Music, Clock, CheckCircle } from "lucide-react";
interface StatusCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  gradient: string;
  description?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  count,
  icon,
  gradient,
  description,
}) => {
  return (
    <div
      className="flex items-center p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      style={{ background: gradient, color: "#fff" }}
      title={description}
    >
      <div
        className="w-16 h-16 flex items-center justify-center rounded-full mr-5 shadow-lg"
        style={{
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(4px)",
          color: "#fff",
          transition: "transform 0.3s",
        }}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium">{title}</h3>
        <h2 className="text-2xl font-semibold">{count}</h2>
      </div>
    </div>
  );
};

const TotalSong = () => {
  const { data, isError } = useTotalSongQuery({});

  const earnStatus = [
    {
      title: "Total Releases",
      count: data?.data?.totalSongs || 0,
      icon: <Music size={30} />,
      gradient: "linear-gradient(135deg, #4169E1 0%, #87CEEB 100%)",
      description: "All songs released by the user.",
    },
    {
      title: "Ready for Approve",
      count: data?.data?.totalPendingSongs || 0,
      icon: <Clock size={30} />,
      gradient: "linear-gradient(135deg, #FF7F50 0%, #FFA07A 100%)",
      description: "Songs pending approval.",
    },
    {
      title: "Distributed Releases",
      count: data?.data?.totalApprovedSongs || 0,
      icon: <CheckCircle size={30} />,
      gradient: "linear-gradient(135deg, #3CB371 0%, #90EE90 100%)",
      description: "Approved and distributed songs.",
    },
  ];

  if (isError) {
    return (
      <div className="flex justify-center items-center h-40 text-red-500">
        Error fetching data.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-4">
      {earnStatus.map((item, index) => (
        <StatusCard
          key={index}
          title={item.title}
          count={item.count}
          icon={item.icon}
          gradient={item.gradient}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default TotalSong;
