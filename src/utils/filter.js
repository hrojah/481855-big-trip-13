import {FILTER_TYPE} from "../const";
import dayjs from "dayjs";
const date = dayjs(new Date());
export const filter = {
  [FILTER_TYPE.EVERYTHING]: (points) => {return points},
  [FILTER_TYPE.FUTURE]: (points) => points.filter((point) => point.startTime > date),
  [FILTER_TYPE.PAST]: (points) => points.filter((point) => point.startTime < date),
}
