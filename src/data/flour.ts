const W_PROTEIN_HOURS = [
    [80, 9.1, 1.0],
    [110, 9.6, 1.5],
    [140, 10.2, 2.0],
    [150, 10.4, 2.5],
    [170, 10.7, 3.0],
    [180, 10.9, 3.5],
    [190, 11.1, 4.0],
    [200, 11.3, 4.5],
    [210, 11.5, 5.0],
    [220, 11.6, 5.5],
    [230, 11.8, 6.5],
    [240, 12, 7.5],
    [250, 12.2, 8.5],
    [260, 12.4, 9.5],
    [270, 12.6, 10.5],
    [280, 12.8, 12.0],
    [290, 12.9, 13.5],
    [300, 13.1, 15.5],
    [310, 13.3, 17.5],
    [320, 13.5, 20.0],
    [330, 13.7, 22.5],
    [340, 13.9, 25.5],
    [350, 14, 29.0],
    [360, 14.2, 33.0],
    [370, 14.4, 38.0],
    [380, 14.6, 43.0],
];

export const getWProteinForRisingTime = (hours: number): { w: number; proteinPerc: number } | undefined => {
    const idx = W_PROTEIN_HOURS.findIndex((e) => e[2] > hours);
    if (idx === 0) {
        return undefined;
    }
    const entry = idx !== -1 ? W_PROTEIN_HOURS[idx - 1] : W_PROTEIN_HOURS[W_PROTEIN_HOURS.length - 1];
    return {
        w: entry[0],
        proteinPerc: entry[1],
    };
};
