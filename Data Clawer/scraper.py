import requests
import json
import csv

CUISINE_LIST = ['Mexican', 'Italian', 'British', 'American', 'Chinese', 'Thailand', 'Japanese']
CSV_PATH = './data/data.csv'


def res_dealer(res, cuisine, data_dict):
    """
    This function takes signal jason response and retrieve infos into a list
    :param res: JSON file
    :param cuisine: user declare
    :param data_dict: pass in a dictionary to prevent duplicate result
    :return: modified data dict
    """
    for restaurant in res.get('businesses'):
        res_id = restaurant['id']
        name = restaurant['name']
        review_n = restaurant['review_count']
        rate = restaurant['rating']
        recommended = 1
        if not data_dict.get(res_id):
            data_dict[res_id] = [res_id, cuisine, name, review_n, rate, recommended]
        else:
            continue
    return data_dict


# Notice I change the query method here, not using the categories field
def request_yelp(cuisine, data_dict):
    """
    this function request yelp with cuisines and write results into dictionary
    :param cuisine: user declare
    :param data_dict: prevent duplicate
    :return: dict
    """
    cuisine = cuisine.lower()
    api_key = 'TYNfArrYlFZgOnWnIxHucOea0Duvdp4j0h8FL-QZF95NgQ6TahotSsaZ9VCODZWIJamOYjPB-TnL1JS3aJaZzG0sIByKr8xfOFfiyJeGusK76hoHJONEJGvRYTODXHYx'
    headers = {'Authorization': 'Bearer %s' % api_key}
    yelp_url = "https://api.yelp.com/v3/businesses/search"

    for i in range(20):
        params = {'term': '{0} restaurants'.format(cuisine),  # notice here
                  'location': 'manhattan',
                  "limit": 50,
                  "offset": 50 * i,
              }
        res = requests.get(yelp_url, params=params, headers=headers)
        res = json.loads(res.text)
        res_dealer(res, cuisine, data_dict)

    return data_dict


def write_into_csv(data_dict, csv_path):
    with open(csv_path, mode='w+') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerow(['id', 'cuisine', 'name', 'review_count', 'rate', 'recommended'])
        for key in data_dict:
            writer.writerow(data_dict.get(key))


if __name__ == '__main__':

    d_dict = dict()

    for c_type in CUISINE_LIST:
        request_yelp(c_type, d_dict)

    write_into_csv(d_dict, CSV_PATH)







