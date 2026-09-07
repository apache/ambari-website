---
title: 指标收集器 API 规范
---

<!-- Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements. See the NOTICE file distributed with this work for additional information regarding copyright ownership. The ASF licenses this file to You under the Apache License, Version 2.0. -->

# 指标收集器 API 规范 {#metrics-collector-api-specification}

## 向 AMS 发送指标（POST） {#sending-metrics-to-ams-post}

可以通过以下 API 调用向 Ambari Metrics 服务发送指标。

负责向 AMS 发送指标的 Sink 实现会在发送前缓冲 1 分钟的数据。TimelineMetricCache 提供了实现此行为的简单缓存。

Hadoop 守护进程使用的示例 Sink 实现：https://github.com/apache/ambari/tree/trunk/ambari-metrics/ambari-metrics-hadoop-sink

```uri
POST http://<ambari-metrics-collector>:6188/ws/v1/timeline/metrics
```

```json
{
  "metrics": [
    {
      "metricname": "AMBARI_METRICS.SmokeTest.FakeMetric",
      "appid": "amssmoketestfake",
      "hostname": "ambari20-5.c.pramod-thangali.internal",
      "timestamp": 1432075898000,
      "starttime": 1432075898000,
      "metrics": {
        "1432075898000": 0.963781711428,
        "1432075899000": 1432075898000
      }
    }
  ]
}
```

```
Connecting (POST) to <ambari-metrics-collector>:6188/ws/v1/timeline/metrics/
Http response: 200 OK
```

## 从 AMS 获取指标（GET） {#fetching-metrics-from-ams-get}

**示例调用**
```
GET http://<ambari-metrics-collector>:6188/ws/v1/timeline/metrics?metricNames=AMBARI_METRICS.SmokeTest.FakeMetric&appId=amssmoketestfake&hostname=<hostname>&precision=seconds&startTime=1432075838000&endTime=1432075959000
Http response: 200 OK
Http data:
{
   "metrics": [
      {
         "timestamp": 1432075898089,
         "metricname": "AMBARI_METRICS.SmokeTest.FakeMetric",
         "appid": "amssmoketestfake",
         "hostname": "ambari20-5.c.pramod-thangali.internal",
         "starttime": 1432075898000,
         "metrics": {
            "1432075898000": 0.963781711428,
            "1432075899000": 1432075898000
         }
      }
   ]
}
```

**通用 GET 调用格式**
```uri
http://<AMS_HOST>:6188/ws/v1/timeline/metrics?metricNames=<>&hostname=<>&appId=<>&startTime=<>&endTime=<>&precision=<>
```

**查询参数说明**

参数|可选/必填|说明|可用值
---------|------------------|-----------|-------------------
metricNames|必填，逗号|所需指标的分隔列表。|disk_free,mem_free... 等
appId|必填|与请求的 metricNames 对应的 AppId。目前只需要且只允许 1 个 AppId。|HOST/namenode/datanode/nimbus/hbase/kafka_broker/FLUME_HANDLER 等
hostname|可选|以逗号分隔的主机名列表。未指定时返回集群聚合数据。|h1,h2..等
startTime, endTime|可选|开始和结束时间值。未指定时返回指标的最后一个数据点。|以秒或毫秒表示的 epoch 时间
precision|可选|返回数据所需的精度。未指定时根据请求的时间范围计算精度（见下表）。|SECONDS/MINUTES/DAYS/HOURS

**precision 查询参数（默认分辨率）**

查询时间范围|返回指标的分辨率|注释
---|---|---
不超过 2 小时|SECONDS|主机指标为 10 秒数据；聚合查询（未指定主机）为 30 秒数据
2 小时 - 1 天|MINUTES|5 分钟数据
1 天 - 30 天|HOURS|1 小时数据
> 30 天|DAYS|1 天数据

**指定聚合函数**

metricName 可以在指标名称后添加特定的聚合函数限定符（如下所示）来请求特定聚合。有效值为 ._avg、._max、._min、._sum。当聚合查询的 metricName 未指定聚合函数时，默认值为 AVG。
示例
```
http://<AMS_HOST>:6188/ws/v1/timeline/metrics?metricNames=regionserver.Server.totalRequestCount._avg,regionserver.Server.writeRequestCount._max&appId=hbase&startTime=14000000&endTime=14200000

http://<AMS_HOST>:6188/ws/v1/timeline/metrics?metricNames=regionserver.Server.readRequestCount,regionserver.Server.writeRequestCount._max&appId=hbase&startTime=14000000&endTime=14200000
```

**指定后处理函数**

与聚合函数类似，也可以指定后处理函数。目前有 2 个后处理函数：rate（每秒速率）和 diff（连续值之间的差）。后处理函数也可以应用于聚合函数之后。
示例
```
http://<AMS_HOST>:6188/ws/v1/timeline/metrics?metricNames=regionserver.Server.totalRequestCount._rate,regionserver.Server.writeRequestCount._diff&appId=hbase&startTime=14000000&endTime=14200000

http://<AMS_HOST>:6188/ws/v1/timeline/metrics?metricNames=regionserver.Server.readRequestCount._max._diff&appId=hbase&startTime=14000000&endTime=14200000
```

**指定通配符**

metricNames 和 hostname 都接受通配符（%）值，以匹配一组指标（或主机）。查询也可以组合完整指标名称和带通配符的名称。

示例
```
http://<AMS_HOST>:6188/ws/v1/timeline/metrics?metricNames=regionserver.Server.%&appId=hbase&startTime=14000000&endTime=14200000

http://<AMS_HOST>:6188/ws/v1/timeline/metrics?metricNames=regionserver.Server.%&hostname=abc.testdomain124.devlocal&appId=hbase&startTime=14000000&endTime=14200000

http://<AMS_HOST>:6188/ws/v1/timeline/metrics?metricNames=master.AssignmentManger.ritCount,regionserver.Server.%&hostname=abc.testdomain124.devlocal&appId=hbase&startTime=14000000&endTime=14200000

http://<AMS_HOST>:6188/ws/v1/timeline/metrics?metricNames=regionserver.Server.%&hostname=abc.testdomain12%.devlocal&appId=hbase&startTime=14000000&endTime=14200000
```

**降采样**

如前所述，请求更大的时间范围时 AMS 会对数据进行降采样。返回的默认“跨时间降采样”数据为 AVG。可以像请求跨集群聚合一样，在指标名称中添加聚合函数限定符（._avg、._max、._min、._sum）来请求特定降采样。
示例
```
 http://<AMS_HOST>:6188/ws/v1/timeline/metrics?metricNames=regionserver.Server.totalRequestCount._max&hostname=abc.testdomain124.devlocal&appId=hbase&startTime=14000000&endTime=14200000&precision=MINUTES
```
上述查询返回该指标的 5 分钟数据，其中每个 5 分钟范围内的数据点值是所有值的 MAX。

## AMS 元数据 API {#ams-metadata-api}

AMS 有 2 个元数据端点，可用于查找它接收的指标集合以及集群拓扑。

**指标元数据**

端点：
```
 http://<AMS_HOST>:6188/ws/v1/timeline/metrics/metadata
```
返回数据：APP_ID 集合到其接收指标列表的映射。

返回数据示例

![](@site/versioned_docs/version-3.0.0/ambari-design/metrics/imgs/metrics-metadata.png)

**主机元数据**

端点：
```
 http://<AMS_HOST>:6188/ws/v1/timeline/metrics/hosts
```
返回数据：集群主机到主机上 APP_ID 集合的映射。

返回数据示例

![](@site/versioned_docs/version-3.0.0/ambari-design/metrics/imgs/hosts-metadata.png)

## 编写自己的 Sink 指南 {#guide-to-writing-your-own-sink}
* 将 ambari-metrics-common 构件（从源代码或 maven-central，若可用）引入项目
* 下面提供了 ambari-metrics-common 模块中可使用的常见数据结构信息
* 扩展 org.apache.hadoop.metrics2.sink.timeline.AbstractTimelineMetricsSink 类并实现所需方法
* 使用 org.apache.hadoop.metrics2.sink.timeline.cache.TimelineMetricsCache 存储发送前的中间数据（例如：收集间隔 = 10 秒，发送间隔 = 1 分钟）。缓存实现提供缓冲和本地聚合所需的逻辑。
* 使用 org.apache.hadoop.metrics2.sink.timeline.AbstractTimelineMetricsSink#emitMetrics 向 AMS 后端发送指标。

**指标数据结构**

常见数据结构模块的源位置：https://github.com/apache/ambari/tree/trunk/ambari-metrics/ambari-metrics-common/

示例 Sink 实现：https://github.com/apache/ambari/blob/trunk/ambari-metrics/ambari-metrics-hadoop-sink/

![](@site/versioned_docs/version-3.0.0/ambari-design/metrics/imgs/metrics-datastructure.png)

**内部 Phoenix 键结构**

指标记录键数据结构如下：

属性|类型|注释|可选
--------|----|--------|---------------
指标名称|String|第一个键部分，从 HFile 存储查询时需要重点考虑|N
主机名|String|第二个键部分|N
服务器时间|Long|服务器收到第一个指标写入请求时的时间戳|N
应用程序 ID|String|唯一标识服务|N
实例 ID|String|用于标识实例/组件的第二个键部分|Y
开始时间|Long|时间序列数据的开始时间|

**聚合工作方式**

* 可以通过设置每个聚合器线程的唤醒间隔来控制聚合数据的粒度。
* 目前支持 2 类聚合器：HOST 和 APPLICATION，具有 3 个时间维度，即每分钟、每小时和每天。
  * HOST 聚合只是跨受支持时间维度对精度数据进行聚合。
  * APP 聚合跨 appId 进行。注意：APP 级聚合会忽略 instanceId。APP 级聚合使用相同的时间维度。
  * 还支持 APP 的 HOST 级指标，这意味着系统指标示例 "cpu_user" 可以跨 datanode 聚合，从而计算托管应用的系统指标。
* 每个聚合器通过在文件中存储上次成功完成的时间来执行检查点。如果检查点过旧，聚合器会丢弃检查点，并按配置的间隔聚合数据，即 now - interval 之间的数据。
* 有关表和记录的详细信息，请参阅 [Phoenix 表架构](./operations.md)。
