import { MusicIcon, VideoIcon } from "lucide-react";

const TotalSong = () => {
  //   const { data }: any = useGetEarnStatusQuery(undefined);
  const earnStatus = [
    {
      title: "Total Songs",
      count: 20,
      icon: <MusicIcon size={30} />,
      color: "#D2F6FF",
      bgColor: "#1E1E1E",
    },
    {
      title: "Total Videos",
      count: 30,
      icon: <VideoIcon size={30} />,
      color: "#D2F6FF",
      bgColor: "#1E1E1E",
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-2 ">
      {earnStatus.map((data, index) => (
        <div
          key={index}
          className="flex items-center  gap-5  p-5 rounded bg-base shadow-md"
        >
          <div
            className="w-16 h-16 flex items-center justify-center rounded-full"
            style={{ background: data.bgColor, color: data.color }}
          >
            {data.icon}
          </div>
          <div>
            <h3 className="text-lg font-normal text-black">{data.title}</h3>
            <h2 className="text-3xl font-semibold text-yellow">{data.count}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TotalSong;
