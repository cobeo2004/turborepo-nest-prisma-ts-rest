import { initContract } from "@ts-rest/core";
import { todoContract } from "./contracts/todo";
import { todoSchema, Todo } from "./schema/todoSchema";
export { todoContract, todoSchema, type Todo };

const c = initContract();

export const contract = c.router(
  {
    todos: todoContract,
  },
  {
    pathPrefix: "/api/v1",
    strictStatusCodes: true,
  }
);
