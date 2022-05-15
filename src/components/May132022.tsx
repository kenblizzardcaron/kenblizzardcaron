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
        console.log({ data });

        return (
          <>
            {/* {new Date().toString()} */}
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={data}
                margin={{ top: 0, right: 0, left: 20, bottom: 20 }}
                width={500}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="index"
                  // interval="preserveStartEnd"
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
                  domain={[100, 500]}
                  tick={{ fill: isDark ? 'white' : 'black' }}
                  yAxisId="left"
                >
                  <Label
                    angle={-90}
                    fill={isDark ? 'white' : 'black'}
                    offset={0}
                    position="insideBottomLeft"
                    value={ibtsTemp}
                  />
                </YAxis>
                <YAxis
                  domain={[0, 'dataMax']}
                  orientation="right"
                  tick={{ fill: isDark ? 'white' : 'black' }}
                  yAxisId="right"
                >
                  <Label
                    angle={-90}
                    fill={isDark ? 'white' : 'black'}
                    offset={56}
                    position="insideBottomLeft"
                    value={IBTS_ROR}
                  />
                </YAxis>
                <Line
                  dataKey="ibtsTemp"
                  dot={false}
                  stroke={TEMP_LINE_COLOR}
                  type="monotone"
                  xAxisId="index"
                  yAxisId="left"
                />
                <Line
                  dataKey="beanProbeRor"
                  dot={false}
                  stroke={ROR_LINE_COLOR}
                  type="linear"
                  xAxisId="index"
                  yAxisId="right"
                />
                {/* <Line
                  dataKey="ibtsRor"
                  dot={false}
                  stroke={ROR_LINE_COLOR}
                  type="monotone"
                  xAxisId="index"
                  yAxisId="right"
                /> */}
                {/* <Tooltip /> */}
                <Legend
                  content={(props) => {
                    const { payload } = props;
                    console.log('payload', payload);

                    return (
                      <ul>
                        {payload.map((entry, index) => (
                          <li key={`item-${index}`} style={{ color: entry.color }}>
                            {entry.value === 'ibtsTemp' ? ibtsTemp : BEAN_PROBE_ROR}
                          </li>
                        ))}
                      </ul>
                    );
                  }}
                  verticalAlign="top"
                />
              </LineChart>
            </ResponsiveContainer>
          </>
        );
      }}
    />
  );
};

export default May132022;
