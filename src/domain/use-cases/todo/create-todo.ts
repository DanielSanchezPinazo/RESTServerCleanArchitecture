import { TodoEntity } from "../../entities/todo.entity";



export interface CreateTodoUseCase {

    execute(): Promise<TodoEntity>
}

