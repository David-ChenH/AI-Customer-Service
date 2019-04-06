import requests
import json
import csv

CUISINE_LIST = ['Mexican', 'Italian', 'British', 'American', 'Chinese', 'Thailand', 'Japanese']
CSV_PATH = './data/data.csv'
CSV_DB_PATH = './data/db_data.csv'


def res_dealer(res, cuisine, data_dict):
    """
    This function takes signal jason response and retrieve infos into a list
    :param res: JSON file
    :param cuisine: user declare
    :param data_dict: pass in a dictionary to prevent duplicate result
    :return: modified data dict
    """
    for restaurant in res.get('businesses'):
        # create csv file fields
        res_id = restaurant['id']
        name = restaurant['name']
        review_n = restaurant['review_count']
        rate = restaurant['rating']
        address = restaurant['location']['address1']
        zip_code = restaurant['location']['zip_code']
        coordinates = restaurant['coordinates']['latitude'], restaurant['coordinates']['longitude']
        recommended = None

        if not data_dict.get(res_id):
            data_dict[res_id] = [res_id, cuisine, name, review_n, rate, recommended, address, zip_code, coordinates]
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


def write_into_csv(data_dict, csv_path, db_csv_path):
    with open(csv_path, 'w+') as csv_file, open(db_csv_path, 'w+') as db_file:
        writer = csv.writer(csv_file)  # write into ml file
        db_writer = csv.writer(db_file)

        writer.writerow(['id', 'cuisine', 'review_count', 'rate', 'recommended'])
        db_writer.writerow(['id', 'name', 'review_count', 'rate', 'address', 'zip_code', 'coordinates'])

        for key in data_dict:
            tmp = data_dict.get(key)
            # [res_id, cuisine, name, review_n, rate, recommended, address, zip_code, coordinates]

            writer.writerow(tmp[0:2] + tmp[3:6])
            db_writer.writerow(tmp[0:1] + tmp[2:5] + tmp[6:])


if __name__ == '__main__':

    d_dict = dict()

    for c_type in CUISINE_LIST:
        request_yelp(c_type, d_dict)

    write_into_csv(d_dict, CSV_PATH, CSV_DB_PATH)







