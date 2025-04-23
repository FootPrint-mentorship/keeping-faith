import dayjs from "dayjs";

export const dayJSFormatter = (
  value: Date | string,
  format: "YYYY-MM-DD" | "MMM D, YYYY" | "DD-MMM-YYYY, h:mma"
) => {
  return dayjs(value).format(format);
};
