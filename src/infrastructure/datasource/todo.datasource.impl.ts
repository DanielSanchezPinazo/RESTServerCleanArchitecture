import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto } from "../../domain";



export class TodoDatasourceImpl implements TodoDataSource {

    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const newTodo = await prisma.todo.create({
            data: createTodoDto!
        });

        return TodoEntity.fromObject( newTodo );
    };

    async getAll(): Promise<TodoEntity[]> {        
        const allTodos = await prisma.todo.findMany();
        return allTodos.map( todo => TodoEntity.fromObject( todo ));
    };

    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({
            where: { id }
        });

        if ( !todo ) throw `Todo with id:${ id } not found.`;
        return TodoEntity.fromObject( todo );
    };

    async updateTodo(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        await this.findById(updateTodoDto.id);
        const updatedTodo = await prisma.todo.update({
            where: { id: updateTodoDto.id },
            data: updateTodoDto!.values
        });

        return TodoEntity.fromObject( updatedTodo );
    };

    async deleteTodo(id: number): Promise<TodoEntity> {
        await this.findById( id );
        const deleted = await prisma.todo.delete({
            where: { id }
        });
        return TodoEntity.fromObject( deleted );
    };

};

