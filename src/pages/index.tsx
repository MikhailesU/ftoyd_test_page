import useScreenSize from '@/useScreenSize';
import MatchList from '../components/MatchList';

   const Home: React.FC = () => {
    useScreenSize([1920])
     return (
       <div>
         <MatchList />
       </div>
     );
   };

   export default Home;
