---
title: "Androidの通知をslackに投稿する"
date: "2023-05-17"
---

# 構成図

![](./mermaid/out/Android_notification_post_to_slack.png)

# IFTTT

## If

|         |                       |
| ------- | --------------------- |
| Service | Android Device        |
| Trigger | Notification received |

## Then

|                    |                                                                                                                              |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| Service            | Webhooks                                                                                                                     |
| Action             | Make a web request                                                                                                           |
| URL                | GAS URL                                                                                                                      |
| Method             | POST                                                                                                                         |
| Content Type       | application/json                                                                                                             |
| Additional Headers |                                                                                                                              |
| Body               | {"appname": "{{AppName}}", "title": "{{NotificationTitle}}", "message": "{{NotificationMessage}}", "time": "{{ReceivedAt}}"} |

# GAS

https://github.com/satory074/android_notification_to_slack
