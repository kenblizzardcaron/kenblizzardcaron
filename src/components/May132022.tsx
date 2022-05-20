import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import Chart from './Chart';

const May132022 = () => (
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

      return <Chart data={data} />;
    }}
  />
);

export default May132022;
