import csv
from scraper import CSV_PATH

"""
I choose the top 100 Chinese restaurant with highest reviews as recommended
"""

with open(CSV_PATH, 'r') as csv_file:

    reader = csv.reader(csv_file)
    fieldnames = next(reader)  # move the cursor
    reader = csv.DictReader(csv_file, fieldnames=fieldnames)
    rows = [row for row in reader]
    rows.sort(key=lambda row: int(row['review_count']))
    rows.reverse()

    count = 0
    for row in rows:
        if 'chinese' == row['cuisine']:
            row['recommended'] = 1
            count += 1

        if count == 100:
            break

    else:
        print('NOT THAT MANY CANDIDATES')


R_CSV_PATH = './data_r.csv'

with open(R_CSV_PATH, 'w+') as out_file:
    writer = csv.DictWriter(fieldnames=fieldnames, f=out_file)
    writer.writeheader()
    for row in rows:
        writer.writerow(row)
