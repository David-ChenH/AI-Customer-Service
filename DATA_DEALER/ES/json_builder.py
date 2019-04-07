import csv
import json

DATA_PATH = '../data/final_for_elastic.csv'
JSON_PATH = 'bulk_cuisine.json'
KEEP = ['id', 'cuisine', 'score']

"""
FYI: https://docs.aws.amazon.com/zh_cn/elasticsearch-service/latest/developerguide/es-indexing.html
https://docs.aws.amazon.com/zh_cn/elasticsearch-service/latest/developerguide/es-gsg-upload-data.html
"""


def build_metadata(id_value):
    metadata = {"index": {
                        "_index": "predictions",
                        "_type": "Prediction",
                        "_id": id_value}}
    return metadata


def build_json_line(dict_line):
    tmp = dict_line.copy()
    for key in dict_line:
        if key not in KEEP:
            del tmp[key]

    return tmp


with open(DATA_PATH, 'r') as file, open(JSON_PATH, 'w+') as json_file:
    reader = csv.DictReader(file)
    for line in reader:
        idx = line.get('id')
        json.dump(build_metadata(idx), json_file)
        json_file.write('\n')

        json.dump(build_json_line(line), json_file)
        json_file.write('\n')


"""
Use this command line for push json file to your ES service
curl -XPOST elasticsearch_domain_endpoint/_bulk --data-binary @bulk_cuisine.json -H 'Content-Type: application/json'
"""