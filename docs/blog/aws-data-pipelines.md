# Building Data Pipelines on AWS

AWS offers a variety of services for building scalable data pipelines. Here’s a simple example using AWS Glue and S3:

## Example: Glue ETL Job
```python
import sys
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job

sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)

# ... ETL logic ...
```

## Orchestrate with Step Functions
Use AWS Step Functions to coordinate multiple ETL jobs.
