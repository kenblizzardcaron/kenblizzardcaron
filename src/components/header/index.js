import React from "react";
import { withPrefix } from "gatsby";

import "./header.css";

export default () => (
  <div className="header">
    <img
      alt="Ken Blizzard-Caron"
      className="profile"
      src={withPrefix("/img/kenblizzardcaron.jpg")}
    />
    <h1>Ken Blizzard-Caron</h1>
  </div>
);
