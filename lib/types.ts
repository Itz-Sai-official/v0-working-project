export interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: Date
}

export interface NewTask {
  title: string
  description: string
}
