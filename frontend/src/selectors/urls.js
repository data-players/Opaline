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
  return resources.find((resource) => getSlugFromString(resource.id.substring(resource.id.lastIndexOf('/') + 1)) === slug);
};

export const getSlugFromContainerUrl = (url) => {
  return url.substring(url.lastIndexOf('/') + 1);
}