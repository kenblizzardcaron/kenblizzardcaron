/** @jsx jsx */
import { Box, jsx } from "theme-ui";
import { Link, withPrefix } from "gatsby";
import { StaticImage } from "gatsby-plugin-image"
import Layout from "./layout";
import Title from "./title";
import Listing from "./listing";
import List from "./list";
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config";
import useSiteMetadata from "../hooks/use-site-metadata";
import replaceSlashes from "../utils/replaceSlashes";
import { visuallyHidden } from "../styles/utils";
// @ts-ignore
import Hero from "../texts/hero";
// @ts-ignore
import Bottom from "../texts/bottom";

type PostsProps = {
  posts: {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    description: string;
    timeToRead?: number;
    tags?: {
      name: string;
      slug: string;
    }[];
  }[];
  [key: string]: any;
};

const Homepage = ({ posts }: PostsProps) => {
  const { basePath, blogPath } = useMinimalBlogConfig();
  const { siteTitle } = useSiteMetadata();

  return (
    <Layout>
      <h1 sx={visuallyHidden}>{siteTitle}</h1>
      <section
        sx={{
          mb: [4, 5, 6],
          p: { fontSize: [1, 2, 3], mt: 2 },
          variant: `section_hero`,
        }}
      >
        <div sx={{ display: "flex", justifyContent: "center" }}>
          <StaticImage
            alt="Head shot of Ken Blizzard-Caron"
            height={96}
            src="./kenblizzardcaron.png"
            sx={{
              borderColor: "primary",
              borderRadius: "full",
              borderStyle: "solid",
              borderWidth: 3,
              boxShadow: ({ colors, space }) =>
                `0 0 ${space[4]} ${colors.profileShadow}`,
              height: "6rem",
              marginBottom: [2, 3],
            }}
            width={96}
          />
        </div>
        <Box
          sx={{
            fontDisplay: "swap",
            fontFamily: "Newsreader",
            fontWeight: 600,
            textShadow: ({ colors }) => `1px 1px ${colors.shadow}`,
          }}
        >
          <Hero />
        </Box>
      </section>
      <Title text="Blog">
        <Link to={replaceSlashes(`/${basePath}/${blogPath}`)}>All posts</Link>
      </Title>
      <Listing posts={posts} showTags={false} />
      <List sx={{ variant: `section_bottom` }}>
        <Bottom />
      </List>
    </Layout>
  );
};

export default Homepage;
