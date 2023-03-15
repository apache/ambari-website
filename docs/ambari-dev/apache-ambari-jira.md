# Apache Ambari JIRA

The following page describes the [Apache Ambari JIRA](https://issues.apache.org/jira/browse/AMBARI) components for tasks, bugs and improvements across the core project + contributions.

## components

Proposed Rename | Description
------|---------------------
alerts        | JIRAs related to Ambari Alerts system.
ambari-admin  | New component specifically for Ambari Admin.
ambari-agent  | JIRAs related to the Ambari Agent.
ambari-client | JIRAs related to the Ambari Client.
ambari-metrics|   JIRAs related to Ambari Metrics system.
ambari-server |  JIRAs related to the Ambari Server.
ambari-shell  |  New component specifically for Ambari Shell.
ambari-views  |  JIRAs related to the [Ambari Views framework](../ambari-design/views/index.md). Specific Views that are built on the framework will be handled with labels.
ambari-web    |  New component specifically for Ambari Web.
blueprints    |  JIRAs related to [Ambari Blueprints](../ambari-design/blueprints/index.md).
contrib       |  JIRAs related to contributions under "contrib", such as Ambari SCOM
documentation |  JIRAs related to project documentation including the wiki.
infra         |  JIRAs related to project infrastructure including builds, releases mechanics and automation
security      |  JIRAs related to Ambari security features, including Kerberos.
site          |  JIRAs related to the project site http://ambari.apache.org/
stacks        |  JIRAs related to Ambari Stacks.
test          |  JIRAs related to unit tests and test automation

## Use of Labels

In certain cases, the component listed above might be "too broad" and you want to designate JIRAs to a specific area of that component. To handle these scenarios, use a combination of component + labels. Some examples:

Feature Area | Description|Component|Label
-------------|------------|----------|---------
HDP Stack   | These are specific Stack implements for HDP.  |stacks | HDP
BigTop      | This is a specific Stack implement for BigTop.  | stacks | BigTop
Files View  | This is a specific view implementation for Files. | ambari-views | Files
Ambari SCOM | This is a specific contribution of a Management Pack for Microsoft System Center. | contrib |Ambari-SCOM
