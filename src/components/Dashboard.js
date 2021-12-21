import React, {useEffect, useState} from "react";
// import { CartesianGrid, Line, LineChart, Tooltip,  } from "recharts";
import "../styles/Chart.css";

import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { format, parseISO, subDays } from "date-fns";
import axios from "axios";


export default function Dashboard() {
    
    const [transactios, setTransactios] = useState([])
    
    const data = [];
    useEffect(() => {
        const getData = async()=>{
            const response = await axios.get("http://localhost:5000/all-transactions")
            setTransactios(response.data)

            console.log(response.data,"dd");

            // for (let i = 0; i < response.data.length; i++) {
            //     // console.log(i,"i");
        
            //     data.push({
            //         date: subDays(new Date(), i).toISOString().substr(0, 10),
            //         value: response.data[i].amount,
            //     });
            //     console.log(data,"data");
            //   }
        }
        
        getData()
        
        // for (let i = 30; i >= 0; i--) {
        //   data.push({
        //     date: subDays(new Date(), i).toISOString().substr(0, 10),
        //     value: 1 + Math.random(),
        //   });
        // }
        
    }, [])
    
    
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={transactios}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4}></stop>
            <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05}></stop>
          </linearGradient>
        </defs>

        <Area dataKey="amount" stroke="#2451B7" fill="url(#color)" />

        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tickFormatter={(str) => {
            const date = parseISO(str);

            console.log(str,"str");
            // date after substr(0,10)

            // console.log(date,"date");
            // long Date "day - month - number day - year - full time "

            if (date.getDate() % 7 === 0) {
              return format(date, "MMM, d");
            }
            return "";
          }}
        />

        <YAxis
          dataKey="amount"
          axisLine={false}
          tickLine={false}
          tickCount={8}
          tickFormatter={(number) => `${number.toFixed(1)}SR`}
        />

        <Tooltip content={<CustomTooltip />} />

        <CartesianGrid opacity={0.2} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
    // <div>
    /* <LineChart
            width={400}
            height={400}
            // data={data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
            <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
          </LineChart> */
    // </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div className="tooltip">
          {
              console.log(label,"label")
          }
        {/* <h6>{label}</h6> */}

        <h6>{format(parseISO(label), "eee, d MMMM, yyy")}</h6>
        <h6>${payload[0].value.toFixed(2)}SR</h6>
      </div>
    );
  }
  return null;
}
