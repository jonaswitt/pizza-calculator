import React, { useEffect, useState } from "react";
import queryString from "query-string";
import styles from "../../styles/Home.module.css";
import { calculateWeights, FormValues } from "../data/dough";
import NumericInput from "./NumericInput";
import { loadValuesQs, storeValuesQs } from "../data/query";

const DEFAULT_VALUES: FormValues = {
    ballCount: 4,
    ballWeightGrams: 250,
    hydrationPerc: 65,
    levitationTemperatureC: 20,
    levitationTimeHrs: 6,
    saltGpl: 40,
    oilGpl: 0,
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
                            <NumericInput
                                value={values.ballCount}
                                onChange={(value) => {
                                    setValues((values) => ({ ...values, ballCount: value }));
                                }}
                                formatOptions={{ maximumFractionDigits: 0 }}
                                min={1}
                            />
                        </td>
                    </tr>

                    <tr>
                        <th>Weight per Dough Ball (g)</th>
                        <td>
                            <NumericInput
                                value={values.ballWeightGrams}
                                onChange={(value) => {
                                    setValues((values) => ({ ...values, ballWeightGrams: value }));
                                }}
                                formatOptions={{ maximumFractionDigits: 1 }}
                                min={0}
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
                            <NumericInput
                                value={values.hydrationPerc}
                                onChange={(value) => {
                                    setValues((values) => ({ ...values, hydrationPerc: value }));
                                }}
                                formatOptions={{ maximumFractionDigits: 1 }}
                                min={0}
                                max={100}
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
                            <NumericInput
                                value={values.saltGpl}
                                onChange={(value) => {
                                    setValues((values) => ({ ...values, saltGpl: value }));
                                }}
                                formatOptions={{ maximumFractionDigits: 1 }}
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
                            <NumericInput
                                value={values.oilGpl}
                                onChange={(value) => {
                                    setValues((values) => ({ ...values, oilGpl: value }));
                                }}
                                formatOptions={{ maximumFractionDigits: 1 }}
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
                            <NumericInput
                                value={values.levitationTemperatureC}
                                onChange={(value) => {
                                    setValues((values) => ({ ...values, levitationTemperatureC: value }));
                                }}
                                formatOptions={{ maximumFractionDigits: 0 }}
                            />
                        </td>
                    </tr>

                    <tr>
                        <th>Levitation Time (h)</th>
                        <td>
                            <NumericInput
                                value={values.levitationTimeHrs}
                                onChange={(value) => {
                                    setValues((values) => ({ ...values, levitationTimeHrs: value }));
                                }}
                                formatOptions={{ maximumFractionDigits: 2 }}
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
                                    maximumFractionDigits: 2,
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
