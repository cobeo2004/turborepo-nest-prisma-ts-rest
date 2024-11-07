"use client";

import { useState } from "react";
import { PlusCircle, CheckCircle2, Trash2 } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Textarea } from "@repo/ui/components/textarea";
import { cn } from "@repo/ui/lib/utils";
import initTsr from "@/utils/tsr-query/init";

export default function TodoPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = initTsr.useQueryClient();

  const {
    data: todos,
    isLoading,
    status,
  } = initTsr.todos.getAll.useQuery({
    queryKey: ["todos"],
  });

  console.log(status);

  const createTodoMutation = initTsr.todos.create.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const updateTodoMutation = initTsr.todos.update.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const deleteTodoMutation = (initTsr.todos.remove as any).useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const addTodo = async () => {
    if (!title.trim()) return;

    await createTodoMutation.mutateAsync({
      body: {
        title: title.trim(),
        description: description.trim(),
        completed: false,
      },
    });

    setTitle("");
    setDescription("");
  };

  const toggleTodo = async (id: string) => {
    // const todo = todos?.body.find((t) => t.id === id);
    const todo = await initTsr.todos.getByID.query({ params: { id } });
    if (!todo || todo.status !== 200) return;

    await updateTodoMutation.mutateAsync({
      params: { id },
      body: {
        completed: !todo.body.completed,
        title: todo.body.title,
        description: todo.body.description,
      },
    });
  };

  const deleteTodo = async (id: string) => {
    await deleteTodoMutation.mutateAsync({
      params: { id },
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="w-full max-w-3xl mx-auto p-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Organize your tasks efficiently
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md p-6 mb-8">
          <div className="space-y-4">
            <Input
              placeholder="Task title"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              className="text-lg border border-gray-300 dark:border-gray-600 rounded-md"
            />
            <Textarea
              placeholder="Task description"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setDescription(e.target.value);
              }}
              className="min-h-[100px] border border-gray-300 dark:border-gray-600 rounded-md"
            />
            <Button
              onClick={addTodo}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              <div className="w-full flex items-center justify-center">
                <PlusCircle className="mr-2 h-5 w-5" />
                Add Task
              </div>
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {todos?.body.map((todo) => (
            <div
              key={todo.id}
              className={cn(
                "bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md p-6 transition-all duration-200",
                todo.completed && "opacity-75"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3
                    className={cn(
                      "text-xl font-semibold text-gray-900 dark:text-white mb-2",
                      todo.completed && "line-through text-gray-500"
                    )}
                  >
                    {todo.title}
                  </h3>
                  <p
                    className={cn(
                      "text-gray-600 dark:text-gray-300",
                      todo.completed && "line-through text-gray-400"
                    )}
                  >
                    {todo.description}
                  </p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleTodo(todo.id)}
                    className={cn(
                      "hover:text-green-600 hover:bg-green-50",
                      todo.completed && "text-green-600"
                    )}
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {!todos?.body.length && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No tasks yet. Add your first task above!
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
