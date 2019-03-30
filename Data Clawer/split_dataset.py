import csv
from mark_recommendation import R_CSV_PATH
import random

"""
This file is used to split the csv file into train and test files
"""

with open(R_CSV_PATH, 'r') as csv_file:

    reader = csv.reader(csv_file)
    fieldnames = next(reader)  # move the cursor
    reader = csv.DictReader(csv_file, fieldnames=fieldnames)
    rows = [row for row in reader]
    random.shuffle(rows)

test = 200

test_rows = rows[:200]
train_rows = rows[200:]

TR_CSV_FILE = './train.csv'
TE_CSV_FILE = './test.csv'

with open(TR_CSV_FILE, 'w+') as out_file:
    writer = csv.DictWriter(fieldnames=fieldnames, f=out_file)
    writer.writeheader()
    for row in train_rows:
        writer.writerow(row)

with open(TE_CSV_FILE, 'w+') as out_file:
    writer = csv.DictWriter(fieldnames=fieldnames, f=out_file)
    writer.writeheader()
    for row in test_rows:
        writer.writerow(row)





