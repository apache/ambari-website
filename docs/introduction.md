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
