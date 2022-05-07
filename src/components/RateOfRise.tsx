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
  // beanProbeTemp: number;
  ibtsRor: number;
  beanProbeRor: number;
  // powerSetting: number;
  // drumSetting: number;
  // fanSetting: number;
};

const DEGREES = '(°F)';
const SECONDS = 'Seconds';
const ibtsTemp = `IBTS temp ${DEGREES}`;
const beanProbeTemp = `Bean probe temp ${DEGREES}`;
const IBTS_ROR = 'IBTS-ROR (°F / min)';
const IBTS = 'Infrared Bean Temperature Sensor';
const B_ROR = 'B-ROR';
const POWER_LEVEL = 'Power level';
const DRUM_LEVEL = 'Drum level';
const FAN_LEVEL = 'Fan level';
const ror = `Rate of rise: (°F / min)`;
const IBTS_LINE_COLOR = '#8884d8';
const BEAN_PROBE_LINE_COLOR = '#FF0000';

const labels = {

}

// DYNAMIC
const today = new Date();
const date = new Date(today.getYear(), today.getMonth());
const origin = 'Honduras';
const title = `May 1 2022 roast - ${origin}`;
const csv = 'allRoast20220506Csv';

const RoastLog = (props) => {
  const [colorMode] = useColorMode();

  return (
    <StaticQuery
      query={graphql`
        query {
          allRoast20220506Csv {
            edges {
              node {
                id
                Bean_Probe_ROR
                IBTS_ROR
                Index
              }
            }
          }
        }
      `}
      render={({ allRoast20220506Csv: roast }) => {
        const parsedData = roast.edges.map(({ node }) => {
          return {
            ...node,
            index: parseInt(node.Index),
            ibtsRor: parseInt(node.IBTS_ROR),
            beanProbeRor: parseInt(node.Bean_Probe_ROR),
          };
        });

        const data = parsedData.map(({ index, beanProbeRor, ibtsRor }) => {
          return {
            index,
            ibtsRor,
            beanProbeRor
          };
        });
        console.log({ data })

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
                  value={IBTS_ROR}
                  offset={0}
                  position="insideBottomLeft"
                />
              </YAxis>
              <Line
                type="monotone"
                dataKey="ibtsRor"
                stroke={IBTS_LINE_COLOR}
                fill={IBTS_LINE_COLOR}
              />
              {/* <Line
                type="monotone"
                dataKey="beanProbeRor"
                stroke={BEAN_PROBE_LINE_COLOR}
                fill={BEAN_PROBE_LINE_COLOR}
              /> */}
            </LineChart>
          </ResponsiveContainer>
        );
      }}
    />
  );
};

export default RoastLog;
