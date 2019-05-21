/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Ken Blizzard-Caron`,
    siteUrl: `https://kenblizzardcaron.com`,
    description:
      "I’m a dedicated Austin-based developer. I have ten years of professional programming experience designing and engineering web apps, video games, and wearable apps. I love to code. When I’m not learning a new framework you can often find me camping with my wife and dog, discovering new vegan restaurants, roasting coffee, or training for a race.",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Merriweather`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-140658914-1",
      },
    },
  ],
};
