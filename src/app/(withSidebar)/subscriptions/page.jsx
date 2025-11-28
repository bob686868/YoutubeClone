// pages/subscriptions.jsx
import React from "react";
import ChannelCard from "./ChannelCard";
import { getSubscribedTo } from "@/app/actions/users";

const SubscriptionsPage =async  () => {
  let {subscribedTo}=await getSubscribedTo()
  let info=subscribedTo.subscribedTo
  console.log(info)
  // Demo data — replace this with API data later

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-gray-50 p-6 sm:p-10">
      <h1 className="text-2xl mt-3 sm:text-3xl font-semibold mb-8">
        Subscribed Channels
      </h1>
      {info.length==0 &&
      <div className="absolute text-2xl font-medium text-neutral-300 top-[50%] left-[50%] -translate-x-[50%]">
          No subscriptions available
      </div>
      }
      <div className="-ml-5 grid gap-x-30 sm:gap-y-8  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {info.map((channel) => (
          <ChannelCard key={channel.id} {...channel} />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionsPage;
