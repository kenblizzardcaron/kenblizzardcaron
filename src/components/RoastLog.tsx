import React, { useMemo } from 'react';
import { graphql, StaticQuery } from 'gatsby';
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
import convertToDuration from '../utils/convertToDuration';

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

const degrees = '(°F)';
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

  return (
    <StaticQuery
      query={graphql`
        query {
          allRoast20220501Csv {
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
      render={({ allRoast20220501Csv: roast }) => {
        const parsedData = roast.edges.map(({ node }) => {
          return {
            ...node,
            index: parseInt(node.Index),
            beanProbeTemp: parseInt(node.Bean_Probe_Temp),
          };
        });

        const data = parsedData.map(({ index, beanProbeTemp }) => {
          return {
            index,
            beanProbeTemp,
          };
        });

        const isDark = colorMode === 'dark';

        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data}
              margin={{ top: 0, right: 0, left: 20, bottom: 20 }}
              width={500}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="index"
                interval="preserveStartEnd"
                minTickGap={16}
                tickFormatter={(seconds) => convertToDuration(seconds)}
              >
                <Label
                  fill={isDark ? 'white' : 'black'}
                  value="Time (mm:ss)"
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
              <Line
                type="monotone"
                dataKey="beanProbeTemp"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </LineChart>
          </ResponsiveContainer>
        );
      }}
    />
  );
};

export default RoastLog;
