import React, { useEffect, useState } from "react";
import queryString from "query-string";
import styles from "../../styles/Home.module.css";
import { calculateWeights, FormValues } from "../data/dough";

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

const formatNumberOrEmpty = (value: number, options?: Intl.NumberFormatOptions) =>
    !Number.isNaN(value) ? value.toLocaleString(undefined, options) : "";

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

    const weights = calculateWeights(values);

    return (
        <div>
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <th># Dough Balls</th>
                        <td>
                            <input
                                className={styles.numericInput}
                                value={formatNumberOrEmpty(values.ballCount, { maximumFractionDigits: 0 })}
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
                                className={styles.numericInput}
                                value={formatNumberOrEmpty(values.ballWeightGrams, { maximumFractionDigits: 1 })}
                                onChange={(e) =>
                                    setValues((values) => ({ ...values, ballWeightGrams: Number(e.target.value) }))
                                }
                            />
                        </td>
                    </tr>

                    <tr>
                        <th>Dough Total (g)</th>
                        <td>
                            <div className={styles.numericOutput}>
                                {formatNumberOrEmpty(weights.totalWeight, { maximumFractionDigits: 0 })}
                            </div>
                        </td>
                    </tr>

                    <tr className={styles.padRow}>
                        <th>Hydration (%)</th>
                        <td>
                            <input
                                className={styles.numericInput}
                                value={formatNumberOrEmpty(values.hydrationPerc, { maximumFractionDigits: 1 })}
                                onChange={(e) =>
                                    setValues((values) => ({ ...values, hydrationPerc: Number(e.target.value) }))
                                }
                            />
                        </td>
                    </tr>

                    <tr>
                        <th>Flour (g)</th>
                        <td>
                            <div className={styles.numericOutput}>
                                {formatNumberOrEmpty(weights.flourWeight, { maximumFractionDigits: 0 })}
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <th>Water (g)</th>
                        <td>
                            <div className={styles.numericOutput}>
                                {formatNumberOrEmpty(weights.waterWeight, { maximumFractionDigits: 0 })}
                            </div>
                        </td>
                    </tr>

                    <tr className={styles.padRow}>
                        <th>Salt (g/l)</th>
                        <td>
                            <input
                                className={styles.numericInput}
                                value={formatNumberOrEmpty(values.saltGpl, { maximumFractionDigits: 1 })}
                                onChange={(e) =>
                                    setValues((values) => ({ ...values, saltGpl: Number(e.target.value) }))
                                }
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Salt (g)</th>
                        <td>
                            <div className={styles.numericOutput}>
                                {formatNumberOrEmpty(weights.saltWeight, {
                                    minimumFractionDigits: 1,
                                    maximumFractionDigits: 1,
                                })}
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <th>Oil (g/l)</th>
                        <td>
                            <input
                                className={styles.numericInput}
                                value={formatNumberOrEmpty(values.oilGpl, { maximumFractionDigits: 1 })}
                                onChange={(e) => setValues((values) => ({ ...values, oilGpl: Number(e.target.value) }))}
                            />
                        </td>
                    </tr>

                    <tr>
                        <th>Oil (g)</th>
                        <td>
                            <div className={styles.numericOutput}>
                                {formatNumberOrEmpty(weights.oilWeight, {
                                    minimumFractionDigits: 1,
                                    maximumFractionDigits: 1,
                                })}
                            </div>
                        </td>
                    </tr>

                    <tr className={styles.padRow}>
                        <th>Levitation Temperature (C)</th>
                        <td>
                            <input
                                className={styles.numericInput}
                                value={formatNumberOrEmpty(values.levitationTemperatureC, { maximumFractionDigits: 0 })}
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
                                className={styles.numericInput}
                                value={formatNumberOrEmpty(values.levitationTimeHrs, { maximumFractionDigits: 2 })}
                                onChange={(e) =>
                                    setValues((values) => ({ ...values, levitationTimeHrs: Number(e.target.value) }))
                                }
                            />
                        </td>
                    </tr>

                    <tr>
                        <th>
                            Fresh Yeast<sup>1</sup> (g)
                        </th>
                        <td>
                            <div className={styles.numericOutput}>
                                {formatNumberOrEmpty(weights.yeastWeight, {
                                    minimumFractionDigits: 1,
                                    maximumFractionDigits: 1,
                                })}
                            </div>
                        </td>
                    </tr>

                    <tr className={styles.padRow}>
                        <th />
                        <td>
                            <button className={styles.resetButton} onClick={() => setValues(DEFAULT_VALUES)}>
                                Reset Values
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <p className={styles.footer}>
                <sup>1</sup> Using the{" "}
                <a href="https://pizzanapo.fr/topic/3-rafcalc/" target="_blank" rel="noopener">
                    RafCalc/Japi2
                </a>{" "}
                formula
            </p>
        </div>
    );
};

export default Calculator;
