"use server"

import { revalidatePath } from "next/cache"
import { createTask, updateTask, deleteTaskById } from "./tasks"
import type { NewTask } from "./types"

export async function addTask(task: NewTask) {
  await createTask(task)
  revalidatePath("/")
}

export async function updateTaskStatus(id: string, completed: boolean) {
  await updateTask(id, { completed })
  revalidatePath("/")
}

export async function deleteTask(id: string) {
  await deleteTaskById(id)
  revalidatePath("/")
}
