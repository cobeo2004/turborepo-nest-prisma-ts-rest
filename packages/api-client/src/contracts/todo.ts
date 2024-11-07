import { initContract } from "@ts-rest/core";
import { todoSchema } from "../schema/todoSchema";
import { z } from "zod";

const contract = initContract();

export const todoContract = contract.router(
  {
    create: {
      method: "POST",
      path: "/todos",
      body: todoSchema.omit({ id: true }),
      responses: {
        201: todoSchema,
      },
    },
    getAll: {
      method: "GET",
      path: "/todos",
      query: z.object({ title: z.number().optional() }),
      responses: {
        200: z.array(todoSchema),
      },
    },
    getByID: {
      method: "GET",
      path: "/todos/:id",
      pathParams: z.object({ id: z.coerce.string() }),
      responses: {
        200: todoSchema,
        404: z.object({ message: z.string() }),
      },
    },
    update: {
      method: "PATCH",
      path: "/todos/:id",
      pathParams: z.object({ id: z.coerce.string() }),
      body: todoSchema.omit({ id: true }).partial(),
      responses: {
        200: todoSchema,
        404: z.object({ message: z.string() }),
      },
    },
    remove: {
      method: "DELETE",
      path: "/todos/:id",
      pathParams: z.object({ id: z.coerce.string() }),
      responses: {
        204: z.object({}),
        404: z.object({ message: z.string() }),
      },
    },
  },

  {
    strictStatusCodes: true,
  }
);
