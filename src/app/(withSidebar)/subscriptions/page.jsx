// pages/subscriptions.jsx
import React from "react";
import ChannelCard from "./ChannelCard";
import { getSubscribedTo } from "@/app/actions/users";

const SubscriptionsPage =async  () => {
  let {subscribedTo}=await getSubscribedTo()
  let info=subscribedTo.subscribedTo
  console.log(info)
  // Demo data — replace this with API data later
  const subscribedChannels = [
    {
      id: 1,
      name: "Tech with Ibrahim",
      logo: "https://i.pravatar.cc/150?img=3",
      subscribers: 15200,
    },
    {
      id: 2,
      name: "Web Dev Simplified",
      logo: "https://i.pravatar.cc/150?img=8",
      subscribers: 879000,
    },
    {
      id: 3,
      name: "Coding Addict",
      logo: "https://i.pravatar.cc/150?img=11",
      subscribers: 435000,
    },
    {
      id: 4,
      name: "JavaScript Mastery",
      logo: "https://i.pravatar.cc/150?img=12",
      subscribers: 1220000,
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-gray-50 p-6 sm:p-10">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-8">
        Subscribed Channels
      </h1>

      <div className="-ml-5 grid gap-x-30 sm:gap-y-8  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {info.map((channel) => (
          <ChannelCard key={channel.id} {...channel} />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionsPage;
