const app = require('../../../app');
const supertest = require('supertest');
const mongoose = require('mongoose');
const Url = require('../../../models/url');

const request = supertest(app);
let dummyTestData;

describe('Query test Suite', () => {
    beforeEach(async () => {
        const dbUrl = `mongodb://127.0.0.1/url_shortener_test`;
        await mongoose.connect(dbUrl, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false,
        });

        //seed database with dummy data
        const url = "https://techpoint.africa/";
        dummyTestData = await Url.addUrl(url);
      });
    
      afterEach(async() => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
      });

    it('Should return a url payload', async() => {
        const response = await request.post('/graphql').send({query:"{urls{full,short}}"});
        expect(response.status).toBe(200);
        expect(response.body.data.urls.length).toBe(1);
        expect(response.body.data.urls[0]).toHaveProperty('full',dummyTestData.full)
        expect(response.body.data.urls[0]).toHaveProperty('short',dummyTestData.short)
    });
});