const { urlType } = require('../../../url/url.types')
const { GraphQLNonNull,GraphQLString } = require('graphql');

//url types test suite
describe('Url Types Test Suite', ()=>{
    it('Should be of type String (required) for full property', () => {
        expect(urlType.getFields().full.type).toMatchObject(GraphQLNonNull(GraphQLString))
    });

    it('Should be of type String (required) for short property', () => {
        expect(urlType.getFields().short.type).toMatchObject(GraphQLNonNull(GraphQLString))
    })
});