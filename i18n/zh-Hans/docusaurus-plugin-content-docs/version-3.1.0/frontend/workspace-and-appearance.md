---
title: 工作区导航与外观
---

<!--
Licensed to the Apache Software Foundation (ASF) under one or more
contributor license agreements. See the NOTICE file distributed with
this work for additional information regarding copyright ownership.
The ASF licenses this file to You under the Apache License, Version 2.0
(the "License"); you may not use this file except in compliance with
the License. You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

# 工作区导航与外观 {#workspace-navigation-and-appearance}

本指南介绍[运行时 mpack 开发快照](../management-packs/overview.md)中的控制台改进，范围为主 React 控制台及桌面操作。嵌入应用和独立部署的界面可能具有自己的导航与外观。

## 全局目录与集群工作区 {#global-and-cluster}

全局导航提供**集群**、**服务**和仅管理员可见的**管理包**入口。集群和管理包也位于集群侧栏上方，在仪表盘、监控、服务、主机、告警等集群功能之前。

全局目录用于选择环境和管理定义；集群工作区用于服务配置与日常操作。应用顶部会明确显示当前集群。

![暗色管理包页面中的全局导航和返回工作区入口](@site/static/img/3.1.0/mpack-store/catalog-dark.jpg)

菜单是否显示取决于账号权限。管理员菜单不可见，并不表示安装缺失，手工输入路由也不会增加权限。

## 返回离开前的页面 {#return-to-workspace}

从集群进入全局目录时，控制台会在当前账号的浏览器会话中记录准确的集群路径及查询参数。

点击**返回工作区**即可打开该页面。例如，从某服务的 Configs 离开，依次访问集群目录和管理包，即使刷新了全局页面，仍可返回原来的服务路径及 URL 参数。

记录按账号和浏览器会话隔离。新会话没有访问过集群页面时，可能不显示返回入口。此功能恢复导航，不恢复未保存的表单内容；仍应遵守未保存提示、当前权限以及集群、服务是否存在等检查。

## 选择浅色、暗色或跟随系统 {#appearance}

点击顶栏语言控件旁边的太阳、月亮或显示器图标，打开**外观**菜单。登录页也提供该入口。

| 选项 | 行为 |
| --- | --- |
| 浅色 | 始终使用浅色控制台，不受系统外观影响 |
| 暗色 | 始终使用暗色控制台，不受系统外观影响 |
| 跟随系统 | 跟随操作系统的浅色、暗色偏好 |

显式选择属于浏览器偏好，刷新后保留，并与同源的其他标签页同步。切换不会修改集群配置或重启服务。浏览器存储不可用时，当前标签页仍可切换外观。

暗色设计采用石墨灰分层、浅色文字和明确的选中态。IBM Plex Sans 由应用本地提供；中文使用可用的 CJK 无衬线字体，配置文档与代码保持等宽显示。

外观覆盖主导航、表格、配置控件、常用弹窗、图表轴与图例、状态标签和分页。判断状态时，应同时看严重程度文字和数量，不能只看颜色。

## 服务配置与版本控件 {#configuration-controls}

服务的 Summary 与 Configs 仍是不同页签。修改配置前先选择配置组和版本，版本菜单和配置组弹出菜单会使用当前外观。

参考商店的[完整配置文件流程](../management-packs/content-configuration.md)展示原生完整文档，基本设置则保留管理输入。保存新版本仍需要相应配置权限，并按要求执行后续重启或 reload。

## 主机告警数量 {#host-alert-counts}

主机名旁的紧凑徽标显示严重与警告告警的总数。存在严重告警时优先使用严重状态样式，只有警告时使用对应样式；总数为零时不显示徽标。

悬停或聚焦可以了解主机与严重程度细分。激活徽标会进入该主机的 Alerts 页面，点击主机名称则进入 Summary。徽标使用正常的可访问链接，也支持键盘操作。

主机健康、维护状态、待重启项和告警数量是不同指标，因此健康图标和告警徽标可以同时出现。

## 监控操作 {#monitoring-interactions}

刷新偏好、秒级时间范围、查询取消、空结果与错误提示、采集目标详情和序列显示操作，见[查询与仪表盘](../monitoring/queries-and-dashboards.md#workspace-interactions)。

查询端点、数据采集目标和展示的图表属于不同层次。隐藏曲线不会停止采集；数据源已启用只是配置状态，不证明连接测试或所有采集都成功。

## 处理旧浏览器页面 {#browser-recovery}

开发部署替换 Web 文件后，应刷新页面加载新的应用。如果旧标签页仍显示之前的菜单，先核对实际加载的构建，再判断功能是否缺失。

管理包提交响应丢失时，需要按操作身份恢复，不能通过反复刷新、重复提交解决。该流程见[管理包恢复](../management-packs/operations-and-recovery.md)。
