# Upgrading Ambari Metrics System

**Upgrading from Ambari 2.0 or 2.0.1 to 2.1**

1. Upgrade ambari server and perform needed post-upgrade checks. (make sure all services are up and running)
2. Stop Ambari Metrics service
3. Execute the following command on all hosts.

  ```bash
   yum upgrade -y ambari-metrics-monitor  ambari-metrics-hadoop-sink
  ```
  (Use appropriate package manager on ubuntu and windows)

4. Execute the following command on host running Metrics Collector

     ```bash
     yum upgrade -y ambari-metrics-collector
     ```

5. Start Ambari Metrics Service
6. The Sink jars will be deployed on every host, the daemons will pick the changes to sink implementations when they are restarted. (E.g.: HDFS Namenode / Datanode)