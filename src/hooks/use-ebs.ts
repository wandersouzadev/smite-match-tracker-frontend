import axios from "axios";
import useSWR from "swr";
import { PublicConfiguration } from "swr/dist/types";

const fetcher = (url: string, args: any) =>
  axios({
    url,
    method: args.method,
    headers: args.headers
  }).then((res) => res.data);

export const useEbs = <T>(ebsParams: {
  path: string;
  method?: string;
  token?: string;
  config?: Partial<PublicConfiguration>;
}) => {
  const { data, error } = useSWR(
    ebsParams.token
      ? [
          `${process.env.API_URL}${ebsParams.path}`,
          {
            method: "get",
            headers: {
              Authorization: `Bearer ${ebsParams.token}`
            }
          }
        ]
      : null,
    fetcher,
    ebsParams.config
  );

  return {
    data: data as T | any,
    isLoading: !error && !data,
    isError: error
  };
};
