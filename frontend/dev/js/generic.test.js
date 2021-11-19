import { createProbabilities, getReactForm, getFormUriError, setStatus } from "./helpers"

import reducer from './reducer'

test('Testing fetching of form where no url has been supplied', () => {

    return getReactForm()
        .catch(e=>{
            
            expect.assertions(1);
            expect( e ).toBe( getFormUriError )
        })
});


test('Testing for members', () => {

    const url = "http://localhost:8080/teamaker/forms/member";

    return getReactForm(url)
        .then(res=>{

            let reactElementArr = res[1];
            expect( reactElementArr.type ).toBe('form')
        })

}, 30000);



test('Testing invalid input of probability array generator', () => {

    //needs a non-empty array

    expect(()=>{createProbabilities(123)}).toThrow()
    expect(()=>{createProbabilities(14.25)}).toThrow()
    expect(()=>{createProbabilities()}).toThrow()
    expect(()=>{createProbabilities("this is an invalid input")}).toThrow()
    expect(()=>{createProbabilities(true)}).toThrow()
    expect(()=>{createProbabilities({})}).toThrow()
    expect(()=>{createProbabilities(NaN)}).toThrow()
    expect(()=>createProbabilities([1,2,3])).toThrow()

    var data = [ {pk:1, foo:1}, {pk:2, bar:2}, {pk:3, baz:3} ]

    expect(()=>createProbabilities(data)).toThrow()

}, 30000);


test('Testing probability array - returns a non-empty array', () => {

    var data = [ {pk:1, skill_level:1}, {pk:2, skill_level:2}, {pk:3, skill_level:3} ]

    var result              =   createProbabilities(data)
    var isArray             =   result instanceof Array
    var everyOneIsNumber    =   result.every((value, i, arr)=>{

                                    return Number.isInteger(value)
                                })

    expect(isArray).toBe( true )
    expect(result.length).toBeGreaterThan(0);
    expect( everyOneIsNumber ).toBe(true)

}, 30000);



test('Reducer - test to see if a url is changes with a unique hash value', () => {

    const initialState = {

        url: "http://someRandomUrl.com",
        foo: true,
        bar: false
    }

    var payload = {

        type:'url_change',
        url:'http://changedUrl.com/something/something'
    }

    var returnedState = reducer(initialState, payload)

    expect(typeof(returnedState.url) !== 'undefined' ).toBe(true)


    var segments = returnedState.url.split('#')

    expect( segments.length ).toBeGreaterThan(1)


}, 3000);





test('Helper function setStatus - check to see if the correct JSON object is returned', () => {

    var returnedObject = setStatus();

    expect(returnedObject.type).toBe('set_status')


    expect(returnedObject.type).toBe('info')
    expect(returnedObject.message).toBe('')

    returnedObject = setStatus(123455)

    expect(returnedObject.type).toBe('info')
    expect(returnedObject.message).toBe('')
    expect(returnedObject.status_change).toBeGreaterThan(0)

    returnedObject = setStatus(true, 'danger')

    expect(returnedObject.type).toBe('danger')
    expect(returnedObject.message).toBe('')
    expect(returnedObject.status_change).toBeGreaterThan(0)

    returnedObject = setStatus(20.15, true)

    expect(returnedObject.type).toBe('info')
    expect(returnedObject.message).toBe('')
    expect(returnedObject.status_change).toBeGreaterThan(0)

    returnedObject = setStatus('message', true)

    expect(returnedObject.type).toBe('info')
    expect(returnedObject.message).toBe('message')
    expect(returnedObject.status_change).toBeGreaterThan(0)

    returnedObject = setStatus('message', 'danger')

    expect(returnedObject.type).toBe('danger')
    expect(returnedObject.message).toBe('message')
    expect(returnedObject.status_change).toBeGreaterThan(0)



}, 3000);

