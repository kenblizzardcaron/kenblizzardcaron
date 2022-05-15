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
  ibtsTemp: number;
  // ibtsTemp: number;
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
const BEAN_PROBE_ROR = 'Bean Probe ROR (°F / min)';
const IBTS_ROR = 'IBTS-ROR (°F / min)';
const IBTS = 'Infrared Bean Temperature Sensor';
const B_ROR = 'B-ROR';
const POWER_LEVEL = 'Power level';
const DRUM_LEVEL = 'Drum level';
const FAN_LEVEL = 'Fan level';
const ror = `Rate of rise: (°F / min)`;
const ROR_LINE_COLOR = '#FF0000';
const TEMP_LINE_COLOR = '#8884d8';
// DYNAMIC
const today = new Date();
const date = new Date(today.getYear(), today.getMonth());
const origin = 'Honduras';
const title = `May 1 2022 roast - ${origin}`;

const May132022 = () => {
  const [colorMode] = useColorMode();

  return (
    <StaticQuery
      query={graphql`
        query {
          allRoast20220513Csv {
            edges {
              node {
                id
                Bean_Probe_ROR
                IBTS_ROR
                IBTS_Temp
                Index
              }
            }
          }
        }
      `}
      render={({ allRoast20220513Csv: roast }) => {
        const parsedData = roast.edges.map(({ node }) => {
          return {
            ...node,
            beanProbeRor: parseInt(node.Bean_Probe_ROR),
            index: parseInt(node.Index),
            ibtsRor: parseInt(node.IBTS_ROR),
            ibtsTemp: parseInt(node.IBTS_Temp),
          };
        });

        const data = parsedData.map(
          ({ beanProbeRor, index, ibtsRor, ibtsTemp }) => {
            return {
              beanProbeRor,
              index,
              ibtsRor,
              ibtsTemp,
            };
          },
        );

        const isDark = colorMode === 'dark';

        return (
          <>
            {/* {new Date().toString()} */}
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
                >
                  {/* <Label
                    angle={-90}
                    fill={isDark ? 'white' : 'black'}
                    offset={0}
                    position="insideBottomLeft"
                    value={ibtsTemp}
                  /> */}
                </YAxis>
                <YAxis
                  allowDataOverflow
                  domain={[0, 50]}
                  orientation="right"
                  tick={{ fill: isDark ? 'white' : 'black' }}
                  yAxisId="right"
                >
                  {/* <Label
                    angle={-90}
                    fill={isDark ? 'white' : 'black'}
                     offset={30}
                    position="end"
                    value={BEAN_PROBE_ROR}
                  /> */}
                </YAxis>
                <Area
                  dataKey="ibtsTemp"
                  dot={false}
                  fill="url(#gradientTemp)"
                  stroke={TEMP_LINE_COLOR}
                  type="monotone"
                  xAxisId="index"
                  yAxisId="left"
                />
                {/* <Area
                  dataKey="beanProbeRor"
                  dot={false}
                  fill="url(#gradientRor)"
                  stroke={ROR_LINE_COLOR}
                  type="linear"
                  xAxisId="index"
                  yAxisId="right"
                /> */}
                <Area
                  dataKey="ibtsRor"
                  dot={false}
                  fill="url(#gradientRor)"
                  stroke={ROR_LINE_COLOR}
                  type="monotone"
                  xAxisId="index"
                  yAxisId="right"
                />
                {/* <Tooltip /> */}
                <Legend
                  content={(props) => {
                    const { payload } = props;

                    return (
                      <ul style={{display: 'flex', justifyContent: 'space-around'}}>
                        {payload.map((entry, index) => (
                          <li
                            key={`item-${index}`}
                            style={{ color: entry.color }}
                          >
                            {entry.value === 'ibtsTemp'
                              ? ibtsTemp
                              : IBTS_ROR}
                          </li>
                        ))}
                      </ul>
                    );
                  }}
                  verticalAlign="bottom"
                />
              </AreaChart>
            </ResponsiveContainer>
          </>
        );
      }}
    />
  );
};

export default May132022;