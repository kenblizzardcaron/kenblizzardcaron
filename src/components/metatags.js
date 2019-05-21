import React from 'react';
import Helmet from 'react-helmet';

function Metatags(props) {
  return (
    <Helmet
      title={props.title}
      meta={[
        { name: 'title', content: props.title },

        {
          name: 'description',
          content:
            'I’m a dedicated Austin-based developer. I have ten years of professional programming experience designing and engineering web apps, video games, and wearable apps. I love to code. When I’m not learning a new framework you can often find me camping with my wife and dog, discovering new vegan restaurants, roasting coffee, or training for a race.',
        },
        {
          property: 'og:title',
          content: props.title,
        },
        {
          property: 'og:url',
          content: props.pathname ? props.url + props.pathname : props.url,
        },
        {
          property: 'og:description',
          content: props.description,
        },
        {
          property: 'og:locale',
          content: 'en',
        },
        { property: 'og:type', content: 'website' },
        { name: 'robots', content: 'index, follow' },

        { property: 'og:site_name', content: 'Wire Specialties' },
      ]}
    >
      <html lang='en' />
    </Helmet>
  );
}

export default Metatags;
