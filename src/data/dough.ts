export type FormValues = {
    ballCount: number;
    ballWeightGrams: number;
    hydrationPerc: number;
    levitationTemperatureC: number;
    levitationTimeHrs: number;
    saltGpl: number;
    oilGpl: number;
};

export type OutputValues = {
    totalWeight: number;
    flourWeight: number;
    waterWeight: number;
    saltWeight: number;
    oilWeight: number;
    yeastWeight: number;
};

export const calculateWeights = (values: FormValues): OutputValues => {
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

    return {
        totalWeight,
        flourWeight,
        waterWeight,
        saltWeight,
        oilWeight,
        yeastWeight,
    };
};
