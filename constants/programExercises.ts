import { ProgramExercise } from "@/types";

// Flattened from the 3-Day Full Body program (Back & Shoulder Priority).
// Each entry is a single exercise occurrence within a specific day.
export const programExercises: ProgramExercise[] = [
  // Day 1
  { day: 1, order: 1, name: "Barbell Squat", sets: 3, reps: 8, muscleGroup: "Legs", priority: false, supersetGroup: null, restSeconds: 120, notes: "Straight sets, done fresh" },
  { day: 1, order: 2, name: "Wide-Grip Lat Pulldown", sets: 3, reps: 10, muscleGroup: "Back - Upper Lats/Width", priority: true, supersetGroup: null, restSeconds: 90, notes: "Back priority, done fresh" },
  { day: 1, order: 3, name: "Incline DB Press", sets: 3, reps: 10, muscleGroup: "Chest", priority: false, supersetGroup: "A", restSeconds: 60, notes: "Superset with Single-Arm DB Row" },
  { day: 1, order: 4, name: "Single-Arm DB Row", sets: 3, reps: 12, muscleGroup: "Back - Midback/Lats", priority: true, supersetGroup: "A", restSeconds: 60, notes: "Superset with Incline DB Press" },
  { day: 1, order: 5, name: "DB Lateral Raise", sets: 3, reps: 12, muscleGroup: "Shoulders - Side Delt", priority: true, supersetGroup: "B", restSeconds: 45, notes: "Superset with Face Pull" },
  { day: 1, order: 6, name: "Face Pull", sets: 3, reps: 15, muscleGroup: "Shoulders/Back - Rear Delt, Traps", priority: true, supersetGroup: "B", restSeconds: 45, notes: "Superset with DB Lateral Raise" },
  { day: 1, order: 7, name: "Tricep Pushdown", sets: 3, reps: 10, muscleGroup: "Arms - Triceps", priority: false, supersetGroup: "C", restSeconds: 45, notes: "Superset with Calf Raise" },
  { day: 1, order: 8, name: "Calf Raise", sets: 3, reps: 15, muscleGroup: "Calves", priority: false, supersetGroup: "C", restSeconds: 45, notes: "Superset with Tricep Pushdown" },

  // Day 2
  { day: 2, order: 1, name: "Romanian Deadlift (RDL)", sets: 3, reps: 10, muscleGroup: "Legs - Hamstrings", priority: false, supersetGroup: null, restSeconds: 120, notes: "Straight sets, done fresh" },
  { day: 2, order: 2, name: "Straight-Arm Pulldown (Cable Pullover)", sets: 3, reps: 12, muscleGroup: "Back - Lower Lats", priority: true, supersetGroup: null, restSeconds: 90, notes: "Back priority, done fresh" },
  { day: 2, order: 3, name: "Flat DB Press", sets: 3, reps: 10, muscleGroup: "Chest", priority: false, supersetGroup: "A", restSeconds: 60, notes: "Superset with Chest-Supported Row" },
  { day: 2, order: 4, name: "Chest-Supported Row", sets: 3, reps: 10, muscleGroup: "Back - Midback", priority: true, supersetGroup: "A", restSeconds: 60, notes: "Superset with Flat DB Press" },
  { day: 2, order: 5, name: "Cable Lateral Raise", sets: 3, reps: 12, muscleGroup: "Shoulders - Side Delt", priority: true, supersetGroup: "B", restSeconds: 45, notes: "Superset with Reverse Pec-Deck Fly" },
  { day: 2, order: 6, name: "Reverse Pec-Deck Fly", sets: 3, reps: 12, muscleGroup: "Shoulders - Rear Delt", priority: true, supersetGroup: "B", restSeconds: 45, notes: "Superset with Cable Lateral Raise" },
  { day: 2, order: 7, name: "Overhead Tricep Extension", sets: 2, reps: 10, muscleGroup: "Arms - Triceps", priority: false, supersetGroup: "C", restSeconds: 45, notes: "Superset with Incline DB Curl" },
  { day: 2, order: 8, name: "Incline DB Curl", sets: 2, reps: 12, muscleGroup: "Arms - Biceps", priority: false, supersetGroup: "C", restSeconds: 45, notes: "Superset with Overhead Tricep Extension" },
  { day: 2, order: 9, name: "Cable Crunch", sets: 3, reps: 12, muscleGroup: "Core", priority: false, supersetGroup: null, restSeconds: 45, notes: "Optional finisher" },

  // Day 3
  { day: 3, order: 1, name: "Leg Press", sets: 3, reps: 12, muscleGroup: "Legs", priority: false, supersetGroup: null, restSeconds: 120, notes: "Straight sets, done fresh" },
  { day: 3, order: 2, name: "Underhand/Neutral-Grip Pulldown", sets: 3, reps: 10, muscleGroup: "Back - Mid/Lower Lats", priority: true, supersetGroup: null, restSeconds: 90, notes: "Back priority, done fresh" },
  { day: 3, order: 3, name: "Barbell/DB Shoulder Press", sets: 3, reps: 8, muscleGroup: "Shoulders", priority: true, supersetGroup: null, restSeconds: 120, notes: "Shoulder priority, straight sets" },
  { day: 3, order: 4, name: "Chest-Supported Row / Cable Row", sets: 3, reps: 10, muscleGroup: "Back - Midback", priority: true, supersetGroup: null, restSeconds: 90, notes: "Back priority" },
  { day: 3, order: 5, name: "Cable Fly", sets: 3, reps: 10, muscleGroup: "Chest", priority: false, supersetGroup: "A", restSeconds: 45, notes: "Superset with Cable Lateral Raise" },
  { day: 3, order: 6, name: "Cable Lateral Raise", sets: 3, reps: 10, muscleGroup: "Shoulders - Side Delt", priority: true, supersetGroup: "A", restSeconds: 45, notes: "Superset with Cable Fly" },
  { day: 3, order: 7, name: "Bicep Curl", sets: 3, reps: 10, muscleGroup: "Arms - Biceps", priority: false, supersetGroup: "B", restSeconds: 45, notes: "Superset with Calf Extension" },
  { day: 3, order: 8, name: "Calf Extension", sets: 2, reps: 15, muscleGroup: "Calves", priority: false, supersetGroup: "B", restSeconds: 45, notes: "Superset with Bicep Curl" },
];

// Deduped by name (first occurrence wins) for the search dropdown + prefill defaults.
export const uniqueProgramExercises: ProgramExercise[] = Array.from(
  programExercises
    .reduce((map, exercise) => {
      if (!map.has(exercise.name)) map.set(exercise.name, exercise);
      return map;
    }, new Map<string, ProgramExercise>())
    .values()
);
