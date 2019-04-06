
# Functions
1. run scraper.py to obtain original data.csv from yelp, create data.csv(for ml) and db_data.csv(store in DynamoDB)
2. run mark_recommendation.py modified data.csv for 1/0 recommended
3. run split_dataset.py data.csv to split test file and train file
4. use getRecommend.py to get recommended restaurant in final_for_elastic for Elastic Search
