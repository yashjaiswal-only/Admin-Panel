import './chart.css'
import {
    LineChart,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";

export default function Chart({title,data,dataKey,grid}) {
     return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
        {/* get all things in recharts site example - different types of charts are present */}
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#5550bd" />
          {/* for naming on x-axis , get value of datakey from data */}
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" /> 
          {/* no y-axis is used , Line is used with data key active user */}
          <Tooltip /> 
          {/* tooltip is for on hovering details , cartesian grid is for bg grid */}
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>

    </div>
  ) 
}
