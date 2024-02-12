import { FaRegCalendarDays } from "react-icons/fa6";

const Home = () => {
  return (
    <div className="grid justify-center items-center">
      <div className="flex font-bold gap-4 text-[2rem] mt-10 h-full w-full" >
        <div className="flex">
          Welcome to <p className="text-red-700 mx-1"> Capt’s Gym </p> ADMIN DASHBOARD
        </div>
        <FaRegCalendarDays size={200} />
      </div>
    </div>

  );
};

export default Home;