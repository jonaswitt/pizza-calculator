import React, { useEffect, useState } from "react";
import queryString from "query-string";
import styles from "../../styles/Home.module.css";

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
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <th># Dough Balls</th>
                        <td>
                            <input
                                value={values.ballCount}
                                onChange={(e) =>
                                    setValues((values) => ({ ...values, ballCount: Number(e.target.value) }))
                                }
                            />
                        </td>
                    </tr>

                    <tr>
                        <th>Weight per Dough Ball (g)</th>
                        <td>
                            <input
                                value={values.ballWeightGrams}
                                onChange={(e) =>
                                    setValues((values) => ({ ...values, ballWeightGrams: Number(e.target.value) }))
                                }
                            />
                        </td>
                    </tr>

                    <tr>
                        <th>Dough Total (g)</th>
                        <td>{totalWeight.toFixed(0)}</td>
                    </tr>

                    <tr className={styles.padRow}>
                        <th>Hydration (%)</th>
                        <td>
                            <input
                                value={values.hydrationPerc}
                                onChange={(e) =>
                                    setValues((values) => ({ ...values, hydrationPerc: Number(e.target.value) }))
                                }
                            />
                        </td>
                    </tr>

                    <tr>
                        <th>Flour (g)</th>
                        <td>{flourWeight.toFixed(0)}</td>
                    </tr>

                    <tr>
                        <th>Water (g)</th>
                        <td>{waterWeight.toFixed(0)}</td>
                    </tr>

                    <tr className={styles.padRow}>
                        <th>Salt (g/l)</th>
                        <td>
                            <input
                                value={values.saltGpl}
                                onChange={(e) =>
                                    setValues((values) => ({ ...values, saltGpl: Number(e.target.value) }))
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Salt (g)</th>
                        <td>{saltWeight.toFixed(1)}</td>
                    </tr>

                    <tr>
                        <th>Oil (g/l)</th>
                        <td>
                            <input
                                value={values.oilGpl}
                                onChange={(e) => setValues((values) => ({ ...values, oilGpl: Number(e.target.value) }))}
                            />
                        </td>
                    </tr>

                    <tr>
                        <th>Oil (g)</th>
                        <td>{oilWeight.toFixed(1)}</td>
                    </tr>

                    <tr className={styles.padRow}>
                        <th>Levitation Temperature (C)</th>
                        <td>
                            <input
                                value={values.levitationTemperatureC}
                                onChange={(e) =>
                                    setValues((values) => ({
                                        ...values,
                                        levitationTemperatureC: Number(e.target.value),
                                    }))
                                }
                            />
                        </td>
                    </tr>

                    <tr>
                        <th>Levitation Time (h)</th>
                        <td>
                            <input
                                value={values.levitationTimeHrs}
                                onChange={(e) =>
                                    setValues((values) => ({ ...values, levitationTimeHrs: Number(e.target.value) }))
                                }
                            />
                        </td>
                    </tr>

                    <tr>
                        <th>Fresh Yeast (g)</th>
                        <td>{yeastWeight.toFixed(1)}</td>
                    </tr>

                    <tr className={styles.padRow}>
                        <th />
                        <td>
                            <button onClick={() => setValues(DEFAULT_VALUES)}>Reset Values</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Calculator;
