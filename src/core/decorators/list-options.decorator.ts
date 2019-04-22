import { createParamDecorator } from "@nestjs/common";

export const ListOptions = createParamDecorator((data, req) => {
  let { categories, tags, page, limit } = req.query;

  if (categories) {
    categories = categories.split('-');
  }

  if (tags) {
    tags = tags.split('-');
  }

  if (page) {
    page = parseInt(page);
  } else {
    page = 1;
  }

  if (limit) {
    limit = parseInt(limit);
  } else {
    limit = 3;
  }

  return {
    categories,
    tags,
    page,
    limit
  }
});