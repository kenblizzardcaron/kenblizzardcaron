require(`dotenv`).config({
  path: `.env`,
});

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;

const description =
  "I’m a dedicated Austin-based developer. I have ten years of professional programming experience designing and engineering web apps, video games, and wearable apps. I love to code. When I’m not learning a new framework you can often find me camping with my wife and dog, discovering new vegan restaurants, roasting coffee, or training for a race.";
const fullName = "Ken Blizzard-Caron";

const remarkImages = [
  {
    resolve: `gatsby-remark-images`,
    options: {
      linkImagesToOriginal: false,
      maxWidth: 600,
      quality: 90,
      showCaptions: true
    },
  },
];

module.exports = {
  siteMetadata: {
    author: fullName,
    description,
    siteDescription: description,
    siteHeadline: fullName,
    siteImage: "/img/kenblizzardcaron.png",
    siteLanguage: "en-US",
    siteTitle: fullName,
    siteTitleAlt: fullName,
    siteUrl: `https://kenblizzardcaron.com`,
  },
  plugins: [
    `gatsby-plugin-offline`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: remarkImages,
        plugins: remarkImages
      },
    },
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
            name: `GitHub`,
            url: `https://github.com/kenblizzardcaron`,
          },
          {
            name: `LinkedIn`,
            url: `https://www.linkedin.com/in/kenblizzardcaron`,
          },
          {
            name: `Resume`,
            url: `/pdf/KenBlizzard-Caron.pdf`,
          },
        ],
        feed: false, // TODO reenable this, don't want to hold up gatsby v3 over this
        formatString: "MMM DD, YYYY",
        mdx: false
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-140658914-1`,
      },
    },
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
        icon: `src/icon/icon.png`,
        icons: [
          {
            src: `/img/favicon-16x16.jpg`,
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
    {
      resolve: "gatsby-omni-font-loader",
      options: {
        enableListener: true,
        preconnect: ["https://fonts.gstatic.com"],
        web: [
          {
            name: "Newsreader",
            file: "https://fonts.googleapis.com/css2?family=Newsreader",
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
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
  ].filter(Boolean),
};
