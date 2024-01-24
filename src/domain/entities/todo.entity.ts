


export class TodoEntity {

    constructor(
        public id: number,
        public text: string,
        public completedAt?: Date | null
    ) {};

    get isCompleted() {
        return !!this.completedAt;
//! esta doble negación se utiliza para garantizar que el resultado final sea un valor booleano que 
// refleje si this.completedAt es truthy o falsy. Es una forma común de asegurarse de que el resultado 
// sea un booleano puro, independientemente de qué tipo de valor pueda tener this.completedAt.
    };

    public static fromObject( object: {[key: string]: any} ): TodoEntity {

        const { id, text, completedAt } = object;
        if (!id) throw "Id is required.";
        if (!text) throw "Text is required.";

        let newCompletedAt;
        if ( completedAt ) {
            newCompletedAt = new Date( completedAt );
            if ( isNaN( newCompletedAt.getTime())) {
                throw "CompletedAt is not a valid date.";           };
        };

        return new TodoEntity( id, text, completedAt );
    };
};




