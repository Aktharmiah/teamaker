import { createProbabilities, getReactForm, getFormUriError } from "./helpers"

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



