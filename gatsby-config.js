require(`dotenv`).config({
  path: `.env`,
})

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE

const description = "I’m a dedicated Austin-based developer. I have ten years of professional programming experience designing and engineering web apps, video games, and wearable apps. I love to code. When I’m not learning a new framework you can often find me camping with my wife and dog, discovering new vegan restaurants, roasting coffee, or training for a race.";


module.exports = {
  siteMetadata: {
    siteTitle: `Ken Blizzard-Caron`,
    siteTitleAlt: `Ken Blizzard-Caron`,
    siteUrl: `https://kenblizzardcaron.com`,
    description
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      // See the theme's README for all available options
      options: {
        // navigation: [
        //   {
        //     title: `Blog`,
        //     slug: `/blog`,
        //   },
        //   {
        //     title: `About`,
        //     slug: `/about`,
        //   },
        // ],
        externalLinks: [
          {
            name: `LinkedIn`,
            url: `https://www.linkedin.com/in/kenblizzardcaron/`,
          }
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Ken Blizzard-Caron`,
        short_name: `kenblizzardcaron`,
        description,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/img/favicon-16x16.png`,
            sizes: `16x16`,
            type: `image/png`,
          },
          {
            src: `/img/favicon-32x32.png`,
            sizes: `32x32`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-gatsby-cloud`,
    `gatsby-plugin-netlify`,
    // {
    //   resolve: `gatsby-plugin-prefetch-google-fonts`,
    //   options: {
    //     fonts: [
    //       {
    //         family: `Merriweather`,
    //       },
    //     ],
    //   },
    // },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-140658914-1",
      },
    },
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
  ].filter(Boolean),
}
