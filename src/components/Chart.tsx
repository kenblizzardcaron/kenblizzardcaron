import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useColorMode } from 'theme-ui';
import { ibtsTemp, IBTS_ROR, ROR_LINE_COLOR, TEMP_LINE_COLOR } from '../constants';
import convertToDuration from '../utils/convertToDuration';

const Chart = ({ data }) => {
  const [colorMode] = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 0, right: 0, left: 20, bottom: 20 }}
        width={500}
      >
        <defs>
          <linearGradient id="gradientRor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={ROR_LINE_COLOR} stopOpacity={1} />
            <stop offset="25%" stopColor={ROR_LINE_COLOR} stopOpacity={0.25} />
          </linearGradient>
          <linearGradient id="gradientTemp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={TEMP_LINE_COLOR} stopOpacity={1} />
            <stop offset="25%" stopColor={TEMP_LINE_COLOR} stopOpacity={0.25} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="index"
          minTickGap={16}
          tick={{ fill: isDark ? 'white' : 'black' }}
          tickFormatter={(seconds) => convertToDuration(seconds)}
          xAxisId="index"
        >
          <Label
            fill={isDark ? 'white' : 'black'}
            value="Time (mm:ss)"
            offset={-8}
            position="insideBottom"
          />
        </XAxis>
        <YAxis
          allowDataOverflow
          domain={[100, 500]}
          tick={{ fill: isDark ? 'white' : 'black' }}
          yAxisId="left"
        ></YAxis>
        <YAxis
          allowDataOverflow
          domain={[0, 50]}
          orientation="right"
          tick={{ fill: isDark ? 'white' : 'black' }}
          yAxisId="right"
        ></YAxis>
        <Area
          dataKey="ibtsTemp"
          dot={false}
          fill="url(#gradientTemp)"
          stroke={TEMP_LINE_COLOR}
          type="monotone"
          xAxisId="index"
          yAxisId="left"
        />
        <Area
          dataKey="ibtsRor"
          dot={false}
          fill="url(#gradientRor)"
          stroke={ROR_LINE_COLOR}
          type="monotone"
          xAxisId="index"
          yAxisId="right"
        />
        <Legend
          content={(props) => {
            const { payload } = props;

            return (
              <ul style={{ display: 'flex', justifyContent: 'space-around' }}>
                {payload.map((entry, index) => (
                  <li key={`item-${index}`} style={{ color: entry.color }}>
                    {entry.value === 'ibtsTemp' ? ibtsTemp : IBTS_ROR}
                  </li>
                ))}
              </ul>
            );
          }}
          verticalAlign="bottom"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;
