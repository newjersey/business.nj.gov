import fs from "fs";
import path from "path";
import { Task } from "../types/types";

export type PathParams<P> = { params: P; locale?: string };
export type TaskIdParam = {
  taskId: string;
};

const roadmapsDir = path.join(process.cwd(), "roadmaps");

export const getAllTaskIds = (): PathParams<TaskIdParam>[] => {
  const fileNames = fs.readdirSync(path.join(roadmapsDir, "tasks"));

  return fileNames.map((fileName) => {
    return {
      params: {
        taskId: fileName.replace(/\.json$/, ""),
      },
    };
  });
};

export const getTaskById = (id: string): Task => {
  const fullPath = path.join(roadmapsDir, "tasks", `${id}.json`);
  return JSON.parse(fs.readFileSync(fullPath, "utf8")) as Task;
};