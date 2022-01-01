import React, { useEffect, useState } from "react";
// import "../styles/Chart.css";
import "../../styles/Chart.css"

import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { format, parseISO } from "date-fns";
import axios from "axios";

export default function Dashboard() {
  const [transactios, setTransactios] = useState([]);

  let data = [];
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "/transactions-in-week"
      );

      setTransactios(response.data);
      let a = response.data
      console.log(a,"aaaaaaaa");

      data.push({date:a[0].date,transaction:[{from:a[0].from,to:a[0].to,amount:a[0].amount}]})
      for(let i =1 ; i<a.length ; i++){
        if(a[i].date.substr(0,10) == data[data.length-1].date.substr(0.10)){
          console.log(a[i].date.substr(0.10),"substr");
          data[data.length-1].transaction.push({from:a[i].from, to:a[i].to,amount:a[i].amount})
        } else{
          data.push({date:a[i].date,transaction:[{from:a[i].from,to:a[i].to,amount:a[i].amount}]})
        }
        // data.push(response.data[i].from)
      }

      console.log(data,"data array");

    };

    getData();

  }, []);

  return (
    <>
    {
      transactios.length && 
    <div className="container-chart">
      <ResponsiveContainer width="80%" height={350}>
        <AreaChart data={transactios}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f3909" stopOpacity={0.4}></stop>
              <stop offset="75%" stopColor="#4f3909" stopOpacity={0.05}></stop>
            </linearGradient>
          </defs>

          <Area dataKey="amount" stroke="#4f3909" fill="url(#color)" />

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tickFormatter={(str) => {
              const date = parseISO(str);
              
              // console.log(str, "str");
              // date after substr(0,10)
              
              // console.log(date, "date");
              // long Date "day - month - number day - year - full time "

              if (date.getDate() % 1 === 0) {
                return format(date, "MMM, d");
              }
              return "";
            }}
            />

          <YAxis
            dataKey="amount"
            axisLine={false}
            tickLine={false}
            tickCount={7}
            tickFormatter={(number) => `${number}SR`}
            />

          <Tooltip content={<CustomTooltip />} />

          <CartesianGrid opacity={0.2} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
            
    </div>
}
    </>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div className="tooltip">
      {/* {console.log(label, "label")} */}
      {/* {console.log(payload,"payload")} */}

      <p>{format(parseISO(label), "eee, d MMMM, yyy")}</p>
      <p>{payload[0].value.toFixed(2)}SR</p>
      <p>FROM: {payload[0].payload.from.substr(0,5)}************</p>
        <p>TO: {payload[0].payload.to.substr(0,5)}************</p>
      </div>
    );
  }
  return null;
}
