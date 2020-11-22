import React, { useEffect, useState } from "react";
import queryString from "query-string";

type FormValues = {
    doughBallCount: number;
    doughBallSizeGrams: number;
};
type QueryStringValues = {
    [P in keyof FormValues]?: string;
};

const DEFAULT_VALUES: FormValues = {
    doughBallCount: 1,
    doughBallSizeGrams: 250,
};

const deserializeValues = (qs?: string): Partial<FormValues> => {
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

const loadValuesQs = (): Partial<FormValues> => deserializeValues(window?.location.search);

const serializeValues = (values: FormValues): string => queryString.stringify(values);

const storeValuesQs = (values: FormValues) => {
    window?.history.replaceState(null, null, "?" + serializeValues(values));
};

const Calculator: React.FC = () => {
    const [values, setValues] = useState<FormValues>(DEFAULT_VALUES);

    // Load/store form values from/in query string
    useEffect(() => {
        const qsValues = loadValuesQs();
        setValues((values) => ({
            ...values,
            ...qsValues,
        }));
    }, [setValues]);
    useEffect(() => {
        storeValuesQs(values);
    }, [values]);

    return (
        <div>
            <div>
                Dough Balls:
                <input
                    value={values.doughBallCount}
                    onChange={(e) => setValues((values) => ({ ...values, doughBallCount: Number(e.target.value) }))}
                />
            </div>

            <div>
                Dough Ball Size (g):
                <input
                    value={values.doughBallSizeGrams}
                    onChange={(e) => setValues((values) => ({ ...values, doughBallSizeGrams: Number(e.target.value) }))}
                />
            </div>

            <div>Dough (g): {values.doughBallCount * values.doughBallSizeGrams}</div>
        </div>
    );
};

export default Calculator;
