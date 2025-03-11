import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import refresh from './images/Refresh.svg'
import icon_team from './images/icon_team.png'
import err_icon from './images/error.svg'


interface Team {
  name: string;
  place: number
  players: {
    kills: number
    username: string
  }[]
  points: number
  total_kills: number

}

interface Match {
  title: string;
  time: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  status: string;
}

export default function MatchList() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const rotImg = useRef<HTMLImageElement>(null)

  const fetchMatches = async () => {
    try {
      const response = await fetch('https://app.ftoyd.com/fronttemp-service/fronttemp');
      if (!response.ok) {
        setError(true);
      }
      setLoading(true)
      const data: {
        data: {
          matches: Match[];
        };
      } = await response.json();
      setMatches(data.data.matches);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-between items-center my-3">
        <h1 className='font-[TacticSans] font-bold' style={{ fontSize: 'calc(36px * var(--screen-factor))'}}>Match Tracker</h1>
        <div className='flex flex-row items-center gap-2'>
          {error&&<div className={'error'}>
            <Image src={err_icon} alt="Refresh" width={20} height={20} />
            Ошибка: не удалось загрузить информацию
          </div>}
          <button onClick={() => fetchMatches()} onMouseEnter={() => {
            const busketSpinning = [
              { transform: "rotateZ(0)" },
              { transform: "rotateZ(-360deg)" },
            ];

            const Timing = {
              duration: 500,
              iterations: 1,
            };

            rotImg.current!.animate(busketSpinning, Timing);

          }} onMouseLeave={() => {
            const busketSpinning = [
              { transform: "rotateZ(0)" },
              { transform: "rotateZ(360deg)" },
            ];

            const Timing = {
              duration: 500,
              iterations: 1,
            };

            rotImg.current!.animate(busketSpinning, Timing);
          }}
            className="hover:opacity-50">
            Обновить
            <Image src={refresh} alt="Refresh" width={20} height={20} className='transition' ref={rotImg} /></button>
        </div>
      </div>
      {loading? 
      <div>
        <h1>LOADING...</h1>
        <Image src={refresh} alt="Refresh" width={20} height={20} className='animate-spin'/>
      </div>:

      <ul className="list-none m-0 p-0">
        {matches.map((match, index) => (
          <li key={index}>
            <div style={{ backgroundColor: '#0B0E12', fontSize: 'calc(25px * var(--screen-factor))' }}
              className={"flex justify-between items-center my-3 px-4 py-2 rounded shadow"}>
              <h2 className='flex flex-row items-center gap-2'>
                <Image src={icon_team} alt={match.awayTeam.name} width={50} height={50} style={{ width: 'calc(50px * var(--screen-factor))', height: 'calc(50px * var(--screen-factor))'}}/>
                {match.awayTeam.name}</h2>
              <div className='flex flex-col justify-center items-center'>
                <p>{match.awayScore}:{match.homeScore}</p>
                {(() => {
                  switch (match.status) {
                    case 'Finished':
                      return <div style={{ backgroundColor: '#EB0237' }} className={"status"}>Finished</div>;
                    case 'Ongoing':
                      return <div style={{ backgroundColor: '#43AD28' }} className={"status"}>Live</div>;
                    case 'Scheduled':
                      return <div style={{ backgroundColor: '#EB6402' }} className={"status"}>Match preparing</div>;
                  }
                })()}
              </div>
              <h2 className='flex flex-row items-center gap-2'>{match.homeTeam.name}
                <Image src={icon_team} alt={match.homeTeam.name} width={50} height={50} style={{ width: 'calc(50px * var(--screen-factor))', height: 'calc(50px * var(--screen-factor))'}}/>
              </h2>
            </div>
          </li>
        ))}
      </ul>}
    </div>
  );
};