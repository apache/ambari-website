---
sidebar_position: 1
---

# Introduction

The Apache Ambari project is aimed at making Hadoop management simpler by developing software for provisioning, managing, and monitoring Apache Hadoop clusters. Ambari provides an intuitive, easy-to-use Hadoop management web UI backed by its RESTful APIs.

Ambari enables System Administrators to:

* Provision a Hadoop Cluster
  - Ambari provides a step-by-step wizard for installing Hadoop services across any number of hosts.

  - Ambari handles configuration of Hadoop services for the cluster.

* Manage a Hadoop Cluster
  - Ambari provides central management for starting, stopping, and reconfiguring Hadoop services across the entire cluster.

* Monitor a Hadoop Cluster
  - Ambari provides a dashboard for monitoring health and status of the Hadoop cluster.

  - Ambari leverages [Ambari Metrics System](https://issues.apache.org/jira/browse/AMBARI-5707) for metrics collection.

  - Ambari leverages [Ambari Alert Framework](https://issues.apache.org/jira/browse/AMBARI-6354) for system alerting and will notify you when your attention is needed (e.g., a node goes down, remaining disk space is low, etc).

Ambari enables Application Developers and System Integrators to:

* Easily integrate Hadoop provisioning, management, and monitoring capabilities to their own applications with the [Ambari REST APIs](https://github.com/apache/ambari/blob/trunk/ambari-server/docs/api/v1/index.md).

## Getting Started with Ambari

Follow the [quick start guide for Ambari 3.0.0](quick-start/quick-start-guide.md).

Note: Ambari currently supports the 64-bit version of the following Operating Systems:

* Rocky Linux 8
* Rocky Linux 9
* OpenEuler 22
* Other operating systems will be supported in future releases.

## Get Involved

Visit the [Ambari Wiki](https://cwiki.apache.org/confluence/display/AMBARI/Ambari) for design documents, roadmap, development guidelines, etc.

[Join the Ambari User Meetup Group](http://www.meetup.com/Apache-Ambari-User-Group). You can see the slides from [April 2, 2013](http://www.meetup.com/Apache-Ambari-User-Group/events/109316812/), [June 25, 2013](http://www.meetup.com/Apache-Ambari-User-Group/events/119184782/), and [September 25, 2013](http://www.meetup.com/Apache-Ambari-User-Group/events/134373312/) meetups.



# Apache Ambari Download
1. Download Links for Apache Ambari 3.0.0
https://apache-ambari.com/dist/ambari/3.0.0/rocky9/

2. Download Links for Apache Ambari Bigtop stack 3.0.0
https://apache-ambari.com/dist/bigtop//3.3.0/rocky9/


## Creating Local Repository
1. Install createrepo package
```
sudo dnf install createrepo
```
2. Create repository directory
```
sudo mkdir -p /var/www/html/ambari-repo/{ambari,bigtop}
sudo chmod -R 755 /var/www/html/ambari-repo
```
3. Download and move RPM packages
```
# For Rocky Linux 8:
cd /var/www/html/ambari-repo/ambari
wget -r -np -nH --cut-dirs=4 --reject 'index.html*' https://www.apache-ambari.com/dist/ambari/3.0.0/rocky8/

cd /var/www/html/ambari-repo/bigtop
wget -r -np -nH --cut-dirs=4 --reject 'index.html*' https://www.apache-ambari.com/dist/bigtop/3.3.0/rocky8/

# For Rocky Linux 9:
cd /var/www/html/ambari-repo/ambari
wget -r -np -nH --cut-dirs=4 --reject 'index.html*' https://www.apache-ambari.com/dist/ambari/3.0.0/rocky9/

cd /var/www/html/ambari-repo/bigtop
wget -r -np -nH --cut-dirs=4 --reject 'index.html*' https://www.apache-ambari.com/dist/bigtop/3.3.0/rocky9/
```
4. Create repository metadata
```
cd /var/www/html/ambari-repo
sudo createrepo ambari
sudo createrepo bigtop
```
Important Notes

- All packages are built for x86_64 architecture
- Packages are tested on Rocky Linux 8 and 9
- Updates are provided on a best-effort basis



## Ambari 3.0.0

| component | CPU | SO| Version |
| --- | --- | ---- | ---- |
| ambari-agent | x86_64 | Rocky Linux 9 | ambari-agent-3.0.0.0-0.x86_64.rpm |
| ambari-server | x86_64 | Rocky Linux 9 | ambari-server-3.0.0.0-0.x86_64.rpm |



## bigtop stack 3.3.0 

| component | CPU | SO | Version |
| --- | --- | ---- | ---- |
| alluxio | x86_64 | Rocky Linux 9 | alluxio_3_3_0-2.9.3-1.el9.x86_64.rpm  |
| bigtop-groovy | x86_64 | Rocky Linux 9 | bigtop-groovy-2.5.4-1.el9.noarch.rpm |
| bigtop-jsvc | x86_64 | Rocky Linux 9 |bigtop-jsvc-1.2.4-1.el9.x86_64.rpm     
| bigtop-select | x86_64 | Rocky Linux 9 |bigtop-select-3.3.0-1.el9.noarch.rpm |
| bigtop-utils |  x86_64 | Rocky Linux 9 |bigtop-utils-3.3.0-1.el9.noarch.rpm     |
| flink | x86_64 | Rocky Linux 9 |flink_3_3_0-1.16.2-1.el9.noarch.rpm     |
| hadoop | x86_64 | Rocky Linux 9 |hadoop_3_3_0-3.3.6-1.el9.x86_64.rpm <br> hadoop_3_3_0-yarn-3.3.6-1.el9.x86_64.rpm |
| hbase | x86_64 | Rocky Linux 9 |hbase_3_3_0-2.4.17-1.el9.x86_64.rpm |
| hive | x86_64 | Rocky Linux 9 |hive_3_3_0-3.1.3-1.el9.noarch.rpm  |
| kafka | x86_64 | Rocky Linux 9 |kafka_3_3_0-2.8.2-1.el9.noarch.rpm   |
| livy | x86_64 | Rocky Linux 9 |livy_3_3_0-0.8.0-1.el9.noarch.rpm  |
| ranger | x86_64 | Rocky Linux 9 | ranger_3_3_0-admin-2.4.0-1.el9.x86_64.rpm          <br>ranger_3_3_0-atlas-plugin-2.4.0-1.el9.x86_64.rpm   <br>ranger_3_3_0-elasticsearch-plugin-2.4.0-1.el9.x..> <br>ranger_3_3_0-hbase-plugin-2.4.0-1.el9.x86_64.rpm   <br>ranger_3_3_0-hdfs-plugin-2.4.0-1.el9.x86_64.rpm    <br>ranger_3_3_0-hive-plugin-2.4.0-1.el9.x86_64.rpm    <br>ranger_3_3_0-kafka-plugin-2.4.0-1.el9.x86_64.rpm   <br>ranger_3_3_0-kms-2.4.0-1.el9.x86_64.rpm            <br>ranger_3_3_0-knox-plugin-2.4.0-1.el9.x86_64.rpm    <br>ranger_3_3_0-kylin-plugin-2.4.0-1.el9.x86_64.rpm   <br>ranger_3_3_0-presto-plugin-2.4.0-1.el9.x86_64.rpm  <br>ranger_3_3_0-solr-plugin-2.4.0-1.el9.x86_64.rpm    <br>ranger_3_3_0-sqoop-plugin-2.4.0-1.el9.x86_64.rpm   <br>ranger_3_3_0-storm-plugin-2.4.0-1.el9.x86_64.rpm   <br>ranger_3_3_0-tagsync-2.4.0-1.el9.x86_64.rpm        <br>ranger_3_3_0-usersync-2.4.0-1.el9.x86_64.rpm       <br>ranger_3_3_0-yarn-plugin-2.4.0-1.el9.x86_64.rpm  |
| solr | x86_64 | Rocky Linux 9 | solr_3_3_0-8.11.2-2.el9.noarch.rpm  |
| spark | x86_64 | Rocky Linux 9 | spark_3_3_0-3.3.4-1.el9.noarch.rpm  |
| tez | x86_64 | Rocky Linux 9 | tez_3_3_0-0.10.2-1.el9.noarch.rpm |
| zeppelin | x86_64 | Rocky Linux 9 | zeppelin_3_3_0-0.11.0-1.el9.x86_64.rpm |
| zookeeper | x86_64 | Rocky Linux 9 | zookeeper_3_3_0-3.7.2-1.el9.x86_64.rpm  |
