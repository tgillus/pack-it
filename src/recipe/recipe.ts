export interface Recipe {
  readonly steps: readonly Step[];
}

export interface Step {
  readonly description: string;
  readonly perform: () => Promise<void>;
}
