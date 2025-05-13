import TaskList from "@/components/task-list"
import { AddTaskForm } from "@/components/add-task-form"
import { getTasks } from "@/lib/tasks"

export default async function Home() {
  const tasks = await getTasks()

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Task Management</h1>
          <p className="text-muted-foreground">Manage your tasks efficiently with this simple application.</p>
        </div>

        <div className="grid gap-6">
          <AddTaskForm />
          <TaskList initialTasks={tasks} />
        </div>
      </div>
    </main>
  )
}
