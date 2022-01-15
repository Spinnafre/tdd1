// const { describe, it, before, afterEach,beforeEach }=require("mocha");
const assert=require("assert");
const {createSandbox}=require('sinon')
const TodoRepository=require('../src/TodoRepository.js')


describe('TodoRepository',()=>{
    let sandbox
    let todoRepository

    before(()=>{
        sandbox=createSandbox()
        todoRepository=new TodoRepository()
    })

    afterEach(()=>{
        sandbox.restore()
    })

    it('should call insertOne from lokijs',()=>{
        sandbox.stub(todoRepository.schedule,'insertOne')
        .returns(true)

        const expectedArg={
            ex:'Davi'
        }

        const result=todoRepository.create(expectedArg)

        assert.ok(result)
        assert.deepStrictEqual(todoRepository.schedule.insertOne.firstCall.firstArg,expectedArg)
    })

    it('should call find from lokijs',()=>{
        const expectedArg=[{
            text: 'hello!',
            meta: {
                revision: 0,
                created: 1611180937993,
                version: 0
            },
            $loki: 4
        }]
        sandbox.stub(todoRepository.schedule,'find')
        .returns(expectedArg)

        const result=todoRepository.list()
        assert.deepStrictEqual(result,expectedArg)
        assert.deepStrictEqual(todoRepository.schedule.find.callCount,1)
    })
})