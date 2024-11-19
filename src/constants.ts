export enum PreferredTopic {
  TRAVEL = "TRAVEL",
  CARS = "CARS",
  WILDLIFE = "WILDLIFE",
  TECHNOLOGY = "TECHNOLOGY",
  OTHER = "OTHER",
}

export type InputData = {
  name: string;
  surname: string;
  topic?: PreferredTopic;
  otherTopic?: string;
  selectedImageThumb?: string;
};
