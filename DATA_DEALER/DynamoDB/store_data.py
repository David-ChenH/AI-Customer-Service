import boto3
import csv
import json
import time


print(time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time())))

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('yelp-restaurants')
DB_FILE_PATH = '../data/db_data.csv'


def build_json(dict_line):
    dict_line['insertedAtTimestamp'] = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))
    new_dict = dict_line.copy()
    for key in dict_line:
        if not dict_line.get(key):
            del new_dict[key]

    new_dict = json.dumps(new_dict)
    item = json.loads(new_dict)
    return item


if __name__ == '__main__':
    with open(DB_FILE_PATH, 'r') as file:
        reader = csv.DictReader(file)
        for line in reader:
            item = build_json(line)
            table.put_item(
                Item=item
            )
