export interface PackItSettings {
  readonly projectName: string;
  readonly git: {
    url: string;
  };
  readonly zip: {
    destination: string;
    include: string[];
  };
}
