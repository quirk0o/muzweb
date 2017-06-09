const API = {
  get: (url) => new Promise((resolve, reject) => {
    const lastSlash = url.lastIndexOf('/')
    const newsID = url.substring(lastSlash + 1)
    const data = getNewsByID(newsID)
    if (data) {
      resolve(data)
    } else {
      reject('Wrong news id ' + newsID)
    }
  })
}

const news = [
  {
    title: 'Yoda',
    content: 'Yoda jest mistrzem',
    timestamp: 0
  },
  {
    title: 'John',
    content: 'Snow',
    timestamp: 1
  },
  {
    title: 'Warning',
    content: 'Winter is comming',
    timestamp: 2
  }
]

const getNewsByID = (newsId) => {
  if (news[newsId]) {
    return news[newsId]
  } else {
    return false
  }
}

export default API