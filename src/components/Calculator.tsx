import React, { useEffect, useState } from "react";
import queryString from "query-string";

type FormValues = {
    ballCount: number;
    ballWeightGrams: number;
    hydrationPerc: number;
    levitationTemperatureC: number;
    levitationTimeHrs: number;
    saltGpl: number;
    oilGpl: number;
};
type QueryStringValues = {
    [P in keyof FormValues]?: string;
};

const DEFAULT_VALUES: FormValues = {
    ballCount: 4,
    ballWeightGrams: 250,
    hydrationPerc: 65,
    levitationTemperatureC: 20,
    levitationTimeHrs: 6,
    saltGpl: 40,
    oilGpl: 0,
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

    const flourRelativeWeight = 1;
    const waterRelativeWeight = values.hydrationPerc / 100;
    const saltRelativeWeight = (values.saltGpl / 1000) * waterRelativeWeight;
    const oilRelativeWeight = (values.oilGpl / 1000) * waterRelativeWeight;
    const totalRelativeWeight = waterRelativeWeight + flourRelativeWeight + saltRelativeWeight + oilRelativeWeight;

    const totalWeight = values.ballCount * values.ballWeightGrams;
    const flourWeight = totalWeight * (flourRelativeWeight / totalRelativeWeight);
    const waterWeight = totalWeight * (waterRelativeWeight / totalRelativeWeight);
    const saltWeight = totalWeight * (saltRelativeWeight / totalRelativeWeight);
    const oilWeight = totalWeight * (oilRelativeWeight / totalRelativeWeight);

    // https://pizzanapo.fr/topic/3-rafcalc/ -- Japi2
    const yeastWeight =
        (flourWeight * 2250 * (1 + values.saltGpl / 200) * (1 + values.oilGpl / 300)) /
        ((-80 + 4.2 * values.hydrationPerc - 0.0305 * values.hydrationPerc ** 2) *
            values.levitationTemperatureC ** 2.5 *
            values.levitationTimeHrs ** 1.2);

    return (
        <div>
            <div>
                Dough Balls:
                <input
                    value={values.ballCount}
                    onChange={(e) => setValues((values) => ({ ...values, ballCount: Number(e.target.value) }))}
                />
            </div>

            <div>
                Dough Ball Weight (g):
                <input
                    value={values.ballWeightGrams}
                    onChange={(e) => setValues((values) => ({ ...values, ballWeightGrams: Number(e.target.value) }))}
                />
            </div>

            <div>Dough Total (g): {totalWeight}</div>

            <div>
                Hydration (%):
                <input
                    value={values.hydrationPerc}
                    onChange={(e) => setValues((values) => ({ ...values, hydrationPerc: Number(e.target.value) }))}
                />
            </div>

            <div>Flour (g): {flourWeight.toFixed(0)}</div>
            <div>Water (g): {waterWeight.toFixed(0)}</div>

            <div>
                Salt (Grams per Liter):
                <input
                    value={values.saltGpl}
                    onChange={(e) => setValues((values) => ({ ...values, saltGpl: Number(e.target.value) }))}
                />
            </div>

            <div>
                Oil (Grams per Liter):
                <input
                    value={values.oilGpl}
                    onChange={(e) => setValues((values) => ({ ...values, oilGpl: Number(e.target.value) }))}
                />
            </div>
            <div>Salt (g): {saltWeight.toFixed(1)}</div>
            <div>Oil (g): {oilWeight.toFixed(1)}</div>

            <div>
                Levitation Temperature (C):
                <input
                    value={values.levitationTemperatureC}
                    onChange={(e) =>
                        setValues((values) => ({ ...values, levitationTemperatureC: Number(e.target.value) }))
                    }
                />
            </div>

            <div>
                Levitation Time (h):
                <input
                    value={values.levitationTimeHrs}
                    onChange={(e) => setValues((values) => ({ ...values, levitationTimeHrs: Number(e.target.value) }))}
                />
            </div>

            <div>Fresh Yeast (g): {yeastWeight.toFixed(1)}</div>

            <button onClick={() => setValues(DEFAULT_VALUES)}>Reset Values</button>
        </div>
    );
};

export default Calculator;
