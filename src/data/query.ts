import { FormValues } from "./dough";
import queryString from "query-string";

type QueryStringValues = {
    [P in keyof FormValues]?: string;
};

export const deserializeValues = (qs?: string): Partial<FormValues> => {
    const query = queryString.parse(qs) as QueryStringValues;
    const values: Partial<FormValues> = {};
    for (const key in query) {
        const value = Number(query[key]);
        if (!Number.isNaN(value)) {
            values[key] = value;
        }
    }
    return values;
};

export const loadValuesQs = (): Partial<FormValues> => deserializeValues(window?.location.search);

export const serializeValues = (values: FormValues): string => queryString.stringify(values);

export const storeValuesQs = (values: FormValues) => {
    window?.history.replaceState(null, null, "?" + serializeValues(values));
};
