// lib/roi.ts
export type Property = {
    tokenId: string;
    purchasePrice: number; // in USD (or your currency)
    purchaseDate: string; // ISO date string
    currentValue?: number; // optional current estimate
    annualRent?: number; // optional yearly rent income
};

export type ProjectionPoint = {
    year: number; // 0 = purchase year
    date: string; // ISO date string or year label
    propertyValue: number;
    cumulativeRent: number;
    cumulativeReturn: number; // absolute gain: (value + rent - purchase)
    cumulativeReturnPct: number;
};

export function yearsBetween(startIso: string, endIso = new Date().toISOString()): number {
    const a = new Date(startIso);
    const b = new Date(endIso);
    const msPerYear = 365.25 * 24 * 60 * 60 * 1000;
    return Math.max((b.getTime() - a.getTime()) / msPerYear, 0.0001);
}

/**
 * simple ROI:
 * ((currentValue + cumulativeRent - purchasePrice) / purchasePrice) * 100
 */
export function simpleROI(p: Property, useCurrentValue?: number, cumulativeRent = 0) {
    const cv = useCurrentValue ?? p.currentValue ?? p.purchasePrice;
    const roi = ((cv + cumulativeRent - p.purchasePrice) / p.purchasePrice) * 100;
    return roi;
}

/**
 * annualized ROI (CAGR-like for total return including rent)
 * = ( (ending_value + cumulative_rent) / purchasePrice )^(1/years) - 1
 */
export function annualizedROI(p: Property, endingValue: number, cumulativeRent: number): number {
    const years = Math.max(yearsBetween(p.purchaseDate), 1 / 365);
    const totalFactor = (endingValue + cumulativeRent) / p.purchasePrice;
    if (totalFactor <= 0) return -100;
    const ann = Math.pow(totalFactor, 1 / years) - 1;
    return ann * 100;
}

/**
 * projectOverYears:
 * - growthRate: yearly price growth (0.05 = 5%)
 * - rentGrowthRate: yearly rent growth
 * - years: number of years to project (integer)
 *
 * Returns ProjectionPoint[] from year 0 (purchase) to year N
 */
export function projectOverYears(
    p: Property,
    years: number,
    growthRate = 0.05,
    rentGrowthRate = 0.02
): ProjectionPoint[] {
    const points: ProjectionPoint[] = [];
    let value = p.currentValue ?? p.purchasePrice;
    let rent = p.annualRent ?? 0;
    let cumulativeRent = 0;

    // Year 0: baseline
    points.push({
        year: 0,
        date: new Date(p.purchaseDate).toISOString().slice(0, 10),
        propertyValue: value,
        cumulativeRent: 0,
        cumulativeReturn: value - p.purchasePrice,
        cumulativeReturnPct: ((value - p.purchasePrice) / p.purchasePrice) * 100,
    });

    for (let y = 1; y <= years; y++) {
        // end of year y: increase value & rent then accrue rent for that year
        value = value * (1 + growthRate);
        rent = rent * (1 + rentGrowthRate);
        cumulativeRent += rent;
        const cumulativeReturn = value + cumulativeRent - p.purchasePrice;
        points.push({
            year: y,
            date: new Date(new Date(p.purchaseDate).setFullYear(new Date(p.purchaseDate).getFullYear() + y))
                .toISOString().slice(0, 10),
            propertyValue: Number(value.toFixed(2)),
            cumulativeRent: Number(cumulativeRent.toFixed(2)),
            cumulativeReturn: Number(cumulativeReturn.toFixed(2)),
            cumulativeReturnPct: Number((cumulativeReturn / p.purchasePrice * 100).toFixed(2)),
        });
    }

    return points;
}
