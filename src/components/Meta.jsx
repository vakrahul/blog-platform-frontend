import { Helmet } from 'react-helmet-async';

// The default values are now set directly inside the function's parameters
const Meta = ({
  title = 'Welcome to BlogPlatform',
  description = 'A platform to share and discover amazing blog posts',
  keywords = 'blog, tech, articles, posts',
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

export default Meta;