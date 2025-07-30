import type { H3Event } from "h3";
import type { ApiResponse, PaginationResponse } from "../interfaces/api";

export const createResponse = <T>(
  data: T,
  status: number = 200
): ApiResponse<T> => {
  return {
    ok: true,
    statusCode: status,
    message: "Success",
    data,
  };
};

export const paginationResponse = <T extends object>(
  data: T[],
  count: number
): PaginationResponse<T> => {
  const hasNextPage = data.length < count;

  return {
    pageInfo: {
      hasNextPage,
    },
    nodes: data,
    totalCount: count,
  };
};

export const parsePaginationParams = (event: H3Event) => {
  const query = getQuery(event);
  const { page, perPage } = query;

  if (page && perPage) {
    const props: { skip: number; take?: number } = {
      skip: (Number(page) - 1) * Number(perPage),
    };

    if (perPage) {
      props.take = Number(perPage);
    }
    return props;
  }

  return {};
};

export const parseSearchParams = (event: H3Event, fields?: string[]) => {
  const query = getQuery(event);
  const searchValue = (query["search"] as string | undefined) || "";

  const searchQuery: any[] = [];

  const set = (obj: Record<any, any>, path: string[]) => {
    path.reduce((acc, key, i) => {
      if (acc[key] === undefined) acc[key] = {};
      if (i === path.length - 1) {
        acc[key] = {
          contains: searchValue,
          mode: "insensitive",
        };
      }
      return acc[key];
    }, obj);
  };

  fields?.forEach((field) => {
    const splitted = field.split(".");
    if (splitted.length > 1) {
      const obj: Record<string, any> = {};
      set(obj, splitted);
      searchQuery.push(obj);
    } else {
      searchQuery.push({ [field]: { contains: searchValue } });
    }
  });

  return {
    where: searchValue ? { OR: searchQuery } : {},
  };
};

type ParseParamsOptions = {
  search?: {
    fields?: string[];
  };
};

export const parseParams = (
  event: H3Event,
  paramType: "pagination" | "search",
  options?: ParseParamsOptions
) => {
  switch (paramType) {
    case "pagination":
      return parsePaginationParams(event);
    case "search":
      return parseSearchParams(event, options?.search?.fields);
  }
};
