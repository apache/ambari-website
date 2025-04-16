# Ambari Alerts

Help page for Alerts defined in Ambari.

## Ambari Agent Heartbeat

**Service**: Ambari
**Component**: Ambari Server
**Type**: SERVER
**Groups**: AMBARI Default
**Description**: This alert is triggered if the server has lost contact with an agent.

If this alert is generated then the alert text will contain the host name (e.g. c6401.ambari.apache.org is not sending heartbeats.). Check that the agent is running and if its running tail the log to see if its receiving and heartbeat response from the server. Check if the server host name is correct in /etc/ambari-agent/conf/ambari-agent.ini file and is reachable.