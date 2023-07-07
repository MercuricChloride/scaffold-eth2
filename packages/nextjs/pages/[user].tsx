import { ethers } from "ethers";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

interface UserPageProps {
  user: string;
}

const UserPage = ({ user }: UserPageProps) => {
  const { data: userStats, isLoading } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "userStats",
    args: [user],
  });

  const {
    data: events,
    isLoading: isLoadingEvents,
    error: errorReadingEvents,
  } = useScaffoldEventHistory({
    contractName: "YourContract",
    eventName: "AlarmSet",
    fromBlock: 0,
    filters: { user },
  });

  if (isLoading || isLoadingEvents) return <div> Loading... </div>;
  if (errorReadingEvents) return <div> Error! </div>;

  const { onTimeAlarms, missedAlarms } = userStats as any;
  const totalValueStaked = events?.reduce((acc: any, event: any) => acc + event.valueStake, 0);
  const totalAlarms = onTimeAlarms + missedAlarms;

  return (
    <div className="flex flex-col flex-grow bg-base-100 justify-center items-center">
      <div className="flex text-4xl m-6">USER: {<Address address={user} />}</div>
      <div className="flex stats shadow p-6 bg-base-200">
        <div className="stat">
          <div className="stat-title text-black">Total Alarms</div>
          <div className="stat-value text-black">{totalAlarms.toString()}</div>
        </div>

        <div className="stat">
          <div className="stat-title text-black">On Time Alarms</div>
          <div className="stat-value text-black">{onTimeAlarms.toString()}</div>
        </div>

        <div className="stat">
          <div className="stat-title text-black">Missed Alarms</div>
          <div className="stat-value text-black">{missedAlarms.toString()}</div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { user } = context.params;
  return { props: { user } };
}

export default UserPage;
