import axios from "axios";
import { objectToQueryString } from "../utils/queryParam";
import { IPaginatedResponse } from "../types";
import { IProperty } from "../types/properties";

export const fetchProperties = async (dataInput:{category?: string, parentId?: string}) => {
  const queryString = objectToQueryString(dataInput);
  const { data } = await axios.get<IPaginatedResponse<IProperty>>(`${process.env.NEXT_PUBLIC_BASE_URL}/properties?${queryString}`);
  return data;
};
