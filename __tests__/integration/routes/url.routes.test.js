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
        const url = "https://techpoint1.africa/";
        dummyTestData = await Url.addUrl(url);

      });
    
      afterEach(async() => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
      });

    it('Should redirect', async() => {
        const short = dummyTestData.short.slice(-6);
        const response = await request.get(`/${short}`).send({query:"{urls{full,short}}"});
        expect(response.status).toBe(302);
        expect(response.error).toBeFalsy();
    });
});