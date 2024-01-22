import { Router } from "express";
import { TodosController } from "./controller";

export class TodoRoutes {

    static get routes(): Router {

        const router = Router();
        const todoController = new TodosController();

        //router.get("/", (req, res) => todoController.getTodos( req, res ));
        //* La línea de abajo es equivalente a lo de arriba:
        router.get("/", todoController.getTodos);
        router.get("/:id", todoController.getTodoById);

        router.post("/", todoController.createTodo);
        
        router.put("/:id", todoController.updateTodo);

        router.delete("/:id", todoController.deleteTodo);

        return router;
    };
}



