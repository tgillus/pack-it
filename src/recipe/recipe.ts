export interface Recipe {
  readonly steps: readonly Step[];
}

export interface Step {
  readonly description: string;
  readonly perform: () => Promise<void>;
}

export const recipesToSteps = (...recipes: readonly Recipe[]) => {
  return recipes.flatMap((recipe) => recipe.steps);
};
