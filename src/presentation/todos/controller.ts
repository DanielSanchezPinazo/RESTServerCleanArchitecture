
import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, UpdateTodo } from "../../domain";

export class TodosController {

    //* dependency injection
    constructor( private readonly todoRepository: TodoRepository ) {}

    public getTodos = ( req: Request, res: Response ) => {

        new GetTodos( this.todoRepository )
        .execute()
        .then( todos => res.json( todos ))
        .catch( error => res.status(404).json( {error} )); 
    };

    public getTodoById = ( req: Request, res: Response ) => {

        const id = +req.params.id; //* ese + convierte el string en un number
        
        new GetTodo( this.todoRepository )
        .execute( id )
        .then( todo => res.json( todo ))       
        .catch( error => res.status(404).json( {error} )); 
    };

    public createTodo = ( req: Request, res: Response ) => {

        const [ error, createTodoDto ] = CreateTodoDto.create( req.body );

        if ( error) throw res.status(400).json({ error });

        new CreateTodo( this.todoRepository )
        .execute( createTodoDto! )
        .then( newTodo => res.json( newTodo ))       
        .catch( error => res.status(404).json( {error} ));
    };

    public updateTodo = ( req: Request, res: Response ) => {

        const id = +req.params.id;
        const [ error, updateTodoDto ] = UpdateTodoDto.create( {...req.body, id} );

        if ( error) return res.status(400).json({ error });

        new UpdateTodo( this.todoRepository )
        .execute( updateTodoDto! )
        .then( updatedTodo => res.json( updatedTodo))       
        .catch( error => res.status(404).json( {error} ));
    };

    public deleteTodo = ( req: Request, res: Response ) => {

        const id = +req.params.id;

        new DeleteTodo( this.todoRepository )
        .execute( id )
        .then( deletedTodo => res.json( deletedTodo ))       
        .catch( error => res.status(404).json( {error} ));
    };
};



