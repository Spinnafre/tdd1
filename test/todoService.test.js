// const { describe, it, before, afterEach,beforeEach }=require("mocha");
const { createSandbox }=require("sinon");
const assert=require("assert");
const Todo=require("../src/todo.js");
const TodoService=require('../src/TodoService.js')
// const TodoRepository=require('../src/TodoRepository.js')

describe('todoService', () => {
  let sandbox
  let todoService

  before(() => {
    sandbox = createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('# Create', () => {
    beforeEach(()=>{
      const todoReposito={
        todoRepository:{
          create:sandbox.fake.returns(true) // Função fake que irá retornar true
        }
      }
      todoService = new TodoService(todoReposito)
    })
    it('shouldn\'t save todo item with invalid data ',()=>{
      const todoArgs={
        text:'I alway will walking with my cat',
        when:new Date('22-21-58')
      }
      const todo=new Todo(todoArgs)
      Reflect.set(todo,'id','010101')

      const returned=todoService.create(todo)
      const expectedReturn={
        error: {
          message: 'invalid data',
          data: todo
        }
      }

      assert.deepStrictEqual(returned,expectedReturn)
    })
    it('should save todo item with late status when the property is further than today', () => {
      const properties = {
        text: 'I must walk with my cat',
        when: new Date('2020-12-29')
      }

      const todo = new Todo(properties)
      const d1 = new Date('2020-12-29')
      //Sempre que usar Date irá ter o resultado como base
      // o valor passado dentro do fakeTimers, ou seja
      //Date.now(), new Date() vai ser igual ao passado no fakeTimers
      sandbox.useFakeTimers(d1.getTime())

      todoService.create(todo)
      
      assert.ok(todoService.todoRepository.create.calledOnce)
      const expectedArg={
        ...todo,
        status:'late'
      }
      assert.deepStrictEqual(todoService.todoRepository.create.firstCall.firstArg,expectedArg)
    
    });

    it('should save todo item with pending status',()=>{
      const properties = {
        text: 'I must walk with my cat',
        when: new Date('2022-01-16')
      }

      const todo = new Todo(properties)
      Reflect.set(todo,'id','010101')
      const d1 = new Date('2022-01-13')
      sandbox.useFakeTimers(d1.getTime())

      todoService.create(todo)
      const expectedArg={
        ...todo,
        status: 'pending'
      }
      assert.deepStrictEqual(todoService.todoRepository.create.firstCall.firstArg,expectedArg)
    })

  });
});