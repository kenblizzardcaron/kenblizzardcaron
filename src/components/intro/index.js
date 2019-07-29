import React from "react";
import { withPrefix } from "gatsby";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import "./intro.css";

export default () => (
  <p>
    Welcome to my little corner of the internet. I'm a web developer new to
    Austin. I do have plenty of full-stack experience but I have to admit I
    prefer the front-end so I'll market myself as such. I've got a decade of
    professional experience and I'm currently big fan of React. I've developed a
    focus on enterprise web applications for some{" "}
    <OutboundLink
      target="_blank"
      rel="noopener noreferrer"
      href="https://elasticsuite.com/"
    >
      B2B eCommerce
    </OutboundLink>{" "}
    <OutboundLink
      target="_blank"
      rel="noopener noreferrer"
      href="http://centerstonetech.com/"
    >
      companies
    </OutboundLink>{" "}
    but I've also worked on some{" "}
    <OutboundLink
      target="_blank"
      rel="noopener noreferrer"
      href="https://vote.foundation"
    >
      {" "}
      other
    </OutboundLink>{" "}
    <OutboundLink
      target="_blank"
      rel="noopener noreferrer"
      href="https://wirespecialties.netlify.com"
    >
      {" "}
      things
    </OutboundLink>{" "}
    recently. I'm looking to work on something exciting with a great team. I'm guessing you're here
    to take a look at my{" "}
    <OutboundLink
      target="_blank"
      rel="noopener noreferrer"
      href={withPrefix("/pdf/KenBlizzard-Caron.pdf")}
    >
      resume
    </OutboundLink>
    ,{" "}
    <OutboundLink
      target="_blank"
      rel="noopener noreferrer"
      href="https://github.com/kenblizzardcaron"
    >
      GitHub
    </OutboundLink>
    , or perhaps my{" "}
    <OutboundLink
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.linkedin.com/in/kenblizzardcaron/"
    >
      LinkedIn
    </OutboundLink>
    .
  </p>
);
