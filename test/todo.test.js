const { createSandbox } = require('sinon')
const Todo = require("../src/todo.js");


const assert = require("assert");

describe('Todo', () => {
    let sandbox

    before(() => {
        sandbox = createSandbox()
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('should return invalid when creating an object without text', () => {
        const properties = {
            text: '',
            when: new Date('2022-01-16')
        }

        const todo = new Todo(properties)
        const result = todo.isValid()

        assert.notEqual(result, true)
    })

    it('should return invalid when creating an object without "when" or "when" is invalid', () => {
        const properties = {
            text: 'Testing',
            when: new Date('2022-13-16')
        }

        const todo = new Todo(properties)
        const result = todo.isValid()

        assert.notEqual(result, true)
    })
    it('should have "id", "text", "when" and "status" properties after creating object', () => {
        const properties = {
            text: 'Testing',
            when: new Date('2022-01-16')
        }

        const expectedId = '00000001'
        const todo = new Todo(properties)

        Reflect.set(todo, 'id', expectedId)
        const expectedObj = {
            text: todo.text,
            when: todo.when,
            status: '',
            id: '00000001'
        }

        assert.equal(todo.isValid(),true)
        assert.deepEqual(todo,expectedObj)
    })
})