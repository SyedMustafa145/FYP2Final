from pygooglenews import GoogleNews
from datetime import datetime
gn = GoogleNews()


def Fetch_News(search):
  stories = []
  search = gn.search(search,when='24h')
  newsitem= search['entries']
  for item in newsitem:
    #print(item)
    story = {
        'title': item.title,
        'published': item.published,
        'source': item.source.title,
        'link': item.link
    }
    stories.append(story)

  return stories




