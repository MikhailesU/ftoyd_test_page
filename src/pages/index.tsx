import useScreenSize from '@/useScreenSize';
import Main from '../components/Main';

   const Home: React.FC = () => {
    useScreenSize([1920])
     return (
       <div>
         <Main />
       </div>
     );
   };

   export default Home;
