import fs from "fs/promises"
import path from "path"
import type { Task, NewTask } from "./types"

// Path to our JSON file that acts as a simple database
const dbPath = path.join(process.cwd(), "data", "tasks.json")

// Ensure the data directory exists
async function ensureDbExists() {
  try {
    const dataDir = path.join(process.cwd(), "data")
    await fs.mkdir(dataDir, { recursive: true })

    try {
      await fs.access(dbPath)
    } catch {
      // File doesn't exist, create it with empty array
      await fs.writeFile(dbPath, JSON.stringify([]))
    }
  } catch (error) {
    console.error("Error ensuring database exists:", error)
  }
}

// Get all tasks
export async function getTasks(): Promise<Task[]> {
  await ensureDbExists()

  try {
    const data = await fs.readFile(dbPath, "utf8")
    const tasks = JSON.parse(data) as Task[]

    // Convert string dates back to Date objects
    return tasks.map((task) => ({
      ...task,
      createdAt: new Date(task.createdAt),
    }))
  } catch (error) {
    console.error("Error reading tasks:", error)
    return []
  }
}

// Get a single task by ID
export async function getTaskById(id: string): Promise<Task | null> {
  const tasks = await getTasks()
  return tasks.find((task) => task.id === id) || null
}

// Create a new task
export async function createTask(newTask: NewTask): Promise<Task> {
  await ensureDbExists()

  const tasks = await getTasks()

  const task: Task = {
    id: Date.now().toString(),
    title: newTask.title,
    description: newTask.description,
    completed: false,
    createdAt: new Date(),
  }

  tasks.push(task)

  await fs.writeFile(dbPath, JSON.stringify(tasks))

  return task
}

// Update a task
export async function updateTask(id: string, updates: Partial<Task>): Promise<Task | null> {
  const tasks = await getTasks()
  const index = tasks.findIndex((task) => task.id === id)

  if (index === -1) return null

  tasks[index] = { ...tasks[index], ...updates }

  await fs.writeFile(dbPath, JSON.stringify(tasks))

  return tasks[index]
}

// Delete a task
export async function deleteTaskById(id: string): Promise<boolean> {
  const tasks = await getTasks()
  const filteredTasks = tasks.filter((task) => task.id !== id)

  if (filteredTasks.length === tasks.length) return false

  await fs.writeFile(dbPath, JSON.stringify(filteredTasks))

  return true
}
