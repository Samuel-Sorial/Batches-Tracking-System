#### 1.0.0 (2021-03-03)

> This is not a changelong that describes what's in this package, this describes the flow of the development of this package, and why I made some technical decisions, and why I edited them, etc.

## Package

- Adding required packages to run production
- Adding required packages to run testing
- Adding test script
- Adding init script that initialzes the environment variables

## Middleware

- Adding middleware to handle not found endpoint
- Adding middleware to log each request (only in development mode)
- Adding middleware to handle runtime errors

## Model

### Batch

- Adding the required fields for batch model
- Adding function to transform an ObjectId into a non-negative number
- Removed function of transformation, after findind out that it won't work because
  of mongodb updates of object id structure.
- Adding a static method to create new batches, this method ensures that each new
  batch will have his own unique number.
- Adding a compound index on size & color to make the group by aggregation on them
  optimized for the case that we have a huge dataset.

### Sequence

- Adding the required schema for sequence
  The main purpose of having this model is to avoid having to manipulate sequence numbers
  for each model in his logic, instead, I decoupled this and extracted this model. It helps
  to find out a unique number for each document, which prevents errors when we delete document,
  as it keeps consistent whatever happend to the other models.
- Adding initialize method at utils to help us prevent errors when generating numbers,
  instead of using upsert in findAndUpdate which makes it non-atomic. I prefered to use
  it without upsert to make sure of atomicity and assure that each number will be generated
  once and only once!

## Controller

- Adding create batch controller
- Adding find all batches controller
- Adding an option to group by color & size on finding all batches

## Testing

- Adding a unit test for ObjectId transformer (currently failing!)
- Removing the unit test for ObjectID
- Adding test cases for both create & find all
