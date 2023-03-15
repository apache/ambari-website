# Stacks and Services

**Introduction**

Ambari supports the concept of Stacks and associated Services in a Stack Definition. By leveraging the Stack Definition, Ambari has a consistent and defined interface to install, manage and monitor a set of Services and provides extensibility model for new Stacks + Services to be introduced.

From Ambari 2.4, there is also support for the concept of Extensions and its associated custom Services in an Extension Definition. 

Terminology

Term | Description
-----|------------
Stack | Defines a set of Services and where to obtain the software packages for those Services. A Stack can have one or more versions, and each version can be active/inactive. For example, Stack = "HDP-1.3.3".
Extension |  Defines a set of custom Services which can be added to a stack version.  An Extension can have one or more versions.
Service  | Defines the Components (MASTER, SLAVE, CLIENT) that make up the Service. For example, Service = "HDFS"
Component | The individual Components that adhere to a certain defined lifecycle (start, stop, install, etc). For example, Service = "HDFS" has Components = "NameNode (MASTER)", "Secondary NameNode (MASTER)", "DataNode (SLAVE)" and "HDFS Client (CLIENT)"