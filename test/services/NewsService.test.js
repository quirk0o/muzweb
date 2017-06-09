import NewsService from '../../src/services/NewsService'

jest.mock('API')

describe('#getOne() using Promises', () => {

  it('should load news data', () => {
    return NewsService.getOne(1)
      .then(news => {
        expect(news).toBeDefined()
        expect(news.title).toEqual('John')
      })
  })
})