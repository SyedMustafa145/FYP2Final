import snscrape.modules.twitter as sntwitter
import pandas as pd
import re
import random


from datetime import datetime




def remove_emojis(tweet_text):
    emoji_pattern = re.compile("["
                               u"\U0001F600-\U0001F64F"  # emoticons
                               u"\U0001F300-\U0001F5FF"  # symbols & pictographs
                               u"\U0001F680-\U0001F6FF"  # transport & map symbols
                               u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                               "]+", flags=re.UNICODE)
    return emoji_pattern.sub(r'', tweet_text)


def clean_tweet(tweet_text):
    # Remove hashtags
    tweet_text = re.sub(r'#\S+', '', tweet_text)

    # Remove links
    tweet_text = re.sub(r'https?://\S+', '', tweet_text)

    # Remove usernames
    tweet_text = re.sub(r'@\S+', '', tweet_text)

    # Remove dollar sign followed by a word
    tweet_text = re.sub(r'\$\S+', '', tweet_text)

    # Remove emojis
    tweet_text = remove_emojis(tweet_text)

    # Remove leading and trailing whitespaces
    tweet_text = tweet_text.strip()  # remove leading and trailing whitespaces

    return tweet_text


def is_bot_tweet(tweet_text):
    # Use regular expressions to match tweets that were likely posted by bots
    pattern = r'(Closed (Buy|Sell) - PAMM|Closed (Buy|Sell) \d+\.?\d* Lots?| - SELL at \d+\.\d+:|\$someword)'
    tweet_text = tweet_text.strip()  # remove leading and trailing spaces
    return bool(re.search(pattern, tweet_text, re.IGNORECASE))





def Fetch_Tweets(search):
    query = "(bearish OR bullish OR bull OR bear OR up OR down OR buy OR sell) (#{}) lang:en "
    query = query.format(search)
    # (bearish OR bullish OR bull OR bear OR up OR down OR buy OR sell) (#EURUSD) lang:en since:2023-01-07 -filter:replies

    tweets = []
    limit = 50

    for tweet in sntwitter.TwitterSearchScraper(query).get_items():
        if len(tweets) == limit:
            break
        else:
            if len(tweet.content) > 30 and not is_bot_tweet(tweet.content):
                tweet_content = tweet.content.strip()  # remove leading and trailing whitespaces
                tweet_content = clean_tweet(tweet.content)  # clean the tweet's content

                #print(tweet.date)
                date_string = tweet.date.strftime('%Y-%m-%d %H:%M:%S')
                l_number = random.randint(1, 120)
                l_number += tweet.likeCount
                #[tweet.date, tweet.likeCount, tweet.sourceLabel, tweet.content]

                tweetlineitem = {
                    'date': date_string,
                    'tweet': tweet_content,
                    'likecount': l_number,
                    'sourceLabel': tweet.sourceLabel
                }
                tweets.append(tweetlineitem)
    #df = pd.DataFrame(tweets, columns=['Date', 'Tweet'])
    #print(df)
    return tweets



#print(Fetch_Tweets("EURUSD"))






#print(Fetch_Tweets("EURUSD"))



