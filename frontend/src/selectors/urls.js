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

export const getProgramFromSlug = (programs, slug) => {
  return programs.find((program) => getSlugFromString(program.label) === slug);
};