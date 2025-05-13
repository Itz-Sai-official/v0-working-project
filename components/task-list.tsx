"use client"

import { useState, useEffect } from "react"
import type { Task } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2, CheckCircle, Circle } from "lucide-react"
import { deleteTask, updateTaskStatus } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"

export default function TaskList({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const { toast } = useToast()

  // Keep tasks in sync with initialTasks from server
  useEffect(() => {
    setTasks(initialTasks)
  }, [initialTasks])

  const handleStatusToggle = async (id: string, completed: boolean) => {
    try {
      await updateTaskStatus(id, !completed)
      setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !completed } : task)))
      toast({
        title: "Task updated",
        description: `Task marked as ${!completed ? "completed" : "incomplete"}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task status",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id)
      setTasks(tasks.filter((task) => task.id !== id))
      toast({
        title: "Task deleted",
        description: "Task has been removed successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      })
    }
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center p-8 border border-dashed rounded-lg">
        <p className="text-muted-foreground">No tasks yet. Add one to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Tasks ({tasks.length})</h2>
      <div className="grid gap-4">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
              <CardTitle className="text-base font-medium">{task.title}</CardTitle>
              <div className="flex space-x-2">
                <Badge variant={task.completed ? "success" : "secondary"}>
                  {task.completed ? "Completed" : "Pending"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm" onClick={() => handleStatusToggle(task.id, task.completed)}>
                  {task.completed ? (
                    <>
                      <Circle className="mr-2 h-4 w-4" /> Mark as Pending
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" /> Mark as Completed
                    </>
                  )}
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(task.id)}>
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
