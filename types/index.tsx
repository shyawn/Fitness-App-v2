export type Workout = {
  id: string;
  name: string;
  day: string;
  type: WorkoutType;
  sets: string;
  reps: string;
  weight: string;
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
