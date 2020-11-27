import React, { useCallback, useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";

const parseFloatLocale = (text: string): number | undefined => {
    const lastPeriod = text.lastIndexOf(".");
    const lastComma = text.lastIndexOf(",");

    // support both 1,000.50 and 1.000,50 number formats
    let number: number;
    if (lastComma !== -1 && (lastPeriod === -1 || lastPeriod < lastComma)) {
        number = parseFloat(text.replaceAll(".", "").replaceAll(",", "."));
    } else {
        number = parseFloat(text.replaceAll(",", ""));
    }

    if (!Number.isNaN(number)) {
        return number;
    } else {
        return undefined;
    }
};

const NumericInput: React.FC<{
    value: number | undefined;
    onChange?: (value: number | undefined) => void;
    formatOptions?: Intl.NumberFormatOptions;
    min?: number;
    max?: number;
}> = ({ value, onChange, formatOptions, min, max }) => {
    const [stringValue, setStringValue] = useState<string>("");
    const applyValue = useCallback(
        (newValue: number | undefined, callback = true) => {
            if (newValue != null) {
                let clippedValue = newValue;
                if (min != null) {
                    clippedValue = Math.max(min, clippedValue);
                }
                if (max != null) {
                    clippedValue = Math.min(max, clippedValue);
                }
                if (callback && onChange != null) {
                    onChange(clippedValue);
                }
                setStringValue(clippedValue.toLocaleString(undefined, formatOptions));
            } else {
                setStringValue(value.toLocaleString(undefined, formatOptions));
            }
        },
        [value, min, max, setStringValue]
    );
    useEffect(() => {
        applyValue(value, false);
    }, [value, applyValue]);
    return (
        <input
            className={styles.numericInput}
            value={stringValue}
            onChange={(e) => {
                const newStringValue = e.target.value;
                setStringValue(newStringValue);
            }}
            onBlur={() => {
                applyValue(parseFloatLocale(stringValue), true);
            }}
        />
    );
};

export default NumericInput;
