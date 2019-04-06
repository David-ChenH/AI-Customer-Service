import csv
from mark_recommendation import R_CSV_PATH
import random

"""
This file is used to split the csv file into train and test files
"""

TR_CSV_FILE = './data/train.csv'
TE_CSV_FILE = './data/test.csv'

with open(R_CSV_PATH, 'r') as csv_file, open(TR_CSV_FILE, 'w+') as train_file, open(TE_CSV_FILE, 'w+') as test_file:

    reader = csv.reader(csv_file)
    fieldnames = next(reader)  # move the cursor

    writer_train = csv.DictWriter(fieldnames=fieldnames, f=train_file)
    writer_train.writeheader()
    writer_test = csv.DictWriter(fieldnames=fieldnames, f=test_file)
    writer_test.writeheader()

    reader = csv.DictReader(csv_file, fieldnames=fieldnames)
    rows = [row for row in reader]
    random.shuffle(rows)

    for row in rows:
        if not row['recommended']:
            writer_test.writerow(row)
        else:
            writer_train.writerow(row)





