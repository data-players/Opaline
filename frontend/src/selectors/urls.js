import slugify from 'slugify';

export const getSlugFromString = (string) => {
  const slug = slugify(string, {
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });

  return slug;
};

export const getUrl = (prefix, string) => {
  return `/${prefix}/${getSlugFromString(string)}`;
};

export const getResourceFromSlug = (resources, slug) => {
  return resources.find((resource) => getSlugFromString(resource.label) === slug);
};

export const getSlugFromContainerUrl = (containerSlug, url) => {
  return url.replace(process.env.REACT_APP_MIDDLEWARE_URL + containerSlug + '/', '');
}