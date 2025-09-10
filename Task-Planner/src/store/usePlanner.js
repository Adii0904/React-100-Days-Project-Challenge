import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePlanner = create(
  //this persist method use for the save the data to local storage;
  persist(
    (set) => ({
      task: [],
      addTask: (payload) =>
        set((state) => ({
          task: [...state.task, payload],
        })),
      deleteTask: (id) => {
        return set((state) => ({
          task: state.task.filter((item) => item.id !== id),
        }));
      },
    }),
    {
      //mere local storage mein data kis name se save hoga
      name: "planner",
    }
  )
);
