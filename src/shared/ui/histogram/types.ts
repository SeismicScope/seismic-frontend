export type HistogramEntry = {
  magnitude: number;
  count: number;
};

export type HistogramProps = {
  histogram: HistogramEntry[];
  range: number[];
  onRangeCommit: (values: number[]) => void;
  isLoading: boolean;
};
