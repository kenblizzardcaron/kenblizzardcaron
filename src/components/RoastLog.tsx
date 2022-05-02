import React, { useMemo } from 'react';
import { graphql, StaticQuery } from 'gatsby';
// import { AxisOptions, Chart } from 'react-charts';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useColorMode } from 'theme-ui';
// import { toS } from 'hh-mm-ss';
import { format } from 'date-fns';
// import { parse } from 'papaparse';

type Roast = {
  index: number;
  // seconds: number;
  // ibtsTemp: number;
  beanProbeTemp: number;
  // ibtsRor: number;
  // beanProbeRor: number;
  // powerSetting: number;
  // drumSetting: number;
  // fanSetting: number;
};

const degrees = '°F';
const SECONDS = 'Seconds';
const ibtsTemp = `IBTS temp ${degrees}`;
const beanProbeTemp = `Bean probe temp ${degrees}`;
const ibtsRor = 'IBTS-ROR';
const ibts = 'Infrared Bean Temperature Sensor';
const beanProbeRor = 'B-ROR';
const powerSetting = 'Power level';
const drumSetting = 'Drum level';
const fanSetting = 'Fan level';

// DYNAMIC
const today = new Date();
const date = new Date(today.getYear(), today.getMonth());
const origin = 'Honduras';
const title = `May 1 2022 roast - ${origin}`;

const RoastLog = (props) => {
  const [colorMode] = useColorMode();

  // console.log('DATTA', data);

  // const parsedData = parse(data, { delimiter: ',' });

  // console.log('DATA', data);

  return (
    <StaticQuery
      query={graphql`
        query {
          allRoastCsv {
            edges {
              node {
                id
                Bean_Probe_ROR
                Bean_Probe_Temp
                IBTS_ROR
                IBTS_Temp
                Index
              }
            }
          }
        }
      `}
      render={({ allRoastCsv }) => {
        console.log('COMPONENT staticquery data', allRoastCsv);
        // console.log('test toS', toS('0:01'));

        const parsedData = allRoastCsv.edges.map(({ node }) => {
          return {
            ...node,
            index: parseInt(node.Index),
            beanProbeTemp: parseInt(node.Bean_Probe_Temp),
          };
        });

        // console.log('parsedData', parsedData);

        const data = parsedData.map(({ index, beanProbeTemp }) => {
          return {
            index,
            beanProbeTemp,
          };
        });

        console.log('chart data', data);

        const isDark = colorMode === 'dark';

        return (
          <>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={data}
                margin={{ top: 0, right: 0, left: 20, bottom: 20 }}
                width={500}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="index">
                  <Label
                    fill={isDark ? 'white' : 'black'}
                    value="Time elapsed (seconds)"
                    offset={-8}
                    position="insideBottom"
                  />
                </XAxis>
                <YAxis>
                  <Label
                    fill={isDark ? 'white' : 'black'}
                    angle={-90}
                    value={beanProbeTemp}
                    offset={0}
                    position="insideBottomLeft"
                  />
                </YAxis>
                {/* <Tooltip /> */}
                {/* <Legend /> */}
                <Line
                  type="monotone"
                  dataKey="beanProbeTemp"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </LineChart>
            </ResponsiveContainer>
          </>
        );
      }}
    />
  );
};

export default RoastLog;
