import { TodoEntity } from "../entities/todo.entity";
import { CreateTodoDto } from '../dtos/todos/create-todo.dto';
import { UpdateTodoDto } from '../dtos/todos/update-todo.dto';

export abstract class TodoDataSource {

    abstract create( createTodoDto: CreateTodoDto ): Promise<TodoEntity>;

    //todo: paginación
    abstract getAll(): Promise<TodoEntity[]>;

    abstract findById( id: number ): Promise<TodoEntity>;
    abstract updateTodo( updateTodoDto: UpdateTodoDto ): Promise<TodoEntity>;
    abstract deleteTodo( id: number ): Promise<TodoEntity>;

};



