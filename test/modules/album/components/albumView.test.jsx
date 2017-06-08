import React from 'react'
import {mount} from 'enzyme'
import {MemoryRouter} from 'react-router-dom'
import {Button, RatingIcon} from 'semantic-ui-react'

import AlbumService from '../../../../src/services/AlbumService'
import AlbumView from 'modules/album/components/albumView'

const mockAlbum = {
  id: 1,
  name: 'Album A',
  description: 'An album',
  releaseDate: '2017/06/07',
  author: {firstName: 'Bob', lastName: 'Marley'},
  tracks: [
    {id: 1, name: 'Track 1'},
    {id: 1, name: 'Track 2'},
    {id: 1, name: 'Track 3'},
    {id: 1, name: 'Track 4'}
  ]
}
let mockGetOne

jest.mock('semantic-ui-react', () => ({
  ...require.requireActual('semantic-ui-react'),
  Popup: ({children}) => children
}))

jest.mock('../../../../src/services/AlbumService', () => ({
  getOne: () => mockGetOne,
  voteForAlbum: jest.fn().mockImplementation(() => Promise.resolve())

}))

describe('<AlbumView />', function () {
  const wrapper = () => mount(
    <MemoryRouter>
      <AlbumView match={{params: {id: 1}}} />
    </MemoryRouter>
  )

  beforeEach(function () {
    mockGetOne = Promise.resolve(mockAlbum)
  })

  afterEach(function () {
    AlbumService.voteForAlbum.mockClear()
  })

  it('renders', function () {
    const subject = wrapper()
    return mockGetOne.then(() => {
      expect(subject.find('.albumView-main').render()).toMatchSnapshot()
    })
  })

  context('when vote is submitted', function () {
    it('registers vote', function () {
      const subject = wrapper()
      return mockGetOne.then(() => {
        subject
          .find(RatingIcon)
          .at(0)
          .find('.icon')
          .simulate('click')
        subject
          .find(Button)
          .filterWhere(button => button.text() === 'Vote')
          .find('button')
          .simulate('click')
        expect(AlbumService.voteForAlbum).toHaveBeenCalledWith(1, 1)
      })
    })
  })
})