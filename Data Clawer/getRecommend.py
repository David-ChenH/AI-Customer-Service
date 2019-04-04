import csv


RR_CSV_FILE = './data/result.csv'
FIN_FILE = './data/recommended.csv'

with open(RR_CSV_FILE, 'r') as in_file, open(FIN_FILE, 'w+') as out_file:
    reader = csv.reader(in_file)
    fieldnames = next(reader)  # move the cursor

    writer = csv.DictWriter(fieldnames=fieldnames, f=out_file)
    writer.writeheader()

    reader = csv.DictReader(in_file, fieldnames=fieldnames)

    for row in reader:
        if '1.0' == row['best_answer']:
            writer.writerow(row)
