import { createParamDecorator } from "@nestjs/common";

export const ListOptions = createParamDecorator((data, req) => {
  let { categories, tags } = req.query;

  if (categories) {
    categories = categories.split('-');
  }

  if (tags) {
    tags = tags.split('-');
  }

  return {
    categories,
    tags
  }
});