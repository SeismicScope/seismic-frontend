export type Range = [number, number];

export type HistogramEntry = {
  magnitude: number;
  count: number;
};

export type HistogramProps = {
  histogram?: HistogramEntry[];
  range: Range;
  onRangeCommit: (values: Range) => void;
  isLoading: boolean;
};
