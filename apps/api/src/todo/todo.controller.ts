import { Controller } from '@nestjs/common';
import { TodoService } from './todo.service';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { Todo, contract } from '@repo/api-client';
@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @TsRestHandler(contract.todos.getAll)
  async getAllTodos() {
    return tsRestHandler(contract.todos.getAll, async () => {
      return {
        status: 200,
        body: await this.todoService.getAll(),
      };
    });
  }

  @TsRestHandler(contract.todos.getByID)
  async getTodoById() {
    return tsRestHandler(contract.todos.getByID, async ({ params: { id } }) => {
      const item = await this.todoService.getById(id);
      if (!item) {
        return {
          status: 404,
          body: { message: 'Item not found' },
        };
      }
      return {
        status: 200,
        body: await this.todoService.getById(id),
      };
    });
  }

  @TsRestHandler(contract.todos.create)
  async createTodo() {
    return tsRestHandler(contract.todos.create, async ({ body }) => {
      return {
        status: 201,
        body: await this.todoService.createTodo(body),
      };
    });
  }

  @TsRestHandler(contract.todos.update)
  async updateTodo() {
    return tsRestHandler(
      contract.todos.update,
      async ({ params: { id }, body }) => {
        const updated = await this.todoService.updateTodoById(
          id,
          body as Pick<Todo, 'title' | 'description' | 'completed'>,
        );
        if (!updated) {
          return {
            status: 404,
            body: { message: 'Item not found' },
          };
        }
        return {
          status: 200,
          body: updated,
        };
      },
    );
  }
  @TsRestHandler(contract.todos.remove)
  async deleteTodo() {
    return tsRestHandler(contract.todos.remove, async ({ params: { id } }) => {
      const deleted = await this.todoService.deleteTodoById(id);
      if (!deleted) {
        return {
          status: 404,
          body: { message: 'Item not found' },
        };
      }
      return {
        status: 204,
        body: {},
      };
    });
  }
}
