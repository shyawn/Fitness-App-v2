export type Workout = {
  id: string;
  name: string;
  day: string;
  sets: string;
  weight: string;
  priority?: number;
};

export type ExerciseType = {
  name: string;
  image: any;
};

export type BodyPartExercise = {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  instructions: string[] | string;
  name: string;
  secondaryMuscles: string[] | string;
  target: string;
};
