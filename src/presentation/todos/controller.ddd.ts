//! Domain-Driven Design
import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from '../../domain/repositories/todo.repository';

export class TodosController {

    //* dependency injection
    constructor( private readonly todoRepository: TodoRepository ) {}

    public getTodos = async ( req: Request, res: Response ) => {

        const allTodos = await this.todoRepository.getAll();
        return res.json( allTodos );
    };

    public getTodoById = async ( req: Request, res: Response ) => {

        const id = +req.params.id; //* ese + convierte el string en un number
        
        try {
            const todo = await this.todoRepository.findById( id );
            res.json( todo );

        } catch (error) {
            res.status( 400 ).json( {error} );
        };
    };

    public createTodo = async ( req: Request, res: Response ) => {

        const [ error, createTodoDto ] = CreateTodoDto.create( req.body );

        if ( error) return res.status(400).json({ error });

        const todo = await this.todoRepository.create( createTodoDto! );
        return res.json( todo );
    };

    public updateTodo = async ( req: Request, res: Response ) => {

        const id = +req.params.id;
        const [ error, updateTodoDto ] = UpdateTodoDto.create( {...req.body, id} );

        if ( error) return res.status(400).json({ error });

        const updatedTodo = await this.todoRepository.updateTodo( updateTodoDto! );

        return res.json( updatedTodo );
    };

    public deleteTodo = async ( req: Request, res: Response ) => {

        const id = +req.params.id;
        const deletedTodo = await this.todoRepository.deleteTodo( id );
        return res.json( deletedTodo );
    };
}



