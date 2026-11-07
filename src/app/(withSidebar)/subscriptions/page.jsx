import React from "react";
import ChannelCard from "./ChannelCard";
import { getSubscribedTo } from "@/app/actions/users";
import { MdOutlineSubscriptions } from "react-icons/md";

const SubscriptionsPage = async () => {
  const subscribedTo = await getSubscribedTo();
  const channels = subscribedTo?.subscribedTo || [];

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto min-h-[75vh]">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-8">
        All Subscriptions
      </h1>

      {channels.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-3">
            <MdOutlineSubscriptions size={32} className="text-neutral-500" />
          </div>
          <p className="text-lg font-medium text-neutral-300">
            No subscriptions yet
          </p>
          <p className="text-sm text-neutral-500 mt-1">
            Subscribe to your favorite channels to see their latest videos.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {channels.map((channel) => (
            <ChannelCard key={channel.id} {...channel} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SubscriptionsPage;
