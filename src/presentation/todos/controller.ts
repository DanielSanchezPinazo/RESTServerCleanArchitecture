
import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

export class TodosController {

    //* dependency injection
    constructor(  ) {}

    public getTodos = async ( req: Request, res: Response ) => {

        const allTodos = await prisma.todo.findMany();
        res.json( allTodos );
    };

    public getTodoById = async ( req: Request, res: Response ) => {

        const id = +req.params.id; //* ese + convierte el string en un number
        if (isNaN( id )) res.status(400).json({ error: `ID argument is not a number.` });
        
        const todo = await prisma.todo.findFirst({
            where: { id: id }
        });
        ( todo )
            ? res.json( todo )
            : res.status(404).json({ error: `TODO with id ${ id } not found.` });
    };

    public createTodo = async ( req: Request, res: Response ) => {

        const [ error, createTodoDto ] = CreateTodoDto.create( req.body );

        if ( error) return res.status(400).json({ error });

        const newTodo = await prisma.todo.create({
            data: createTodoDto!
        });

        res.json( newTodo );
    };

    public updateTodo = async ( req: Request, res: Response ) => {

        const id = +req.params.id;
        const [ error, updateTodoDto ] = UpdateTodoDto.create( {...req.body, id} );

        if ( error) return res.status(400).json({ error });

        const todo = await prisma.todo.findUnique({
            where: { id: id }
        });

        if ( !todo ) return res.status(404).json({ error: `TODO with id ${ id } not found.` });

        const updatedTodo = await prisma.todo.update({
            where: { id },// esto es lo mismo que where: { id: id }
            data: updateTodoDto!.values
        });

        res.json( updatedTodo );
    };

    public deleteTodo = async ( req: Request, res: Response ) => {

        const id = +req.params.id;
        if (isNaN( id )) return res.status(400).json({ error: `ID argument is not a number.`});
        const todo = await prisma.todo.findUnique({
            where: { id }
        });

        if ( !todo ) {
            return res.status(404).json({ error: `TODO with id ${ id } not found.` });
        };

        const deleted = await prisma.todo.delete({
            where: { id }
        });

        res.json( {todo, deleted} );
    };
}



