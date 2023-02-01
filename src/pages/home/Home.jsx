import Chart from '../../components/chart/Chart'
import FeaturedInfo from '../../components/featuredInfo/featuredInfo'
import './home.css'
import { userdata } from '../../dummyData'
import WidgetSm from '../../components/widgetSm/WidgetSm'
import WidgetLg from '../../components/widgetLg/WidgetLg'
import { useState } from 'react'
import { useMemo } from 'react'
import { useEffect } from 'react'
import { userRequest } from '../../requestMethod'


export default function Home() {
  const [userStats,setUserStats]=useState([]);
  const MONTHS=useMemo(
    ()=>
    [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
  []);

  useEffect(()=>{
      const getStats = async ()=>{
        try {
          const res= await userRequest.get('/users/stats');
          console.log('user stats')
          console.log(res);
          res.data.map(item=>
            setUserStats((prev)=>[
              ...prev,
              {name:MONTHS[item._id-1],'ActiveUser':item.total},
            ])
          )
        } catch (err) {}        
      }
      getStats();
  },[MONTHS]);

  // console.log(userStats);
  return (
    <div className='home'>
      <FeaturedInfo/>
      <Chart data={userStats} title='User Analytics' grid dataKey="ActiveUser"/>

      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>

  )
}
