+++
draft: true
+++

https://www.coursera.org/learn/leveraging-unstructured-data-dataproc-gcp

- Unstructured data includes data that may be structured but not in the way the
  current analysis can benefit from

## On-prem Hadoop has a lot of overhead

- Analysis code
    - Where we should spend time, all else is overhead
    - All else can be managed by Dataproc
- Deployment & configuration
- Utilization improvements
- Handling growing scale
- Resource provisioning
- Performance tuning
- Reliability
- Monitoring

## Creating a Dataproc cluster

- Since clusters take 90 sec to activate, you can use one per job
- HDFS is available if you want it, but you can avoid that complexity
    - If you use GCS you can avoid the above overhead (dynamic scaling)
        - Using GCS makes the cluster stateless (shut it down)
    - (500 GB data + 200 GB for management) * 3x replicas = 2.1 TB
        - Do not use HDFS to store input/output data
- Disk performance scales with size

```
$ gcloud dataproc clusters create my-cluster \
    --master-machine-type n1-standard-1 \
    --worker-machine-type n1-standard-1 \
    --master-boot-disk-size 50 \
    --worker-boot-disk-size 50 \
    --zone us-central1-a \
    --num-workers 2

# The machines can be customized:
    --master-machine-type custom-6-23040
    --worker-machine-type custom-6-30720
    # 6 CPUs, 30 GB * 1024 = 30720
```

- Network tag on master node to make sure we apply firewall rule
- In the "VPC Network" add a firewall rule
    - Allow external access with Firewall rule for TCP 9870, 8088
    - Source IP should be `<IP>/32`
- Go to VM's `<external-IP>:9870` for the Haddop admin console
- Go to VM's `<external-IP>:8088` for the Hadoop dashboard

- Non-crticial long workloads can benefit from preemptible VMs
    - Use 2 nodes for primaries + preemtible VMs for secondaries
    - As time increases, the chances of failure increase due to preempt

- Job vs Worfklow?

## Hive vs Pig

- Pig is imperative
    - Tells implicitly what to do, and let's the system decide
    - Useful for unstructured data (similar to SQL + scripting)

- Hive is declarative
    - Maintains metadata with schema on top of the data
    - Designed for batch jobs (not transactions)
    - Useful for structured data (similar to SQL)
    - Tells explicitly what to do
    - Does not support:
        - Real-time queries
        - Unstructured data
        - Row-level updates

Ingest a file into Hadoop:

```
$ hadoop fs -mkdir /pet-details
$ hadoop fs -put pet-details.txt /pet-details
```

Create table in Hive (this deletes the `/pet-details/pet-details.txt` file):

```
$ hive
hive> CREATE DATABASE pets;
hive> USE pets;
hive > CREATE TABLE details (Type String, Name String, Breed String,
    Color String, Weight Int) ROW FORMAT DELIMITED FIELDS TERMINATED BY ',';
SHOW TABLES;
DESCRIBE pets.details;

load data INPATH '/pet-details/pet-details.txt' OVERWRITE INTO TABLE details;

SELECT * FROM pets.details;

quit;
```

Run a Pig job (the actual names come from the script):

```
hadoop fs -put pet-details.txt /pet-details

pig < pet-details.pig

mkdir output; cd output
hadoop fs -get /GroupedByType/part* .
cat part-r-0000
```

The contents of the script are:

```
rmf /GroupedByType
x1 = load '/pet-details' using PigStorage(',') as (Type:chararray,Name:chararray,Breed:chararray,Color:chararray,Weight:int);
x2 = filter x1 by Type != 'Type';
x3 = foreach x2 generate Type, Name, Breed, Color, Weight, Weight / 2.24 as Kilos:float;
x4 = filter x3 by LOWER(Color) == 'black' or LOWER(Color) == 'white';
x5 = group x4 by Type;
store x5 into '/GroupedByType';
```

- Mean time to failure (MTTF) for a computer is 3 years
    - If you have three computers, one is likely to fail within 1 year


## Evolution of data processing

- MapReduce: 2004
    - Started the Hadoop-cycle
- Bigtable: 2006
    - You need to make sure your keys are well sorted and partitioned
    - High throughput, low latency, NoSQL for massive workloads
- Dremel: 2008
    - Engine behind BigQuery
- Colossus: 2009
    - Backend technology for BigQuery and Bigtable


## Submiting Dataproc jobs

- Only jobs submitted through GCP's interface are tracked
    - Storage and processing happen inside the same region/zone
    - Jobs submitted from within the cluster are not
- When looking at info from HDFS file details
    - The dropdown "block" information tells us how many blocks are needed
    - The "availability" part tells us what nodes hold the blocks for the file
- RDD: Resilient Distributed Dataset
    - For DAG optimizations to kick in transformations need to be chained
    - Opaque to the location and replication of the data it contains
    - May be processed in different nodes selected by Spark
    - Resilient to node failures
    - Lazy evaluation
    - Are immutable

```
# wordcount.py
from pyspark.sql import SparkSession
from operator import add
import re

print("Okay Google.")

spark = SparkSession\
        .builder\
        .appName("CountUniqueWords")\
        .getOrCreate()

lines = spark.read.text("/sampledata/road-not-taken.txt").rdd.map(lambda x: x[0])
counts = lines.flatMap(lambda x: x.split(' ')) \
                  .filter(lambda x: re.sub('[^a-zA-Z]+', '', x)) \
                  .filter(lambda x: len(x)>1 ) \
                  .map(lambda x: x.upper()) \
                  .map(lambda x: (x, 1)) \
                  .reduceByKey(add) \
                  .sortByKey()
output = counts.collect()
for (word, count) in output:
  print("%s = %i" % (word, count))

spark.stop()
```

Submit the job with:

```
$ spark-submit wordcount.py
```

## BigQuery from within Dataproc

- Dataproc/Spark does not know how to retrieve data from BigQuery
- Data can be exported from BigQuery into various buckets in GCS
- Dataproc/Spark can read data in parallel from various GCS buckets
    - When data is read from GCS it's stored into HDFS temporarily
- Another option is to use a connector like shown below
    - If you need to query, you need to export that result into a table first
    - This method can only read data from a BigQuery table

```
sc = pyspark.SparkContext()
bucket = sc._jsc.hadoopConfiguration().get("fs.gs.system.bucket")
project = sc._jsc.hadoopConfiguration().get("fs.gs.project.id")
input_directory = "gs://{}/hadoop/tmp/bigquery/pyspark_input".format(bucket)
config = {
    "mapred.bq.project.id": project,
    "mapred.bq.gcs.bucket": bucket,
    "mapred.bq.temp.gcs.path": input_directory,
    "mapred.bq.input.project.id": "publicdata",
    "mapred.bq.input.dataset.id": "samples",
    "mapred.bq.input.table.id": "shakespeare",
}

table_data = sc.newAPIHadoopRDD(
    "com.google.cloud.hadoop.io.bigquery.JsonTextBigQueryInputFormat",
    "org.apache.hadoop.io.LongWritable",
    "com.google.gson.JsonObject",
    conf=config
)
```

Code like the following could be problematic if the `word_counts` results
were writtento a file name that is not parameterized because multiple nodes
would attemp to write to that same file, and would overwrite it.

```
word_counts = (
    table_data
    .map(lambda (_, record): json.loads(record))
    .map(lambda x: (x['word'].lower(), int(x['word_count'])))
    .reduceByKey(lambda x, y: x + y)
)
```

The following code would parameterize the file names, avoiding the problem:

```
output_dir = "gs://{}/hadoop/tmp/bigquery/pyspark_output".format(bucket)
parts = range(word_counts.getNumberPartitions())
output_files = [output_directory + "/part-{:05}".format(i) for i in parts]

(word_counts
    .map(labda (w, c): json.dumps({"word": w, "word_count": c}))
    .saveAsTextFile(output_dir)
)
```

Clean up code can help avoid keeping unnecessary files:

```
input_path = sc._jvm.org.apache.hadoop.fs.Path(input_dir)
input_path.getFileSystem(sc._jsc.hadoopConfiguration()).delete(input_path, True)
output_path = sc._jvm.org.apache.hadoop.fs.Path(output_dir)
output_path.getFileSystem(sc._jsc.hadoopConfiguration()).delete(output_path, True)
```

You can use the following to list files in GCS from within Dataproc:

```
$ hadoop fs -ls gs://$BUCKET
```

You can copy a script you have developed inside Dataproc into GCS with:

```
$ gsutil cp <script>.py gs://$BUCKET
```

## Installing software in Dataproc

An example of an installation script that can distinguish a `master` is below.

More initialization scripts can be found in:
https://github.com/GoogleCloudPlatform/dataproc-initialization-actions

or in the `gs://dataproc-initialization-actions` bucket. For example, the
script in gs://cloud-training-demos/dataproc/datalab.sh install Datalab in the
master node.

```
#!/bin/bash

apt-get update || true

ROLE=$(/usr/share/google/get_metadata_value attributes/dataproc-role)

if [[ "${ROLE}" == "Master" ]]; then
    apt-get install -y vim
else
    # Only for workers
fi

apt-get install -y python-numpy python-scipy python-matplotlib python-pandas
```

One way to start a Dataproc cluster using `gcloud` is:

```
gcloud dataproc clusters create cluster-custom \
--bucket $BUCKET \
--subnet default \
--zone $MYZONE \
--region $MYREGION \
--master-machine-type n1-standard-2 \
--master-boot-disk-size 100 \
--num-workers 2 \
--worker-machine-type n1-standard-1 \
--worker-boot-disk-size 50 \
--num-preemptible-workers 2 \
--image-version 1.2 \
--scopes 'https://www.googleapis.com/auth/cloud-platform' \
--tags customaccess \
--project $PROJECT_ID \
--initialization-actions 'gs://'$BUCKET'/init-script.sh','gs://cloud-training-demos/dataproc/datalab.sh'
```

Cluster creation can be scripted based on this CLI command. Therefore cluster creation can be automated. You can create clusters periodically using a Cron job. You could write an application detect an PySpark file being added to a bucket in Cloud Storage and use that to trigger cluster creation. You could also integrate Dataproc cluster creation and job submission into a Continuous Integration environment like Travis or Jenkins. In this way you only start and pay for clusters when they are needed.

To create firewall rules the following can be used:

```
gcloud compute \
--project=$PROJECT_ID \
firewall-rules create allow-custom \
--direction=INGRESS \
--priority=1000 \
--network=default \
--action=ALLOW \
--rules=tcp:9870,tcp:8088,tcp:8080 \
--source-ranges=$BROWSER_IP/32 \
--target-tags=customaccess
```

Other things that you could do with your cluster:

- Terminate cluster after a quiet period
- Turn on firewall rules automatically
- Develop and test apps with Datalab
- Host production apps in GCS

## Dataproc + Machine Learning

An example of a robust bash script to setup an environment:

```
#!/bin/bash

# Go to the standard location
cd ~/training-data-analyst/coursers/unstructured

# If this is our first time here, backup the program files
# If this is a subsequent run, restore from backup before proceeding
#
if [ -d "backup" ]; then
  cp backup/*dataproc* .
else
  mkdir backup
  cp *dataproc* backup
fi
# Verify that the environment variables exist
#
OKFLAG=1
if [[ -v $BUCKET ]]; then
  echo "BUCKET environment variable not found"
  OKFLAG=0
fi
if [[ -v $DEVSHELL_PROJECT_ID ]]; then
  echo "DEVSHELL_PROJECT_ID environment variable not found"
  OKFLAG=0
fi
if [[ -v $APIKEY ]]; then
  echo "APIKEY environment variable not found"
  OKFLAG=0
fi
if [ OKFLAG==1 ]; then
  # Edit the script files
  sed -i "s/your-api-key/$APIKEY/" *dataprocML.py
  sed -i "s/your-project-id/$DEVSHELL_PROJECT_ID/" *dataprocML.py
  sed -i "s/your-bucket/$BUCKET/" *dataprocML.py
  # Copy python scripts to the bucket
  gsutil cp *dataprocML.py gs://$BUCKET/
  # Copy data to the bucket
  gsutil cp gs:\/\/cloud-training\/gcpdei\/road* gs:\/\/$BUCKET\/sampledata\/
  gsutil cp gs:\/\/cloud-training\/gcpdei\/time* gs:\/\/$BUCKET\/sampledata\/
fi
```

An example of a simple NLP for sentiment analysis code is:

```

'''
  This program takes a sample text line of text and passes to a Natural Language Processing
  services, sentiment analysis, and processes the results in Python.

'''

import logging
import argparse
import json

import os
from googleapiclient.discovery import build

from pyspark import SparkContext
sc = SparkContext("local", "Simple App")

'''
You must set these values for the job to run.
'''
APIKEY="AIzaSyAZc3je0w6vhrasNC4rZQIVUq1p6Q5A0a4"   # CHANGE
print(APIKEY)
PROJECT_ID="qwiklabs-gcp-00-dc8ac09d5b9f"  # CHANGE
print(PROJECT_ID)
BUCKET="qwiklabs-gcp-00-dc8ac09d5b9f"   # CHANGE


## Wrappers around the NLP REST interface

def SentimentAnalysis(text):
    from googleapiclient.discovery import build
    lservice = build('language', 'v1beta1', developerKey=APIKEY)

    response = lservice.documents().analyzeSentiment(
        body={
            'document': {
                'type': 'PLAIN_TEXT',
                'content': text
            }
        }).execute()

    return response

## main

sampleline = 'There are places I remember, all my life though some have changed.'
#

# Calling the Natural Language Processing REST interface
#
results = SentimentAnalysis(sampleline)

#
#  What is the service returning?
#
print("Function returns: ", type(results))

print(json.dumps(results, sort_keys=True, indent=4))
```

Some other scripts are `02-dataprocML.py`:

```
'''
  This program reads a text file and passes to a Natural Language Processing
  service, sentiment analysis, and processes the results in Spark.

'''

import logging
import argparse
import json

import os
from googleapiclient.discovery import build

from pyspark import SparkContext
sc = SparkContext("local", "Simple App")

'''
You must set these values for the job to run.
'''
APIKEY="AIzaSyAZc3je0w6vhrasNC4rZQIVUq1p6Q5A0a4"   # CHANGE
print(APIKEY)
PROJECT_ID="qwiklabs-gcp-00-dc8ac09d5b9f"  # CHANGE
print(PROJECT_ID)
BUCKET="qwiklabs-gcp-00-dc8ac09d5b9f"   # CHANGE


## Wrappers around the NLP REST interface

def SentimentAnalysis(text):
    from googleapiclient.discovery import build
    lservice = build('language', 'v1beta1', developerKey=APIKEY)

    response = lservice.documents().analyzeSentiment(
        body={
            'document': {
                'type': 'PLAIN_TEXT',
                'content': text
            }
        }).execute()

    return response

## main

# We could use sc.textFiles(...)
#
#   However, that will read each line of text as a separate object.
#   And using the REST API to NLP for each line will rapidly exhaust the rate-limit quota
#   producing HTTP 429 errors
#
#   Instead, it is more efficient to pass an entire document to NLP in a single call.
#
#   So we are using sc.wholeTextFiles(...)
#
#      This provides a file as a tuple.
#      The first element is the file pathname, and second element is the content of the file.
#
sample = sc.wholeTextFiles("gs://{0}/sampledata/road-not-taken.txt".format(BUCKET))

# Calling the Natural Language Processing REST interface
#
rdd1 = sample.map(lambda x: SentimentAnalysis(x[1]))


rdd2 =  rdd1.flatMap(lambda x: x['sentences'] )\
            .flatMap(lambda x: [(x['sentiment']['magnitude'], x['sentiment']['score'], [x['text']['content']])] )


results = rdd2.take(50)



for item in results:
  print('Magnitude= ',item[0],' | Score= ',item[1], ' | Text= ',item[2])
```


And finally `03-dataprocML.py`:

```
'''
  This program reads a text file and passes to a Natural Language Processing
  service, sentiment analysis, and processes the results in Spark.

'''

import logging
import argparse
import json

import os
from googleapiclient.discovery import build

from pyspark import SparkContext
sc = SparkContext("local", "Simple App")

'''
You must set these values for the job to run.
'''
APIKEY="AIzaSyAZc3je0w6vhrasNC4rZQIVUq1p6Q5A0a4"   # CHANGE
print(APIKEY)
PROJECT_ID="qwiklabs-gcp-00-dc8ac09d5b9f"  # CHANGE
print(PROJECT_ID)
BUCKET="qwiklabs-gcp-00-dc8ac09d5b9f"   # CHANGE


## Wrappers around the NLP REST interface

def SentimentAnalysis(text):
    from googleapiclient.discovery import build
    lservice = build('language', 'v1beta1', developerKey=APIKEY)

    response = lservice.documents().analyzeSentiment(
        body={
            'document': {
                'type': 'PLAIN_TEXT',
                'content': text
            }
        }).execute()

    return response

## main

# We could use sc.textFiles(...)
#
#   However, that will read each line of text as a separate object.
#   And using the REST API to NLP for each line will rapidly exhaust the rate-limit quota
#   producing HTTP 429 errors
#
#   Instead, it is more efficient to pass an entire document to NLP in a single call.
#
#   So we are using sc.wholeTextFiles(...)
#
#      This provides a file as a tuple.
#      The first element is the file pathname, and second element is the content of the file.
#
sample = sc.wholeTextFiles("gs://{0}/sampledata/time-machine.txt".format(BUCKET))

# Calling the Natural Language Processing REST interface
#
# results = SentimentAnalysis(sampleline)
rdd1 = sample.map(lambda x: SentimentAnalysis(x[1]))

# The RDD contains a dictionary, using the key 'sentences' picks up each individual sentence
# The value that is returned is a list. And inside the list is another dictionary
# The key 'sentiment' produces a value of another list.
# And the keys magnitude and score produce values of floating numbers.
#

rdd2 =  rdd1.flatMap(lambda x: x['sentences'] )\
            .flatMap(lambda x: [(x['sentiment']['magnitude'], x['sentiment']['score'], [x['text']['content']])] )

# First item in the list tuple is magnitude
# Filter on only the statements with the most intense sentiments
#
rdd3 =  rdd2.filter(lambda x: x[0]>.75)


results = sorted(rdd3.take(50))


print('\n\n')
for item in results:
  print('Magnitude= ',item[0],' | Score= ',item[1], ' | Text= ',item[2],'\n')

```
