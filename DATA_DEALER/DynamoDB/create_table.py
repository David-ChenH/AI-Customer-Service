import boto3

# Get the service resource.
dynamodb = boto3.resource('dynamodb')

# Create the DynamoDB table.
table = dynamodb.create_table(
    TableName='yelp-restaurants',
    KeySchema=[
        {
            'AttributeName': 'id',   # partition key
            'KeyType': 'HASH'
        },
        {
            'AttributeName': 'insertedAtTimestamp',  # range key
            'KeyType': 'RANGE'
        }
    ],
    AttributeDefinitions=[
        {
            'AttributeName': 'id',
            'AttributeType': 'S'
        },
        {
            'AttributeName': 'insertedAtTimestamp',
            'AttributeType': 'S'
        },
    ],
    ProvisionedThroughput={
        'ReadCapacityUnits': 5,
        'WriteCapacityUnits': 5
    }
)

# Wait until the table exists.
table.meta.client.get_waiter('table_exists').wait(TableName='yelp-restaurants')

# Print out some data about the table.
print(table.item_count)