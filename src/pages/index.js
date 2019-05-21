import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import "./styles.css";

import Header from "../components/header";
import Intro from "../components/intro";
import Metatags from "../components/metatags";

const colors = [
  // noon
  {
    ground: "#DA6",
    sky: "#9CC",
    pyramid1: "#C99",
    pyramid1Side: "#966",
    pyramid2: "#B77",
    pyramid3: "#956",
  },
  //sunset
  {
    ground: "#930",
    sky: "#C30",
    pyramid1: "#C66",
    pyramid1Side: "#C63",
    pyramid2: "#C53",
    pyramid3: "#B33",
  },
  // midnight
  {
    ground: "#336",
    sky: "#006",
    pyramid1: "#669",
    pyramid1Side: "#636",
    pyramid2: "#626",
    pyramid3: "#636",
  },
  // sunrise
  {
    ground: "#963",
    sky: "#F66",
    pyramid1: "#F99",
    pyramid1Side: "#C66",
    pyramid2: "#C56",
    pyramid3: "#C65",
  },
];

const positions = [
  // noon
  {
    clouds: -100,
    sun: 100,
  },
  //sunset
  {
    clouds: -200,
    sun: 300,
  },
  // midnight
  {
    clouds: -100,
    sun: 500,
  },
  // sunrise
  {
    clouds: 0,
    sun: 300,
  },
];

const config = { friction: 100 };

export default () => {
  const [isOverlayOn, setIsOverlayOn] = useState(true);
  const [time, setTime] = useState(0);
  useEffect(
    () => void setInterval(() => setTime(i => (i + 1) % colors.length), 15000),
    []
  );

  const { sky } = useSpring({
    sky: colors[time].sky,
    config,
  });

  const { ground } = useSpring({
    ground: colors[time].ground,
    config,
  });

  const { overlay } = useSpring({
    overlay: isOverlayOn ? 0.85 : 0.0,
    config,
  });

  const { content } = useSpring({
    content: isOverlayOn ? 1 : 0,
    config,
  });

  const { pyramid1 } = useSpring({
    pyramid1: colors[time].pyramid1,
    config,
  });

  const { pyramid1Side } = useSpring({
    pyramid1Side: colors[time].pyramid1Side,
    config,
  });

  const { pyramid2 } = useSpring({
    pyramid2: colors[time].pyramid2,
    config,
  });

  const { pyramid3 } = useSpring({
    pyramid3: colors[time].pyramid3,
    config,
  });

  const { sunPosition } = useSpring({
    sunPosition: positions[time].sun,
    config,
  });

  const { cloudsPosition } = useSpring({
    cloudsPosition: positions[time].clouds,
    config,
  });

  return (
    <>
      <Metatags
        title="Ken Blizzard-Caron"
        description="I’m a dedicated Austin-based developer. I have ten years of professional programming experience designing and engineering web apps, video games, and wearable apps. I love to code. When I’m not learning a new framework you can often find me camping with my wife and dog, discovering new vegan restaurants, roasting coffee, or training for a race."
        url={`https://kenblizzardcaron.com/`}
        pathname="/"
      />
      <Toggle
        icons={{
          checked: (
            <span role="img" aria-label="demo on" className="icon">
              🐵
            </span>
          ),
          unchecked: (
            <span role="img" aria-label="demo off" className="icon">
              🙈
            </span>
          ),
        }}
        defaultChecked={!isOverlayOn}
        onChange={() => setIsOverlayOn(!isOverlayOn)}
      />
      <animated.div className="overlay" style={{ opacity: overlay }} />
      <animated.div className="content" style={{ opacity: content }}>
        <Header />
        <Intro />
      </animated.div>
      <animated.div className="scene" style={{ backgroundColor: sky }}>
        <svg viewBox="0 0 900 2000">
          <g id="Scene">
            <animated.circle
              id="Sun"
              fill="#FFE200"
              cx="100"
              cy={sunPosition}
              r="50"
            />
            <animated.rect
              id="Ground"
              fill={ground}
              x="0"
              y="420"
              width="900"
              height="2000"
            />
            <animated.polygon
              id="Pyramid-3"
              fill={pyramid3}
              points="590 430 210 430 399.995579 210"
            />
            <animated.polygon
              id="Pyramid-2"
              fill={pyramid2}
              points="450 500 25 500 237.5 260"
            />
            <animated.polygon
              id="Pyramid-1-Front"
              fill={pyramid1}
              points="240 570 880.993789 570 563.851835 150"
            />
            <animated.polygon
              id="Pyramid-1-Side"
              fill={pyramid1Side}
              points="710.115931 570 564.282984 150 884.779879 570"
            />
            <animated.g
              id="Clouds"
              transform={cloudsPosition.interpolate(c => `translate(${c}, 0)`)}
            >
              <path
                d="M320.181564,18.3333333 L313.303073,18.3333333 C315.964221,18.3333333 318.121508,16.4678531 318.121508,14.1666667 C318.121508,11.8654802 315.964221,10 313.303073,10 L257.576816,10 C254.915667,10 252.75838,11.8654802 252.75838,14.1666667 C252.75838,16.4678531 254.915667,18.3333333 257.576816,18.3333333 L264.455307,18.3333333 C261.794159,18.3333333 259.636872,20.1988135 259.636872,22.5 C259.636872,24.8011865 261.794159,26.6666667 264.455307,26.6666667 L254.818436,26.6666667 C252.157287,26.6666667 250,28.5321469 250,30.8333333 C250,33.1345198 252.157287,35 254.818436,35 L310.544693,35 C313.205841,35 315.363128,33.1345198 315.363128,30.8333333 C315.363128,28.5321469 313.205841,26.6666667 310.544693,26.6666667 L320.181564,26.6666667 C322.842713,26.6666667 325,24.8011865 325,22.5 C325,20.1988135 322.842713,18.3333333 320.181564,18.3333333 Z"
                id="Cloud-3"
                fillOpacity="0.5"
                fill="#FFFFFF"
              />
              <path
                d="M520.169926,108.333333 L513.291434,108.333333 C515.952582,108.333333 518.10987,106.467853 518.10987,104.166667 C518.10987,101.86548 515.952582,100 513.291434,100 L457.576816,100 C454.915667,100 452.75838,101.86548 452.75838,104.166667 C452.75838,106.467853 454.915667,108.333333 457.576816,108.333333 L464.455307,108.333333 C461.794159,108.333333 459.636872,110.198814 459.636872,112.5 C459.636872,114.801186 461.794159,116.666667 464.455307,116.666667 L454.818436,116.666667 C452.157287,116.666667 450,118.532147 450,120.833333 C450,123.13452 452.157287,125 454.818436,125 L510.544693,125 C513.205841,125 515.363128,123.13452 515.363128,120.833333 C515.363128,118.532147 513.205841,116.666667 510.544693,116.666667 L520.181564,116.666667 C522.842713,116.666667 525,114.801186 525,112.5 C525,110.198814 522.842713,108.333333 520.181564,108.333333 L520.169926,108.333333 Z"
                id="Cloud-2"
                fillOpacity="0.5"
                fill="#FFFFFF"
              />
              <path
                d="M820.169926,58.3333333 L813.268156,58.3333333 C815.929305,58.3333333 818.086592,56.4678531 818.086592,54.1666667 C818.086592,51.8654802 815.929305,50 813.268156,50 L757.576816,50 C754.915667,50 752.75838,51.8654802 752.75838,54.1666667 C752.75838,56.4678531 754.915667,58.3333333 757.576816,58.3333333 L764.455307,58.3333333 C761.794159,58.3333333 759.636872,60.1988135 759.636872,62.5 C759.636872,64.8011865 761.794159,66.6666667 764.455307,66.6666667 L754.818436,66.6666667 C752.157287,66.6666667 750,68.5321469 750,70.8333333 C750,73.1345198 752.157287,75 754.818436,75 L810.544693,75 C813.205841,75 815.363128,73.1345198 815.363128,70.8333333 C815.363128,68.5321469 813.205841,66.6666667 810.544693,66.6666667 L820.181564,66.6666667 C822.842713,66.6666667 825,64.8011865 825,62.5 C825,60.1988135 822.842713,58.3333333 820.181564,58.3333333 L820.169926,58.3333333 Z"
                id="Cloud-1"
                fillOpacity="0.5"
                fill="#FFFFFF"
              />
            </animated.g>
          </g>
        </svg>
      </animated.div>
    </>
  );
};
