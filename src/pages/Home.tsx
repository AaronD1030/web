import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Home = () => {
  return (
    <div style={{
      backgroundImage: "url(" + "/public/background.jpeg" + ")",
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }} className="grid justify-center h-full items-center">
      <div className="flex bg-hero h-full gap-4" >
        {/* <div className="flex p-4 text-[2rem] font-bold">
          Welcome to <p className="text-red-700 mx-1"> Capt&#39;s Gym </p> ADMIN DASHBOARD
        </div> */}
        <div className="flex p-4 text-gray-700 text-[3rem] font-bold" style={{ WebkitTextStroke: '2px white' }}>
          Welcome to Capt&#39;s Gym ADMIN DASHBOARD
        </div>

        <div className='w-96 p-10'>
          <Calendar />
        </div>
      </div>
    </div>

  );
};

export default Home;