import React, { useState } from "react"

type FormValues = {
    doughBallCount: number;
    doughBallSizeGrams: number;
}

const Calculator: React.FC = () => {
    const [values, setValues] = useState<FormValues>({
        doughBallCount: 1,
        doughBallSizeGrams: 250,
    })

    return <div>
        <div>
        Dough Balls:
        <input value={values.doughBallCount} onChange={e => setValues(values => ({...values, doughBallCount: Number(e.target.value) }))} />
        </div>

        <div>
        Dough Ball Size (g):
        <input value={values.doughBallSizeGrams} onChange={e => setValues(values => ({...values, doughBallSizeGrams: Number(e.target.value) }))} />
        </div>

        <div>Dough (g): {values.doughBallCount * values.doughBallSizeGrams}</div>
    </div>
}

export default Calculator;