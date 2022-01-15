
class TodoService{
    constructor({todoRepository}){
        this.todoRepository=todoRepository
    }
    create(todo){
        if(!todo.isValid()){
            return{
                error:{
                    message:'invalid data',
                    data:todo
                }
            }
        }

        const {when}=todo
        const today=new Date()

        const todoItem={
            ...todo,
            status:when>today?'pending':'late'
        }

        return this.todoRepository.create(todoItem)
    }

    list(){
        return this.todoRepository.list()
        .map(({meta,$loki,...data})=>{
            return data
        })
    }
}

module.exports=TodoService