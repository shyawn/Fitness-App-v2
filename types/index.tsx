export type WorkoutSetType = {
  id: string;
  reps: string;
  weight: string;
  done: boolean;
};

export type Workout = {
  id: string;
  name: string;
  day: string;
  type: WorkoutType;
  sets: WorkoutSetType[];
  remarks?: string;
  priority?: number;
};

export type WorkoutType = "Weights" | "Cable" | "Bodyweight" | "";

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
