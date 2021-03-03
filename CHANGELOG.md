#### 1.0.0 (2021-03-03)

### Package

- Adding required packages to run production
- Adding required packages to run testing

### Middleware

- Adding middleware to handle not found endpoint
- Adding middleware to log each request (only in development mode)
- Adding middleware to handle runtime errors

### Model

#### Batch

- Adding the required fields for batch model
- Adding function to transform an ObjectId into a non-negative number
- Removed function of transformation, after findind out that it won't work because
  of mongodb updates of object id structure.
- Added a static method to create new batches, this method ensures that each new
  batch will have his own unique number.

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

### Controller

- Adding create batch controller

### Testing

- Adding a unit test for ObjectId transformer (currently failing!)
