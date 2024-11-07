import { Injectable } from '@nestjs/common';
import { Todo } from '@repo/api-client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}
  async getAll(): Promise<Todo[]> {
    return this.prisma.todo.findMany();
  }

  async getById(id: string): Promise<Todo> {
    return this.prisma.todo.findUnique({ where: { id } });
  }

  async createTodo(
    todo: Pick<Todo, 'title' | 'description' | 'completed'>,
  ): Promise<Todo> {
    return this.prisma.todo.create({ data: todo });
  }

  async updateTodoById(
    id: string,
    todo: Pick<Todo, 'title' | 'description' | 'completed'>,
  ): Promise<Todo> {
    return this.prisma.todo.update({ where: { id }, data: todo });
  }

  async deleteTodoById(id: string): Promise<Todo> {
    return this.prisma.todo.delete({ where: { id } });
  }
}
