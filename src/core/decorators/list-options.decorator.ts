import { createParamDecorator } from "@nestjs/common";
import { ListOptionsInterface } from "../interfaces/list-options.interface";

export const ListOptions = createParamDecorator((data: Partial<ListOptionsInterface> = {}, req) => {
  let { categories, tags, page, limit, sort, order } = req.query;

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
  } else if ((limit === undefined) && data.limit) {
    limit = data.limit;
  } else {
    limit = 3;
  }

  if (sort) {
    sort = sort;
  } else if ((sort === undefined) && data.sort) {
    sort = data.sort;
  } else {
    sort = 'created';
  }

  if (order) {
    order = order.toUpperCase();
  } else if ((order === undefined) && data.order) {
    order = data.order;
  } else {
    order = 'DESC';
  }

  return {
    categories,
    tags,
    page,
    limit,
    sort,
    order
  }
});