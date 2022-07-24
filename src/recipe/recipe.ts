export interface Recipe {
  steps(): Step[];
}

export interface Step {
  readonly description: string;
  readonly perform: () => Promise<void>;
}
