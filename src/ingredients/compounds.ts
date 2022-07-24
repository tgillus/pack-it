export interface PantryCompounds {
  readonly name: string;
  readonly git: {
    readonly url: string;
  };
  readonly zip: {
    readonly destination: string;
    readonly include: readonly string[];
  };
}
