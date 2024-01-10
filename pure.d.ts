///<reference path='./types/index.d.ts' />

export const loadLegalesign: typeof import("@legalesign/legalesign-js").loadLegalesign & {
  setLoadParameters: (params: { advancedFraudSignals: boolean }) => void;
};
