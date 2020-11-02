const assert = require('assert')
const { Pact, Matchers } = require('@pact-foundation/pact')
const { fetchOrders } = require('./consumer')
const { eachLike } = Matchers

describe('Pact with Order API', () => {
  const provider = new Pact({
    port: 8080,
    consumer: 'OrderClient',
    provider: 'OrderApi',
  })

  before(() => provider.setup())

  after(() => provider.finalize())

  describe('when a call to the API is made', () => {
    before(async () => {
      return provider.addInteraction({
        state: 'there are orders',
        uponReceiving: 'a request for orders',
        withRequest: {
          path: '/orders',
          method: 'GET',
        },
        willRespondWith: {
          body: eachLike({
            id: 1,
            items: eachLike({
              name: 'burger',
              quantity: 2,
              value: 100,
            }),
          }),
          status: 200,
        },
      })
    })

    it('will receive the list of current orders', async () => {
      const result = await fetchOrders()
      assert.ok(result.length)
    })
  })
})
