import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Home = () => {
  return (
    <div className="grid justify-center items-center">
      <div className="flex  gap-4 mt-10 h-full w-full" >
        <div className="flex text-[2rem] font-bold">
          Welcome to <p className="text-red-700 mx-1"> Capt’s Gym </p> ADMIN DASHBOARD
        </div>
        <div className='w-96 p-10'>
          <Calendar />
        </div>
      </div>
    </div>

  );
};

export default Home;