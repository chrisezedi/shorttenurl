const mongoose = require('mongoose');
const Url = require('../../../models/url');
const { getUrls,addUrl } = require('../../../url/url.resolvers');

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

    it('Should return an array of urls', async() => {
        const response = await getUrls();
        expect(response.length).toBe(1);
        expect(response[0]).toHaveProperty('full',dummyTestData.full);
        expect(response[0]).toHaveProperty('short',dummyTestData.short);
    });

    it('Should return an array of urls of length 2', async() => {
      const url = 'https://lusbuab.medium.com/using-dotenv-with-jest-7e735b34e55f';
      const response = await addUrl('',{full:url});
      const urls = await getUrls();
      expect(urls.length).toBe(2);
      expect(response).toHaveProperty('full',url);
      expect(response).toHaveProperty('short');
  });
});