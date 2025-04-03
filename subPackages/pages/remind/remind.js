// pages/remind/remind.js
Page({

  /**
   * 页面的初始数据
   */
  /* ！！！注意：这里的所有-month都是 getMonth() ,没有+1，真正显示月份需要+1
      new Date(year,month,day) 中  month 从0~11
  */
  data: {
    // 当前选择日期
    curyear: '',
    curmonth: 0,
    curday: 0,

    // “今天”日期
    thisyear: '',
    thismonth: 0,
    today: 0,

    // 本月1号前空缺了几天
    emptyDay: 0,

    // 当前月份每天的序号排列
    dayList: [],

    // 当前日历下有活动的圆点
    pointList: [],
    // 当天的活动列表
    showList: [],

    // 星期标题
    weeks: ['Sun', 'M', 'T', 'W', 'T', 'F', 'Sat'],

    // 活动列表
    actList: [{
      id: 0,
      title: '“校园摄影大赛”开始报名',
      beginDate: '2024-09-24',
      beginTime: '10:00',
      endDate: '2024-09-26',
      endTime: '12:30',
      finish: false,
      urlTitle: '校园摄影大赛',
      urlid: 0
    },
    {
      id: 1,
      title: '“星星之火”开始签到',
      beginDate: '2024-09-27',
      beginTime: '14:30',
      endDate: '2024-09-27',
      endTime: '23:59',
      finish: true,
      urlTitle: '星星之火',
      urlid: 0
    },
    {
      id: 2,
      title: '“宣讲会”开始报名',
      beginDate: '2024-09-28',
      beginTime: '15:30',
      endDate: '2024-10-07',
      endTime: '12:00',
      finish: false,
      urlTitle: '宣讲会',
      urlid: 0
    },
    {
      id: 3,
      title: '“观星台”开始签到',
      beginDate: '2024-09-30',
      beginTime: '19:30',
      endDate: '2024-10-01',
      endTime: '19:30',
      finish: false,
      urlTitle: '观星台',
      urlid: 0
    }],
    // 滑动的指定距离
    back_top: 0,
    // 返回顶部标记，为true显示回到顶部按钮，false则不显示
    isTop: false,
    curImgIndex: 0,
    // 本月当天的图标“星星”
    curImg: ['data:image/svg+xml;charset=utf-8;base64,PHN2ZyB0PSIxNzI3MDk0Nzc3MTgxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQyODgiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNMzEzLjk5MTgzNyA5MTQuMjg1NzE0Yy0yMC4zNzU1MSAwLTQwLjIyODU3MS02LjI2OTM4OC01Ni45NDY5MzktMTguODA4MTYzLTMwLjMwMjA0MS0yMS45NDI4NTctNDQuOTMwNjEyLTU4LjUxNDI4Ni0zOC42NjEyMjUtOTUuMDg1NzE0bDI0LjAzMjY1NC0xNDEuMDYxMjI1YzMuMTM0Njk0LTE4LjI4NTcxNC0zLjEzNDY5NC0zNi41NzE0MjktMTYuMTk1OTE5LTQ5LjExMDIwNEwxMjMuMjk3OTU5IDUwOS45MTAyMDRjLTI2LjY0NDg5OC0yNi4xMjI0NDktMzYuMDQ4OTgtNjQuMjYxMjI0LTI0LjU1NTEwMi05OS43ODc3NTUgMTEuNDkzODc4LTM1LjUyNjUzMSA0MS43OTU5MTgtNjEuMTI2NTMxIDc4Ljg4OTc5Ni02Ni4zNTEwMmwxNDEuNTgzNjc0LTIwLjM3NTUxMWMxOC4yODU3MTQtMi42MTIyNDUgMzMuOTU5MTg0LTE0LjEwNjEyMiA0MS43OTU5MTgtMzAuMzAyMDRsNjMuMjE2MzI2LTEyOC41MjI0NDlDNDQwLjk0NjkzOSAxMzAuNjEyMjQ1IDQ3NC4zODM2NzMgMTA5LjcxNDI4NiA1MTIgMTA5LjcxNDI4NnM3MS4wNTMwNjEgMjAuODk3OTU5IDg3LjI0ODk4IDU0LjMzNDY5NEw2NjIuOTg3NzU1IDI5Mi41NzE0MjljOC4zNTkxODQgMTYuMTk1OTE4IDI0LjAzMjY1MyAyNy42ODk3OTYgNDEuNzk1OTE4IDMwLjMwMjA0bDE0MS41ODM2NzQgMjAuMzc1NTExYzM3LjA5Mzg3OCA1LjIyNDQ5IDY3LjM5NTkxOCAzMC44MjQ0OSA3OC44ODk3OTYgNjYuMzUxMDIgMTEuNDkzODc4IDM1LjUyNjUzMSAyLjA4OTc5NiA3My42NjUzMDYtMjQuNTU1MTAyIDk5Ljc4Nzc1NWwtMTAyLjQgOTkuNzg3NzU1Yy0xMy4wNjEyMjQgMTIuNTM4Nzc2LTE5LjMzMDYxMiAzMS4zNDY5MzktMTYuMTk1OTE5IDQ5LjExMDIwNGwyNC4wMzI2NTQgMTQxLjA2MTIyNWM2LjI2OTM4OCAzNy4wOTM4NzgtOC4zNTkxODQgNzMuMTQyODU3LTM4LjY2MTIyNSA5NS4wODU3MTQtMzAuMzAyMDQxIDIxLjk0Mjg1Ny02OS40ODU3MTQgMjQuNTU1MTAyLTEwMi40IDcuMzE0Mjg2TDUzOC4xMjI0NDkgODM2LjQ0MDgxNmMtMTYuMTk1OTE4LTguMzU5MTg0LTM1LjUyNjUzMS04LjM1OTE4NC01MS43MjI0NDkgMGwtMTI2Ljk1NTEwMiA2Ni44NzM0N2MtMTQuNjI4NTcxIDcuMzE0Mjg2LTMwLjMwMjA0MSAxMC45NzE0MjktNDUuNDUzMDYxIDEwLjk3MTQyOHogbTE2Mi40ODE2MzItOTYuNjUzMDYxeiIgZmlsbD0iI0YyQ0I1MSIgcC1pZD0iNDI4OSI+PC9wYXRoPjwvc3ZnPg==', 'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB0PSIxNzI3NTgwMTAyODA3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjExNDQiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNMzEzLjk5MTgzNyA5MTQuMjg1NzE0Yy0yMC4zNzU1MSAwLTQwLjIyODU3MS02LjI2OTM4OC01Ni45NDY5MzktMTguODA4MTYzLTMwLjMwMjA0MS0yMS45NDI4NTctNDQuOTMwNjEyLTU4LjUxNDI4Ni0zOC42NjEyMjUtOTUuMDg1NzE0bDI0LjAzMjY1NC0xNDEuMDYxMjI1YzMuMTM0Njk0LTE4LjI4NTcxNC0zLjEzNDY5NC0zNi41NzE0MjktMTYuMTk1OTE5LTQ5LjExMDIwNEwxMjMuMjk3OTU5IDUwOS45MTAyMDRjLTI2LjY0NDg5OC0yNi4xMjI0NDktMzYuMDQ4OTgtNjQuMjYxMjI0LTI0LjU1NTEwMi05OS43ODc3NTUgMTEuNDkzODc4LTM1LjUyNjUzMSA0MS43OTU5MTgtNjEuMTI2NTMxIDc4Ljg4OTc5Ni02Ni4zNTEwMmwxNDEuNTgzNjc0LTIwLjM3NTUxMWMxOC4yODU3MTQtMi42MTIyNDUgMzMuOTU5MTg0LTE0LjEwNjEyMiA0MS43OTU5MTgtMzAuMzAyMDRsNjMuMjE2MzI2LTEyOC41MjI0NDlDNDQwLjk0NjkzOSAxMzAuNjEyMjQ1IDQ3NC4zODM2NzMgMTA5LjcxNDI4NiA1MTIgMTA5LjcxNDI4NnM3MS4wNTMwNjEgMjAuODk3OTU5IDg3LjI0ODk4IDU0LjMzNDY5NEw2NjIuOTg3NzU1IDI5Mi41NzE0MjljOC4zNTkxODQgMTYuMTk1OTE4IDI0LjAzMjY1MyAyNy42ODk3OTYgNDEuNzk1OTE4IDMwLjMwMjA0bDE0MS41ODM2NzQgMjAuMzc1NTExYzM3LjA5Mzg3OCA1LjIyNDQ5IDY3LjM5NTkxOCAzMC44MjQ0OSA3OC44ODk3OTYgNjYuMzUxMDIgMTEuNDkzODc4IDM1LjUyNjUzMSAyLjA4OTc5NiA3My42NjUzMDYtMjQuNTU1MTAyIDk5Ljc4Nzc1NWwtMTAyLjQgOTkuNzg3NzU1Yy0xMy4wNjEyMjQgMTIuNTM4Nzc2LTE5LjMzMDYxMiAzMS4zNDY5MzktMTYuMTk1OTE5IDQ5LjExMDIwNGwyNC4wMzI2NTQgMTQxLjA2MTIyNWM2LjI2OTM4OCAzNy4wOTM4NzgtOC4zNTkxODQgNzMuMTQyODU3LTM4LjY2MTIyNSA5NS4wODU3MTQtMzAuMzAyMDQxIDIxLjk0Mjg1Ny02OS40ODU3MTQgMjQuNTU1MTAyLTEwMi40IDcuMzE0Mjg2TDUzOC4xMjI0NDkgODM2LjQ0MDgxNmMtMTYuMTk1OTE4LTguMzU5MTg0LTM1LjUyNjUzMS04LjM1OTE4NC01MS43MjI0NDkgMGwtMTI2Ljk1NTEwMiA2Ni44NzM0N2MtMTQuNjI4NTcxIDcuMzE0Mjg2LTMwLjMwMjA0MSAxMC45NzE0MjktNDUuNDUzMDYxIDEwLjk3MTQyOHogbTE2Mi40ODE2MzItOTYuNjUzMDYxeiIgZmlsbD0iIzcwNzA3MCIgcC1pZD0iMTE0NSIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC5tYW5hZ2VfdHlwZV9teWxpa2VzLjAuaTAuNjkyNTNhODFBSFVGWHQiIGNsYXNzPSJzZWxlY3RlZCI+PC9wYXRoPjwvc3ZnPg=='
    ],
    // 闹钟图标
    timeImg: 'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB0PSIxNzI3MDk4MjMwMDQwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI1MzE0IiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTAgMGgxMDI0djEwMjRIMHoiIGZpbGw9IiNGRkZGRkYiIG9wYWNpdHk9Ii4wMSIgcC1pZD0iMjUzMTUiPjwvcGF0aD48cGF0aCBkPSJNOTkwLjEyMjY2NyA4OTcuMjhjMC04LjUzMzMzMy00Ni45MzMzMzMtMTcuMDY2NjY3LTE0NS4wNjY2NjctMjEuMzMzMzMzLTk4LjEzMzMzMy00LjI2NjY2Ny0yMTMuMzMzMzMzLTguNTMzMzMzLTM0OS44NjY2NjctOC41MzMzMzRzLTI1NiAwLTM0OS44NjY2NjYgOC41MzMzMzRjLTk4LjEzMzMzMyA0LjI2NjY2Ny0xNDUuMDY2NjY3IDEyLjgtMTQ1LjA2NjY2NyAyMS4zMzMzMzNzNDYuOTMzMzMzIDE3LjA2NjY2NyAxNDUuMDY2NjY3IDIxLjMzMzMzM2M5OC4xMzMzMzMgNC4yNjY2NjcgMjEzLjMzMzMzMyA4LjUzMzMzMyAzNDkuODY2NjY2IDguNTMzMzM0IDEzNi41MzMzMzMgMCAyNTEuNzMzMzMzLTQuMjY2NjY3IDM0OS44NjY2NjctOC41MzMzMzQgOTguMTMzMzMzLTguNTMzMzMzIDE0NS4wNjY2NjctMTIuOCAxNDUuMDY2NjY3LTIxLjMzMzMzM3oiIGZpbGw9IiNGRjRENEYiIHAtaWQ9IjI1MzE2Ij48L3BhdGg+PHBhdGggZD0iTTc2MC40MDUzMzMgMjk2LjAyMTMzM2w1NS40NjY2NjctOTguMTMzMzMzLTIxLjMzMzMzMy0xNy4wNjY2NjctNTUuNDY2NjY3IDEwMi40eiIgZmlsbD0iI0UyNjI0RCIgcC1pZD0iMjUzMTciPjwvcGF0aD48cGF0aCBkPSJNOTIzLjU2MjY2NyAxOTQuNzMwNjY3Yy04LjUzMzMzMy00Mi42NjY2NjctMjkuODY2NjY3LTcyLjUzMzMzMy01OS43MzMzMzQtOTguMTMzMzM0LTM0LjEzMzMzMy0yMS4zMzMzMzMtNjguMjY2NjY3LTI5Ljg2NjY2Ny0xMDYuNjY2NjY2LTIxLjMzMzMzMy0zNC4xMzMzMzMgOC41MzMzMzMtNjQgMjkuODY2NjY3LTg1LjMzMzMzNCA2NGwyMzQuNjY2NjY3IDE3MC42NjY2NjdjMTcuMDY2NjY3LTM0LjEzMzMzMyAyNS42LTcyLjUzMzMzMyAxNy4wNjY2NjctMTE1LjJ6IiBmaWxsPSIjRjdBRjQ4IiBwLWlkPSIyNTMxOCI+PC9wYXRoPjxwYXRoIGQ9Ik02NzEuODI5MzMzIDEzOS40MzQ2NjdsMjA0LjggMTQ5LjMzMzMzM2M0LjI2NjY2Ny0yNS42IDQuMjY2NjY3LTUxLjIgMC03Ni44LTQuMjY2NjY3LTI5Ljg2NjY2Ny0xMi44LTUxLjItMjkuODY2NjY2LTc2LjgtMTcuMDY2NjY3LTE3LjA2NjY2Ny0zNC4xMzMzMzMtMjkuODY2NjY3LTU1LjQ2NjY2Ny0zOC40LTIxLjMzMzMzMy04LjUzMzMzMy0zOC40LTEyLjgtNTkuNzMzMzMzLTEyLjgtMjUuNiAxMi44LTQ2LjkzMzMzMyAyOS44NjY2NjctNTkuNzMzMzM0IDU1LjQ2NjY2N3pNMzM4LjYwMjY2NyA3NzQuODI2NjY3Yy04LjUzMzMzMy04LjUzMzMzMy0yMS4zMzMzMzMtOC41MzMzMzMtMzQuMTMzMzM0LTQuMjY2NjY3LTEyLjggOC41MzMzMzMtMjUuNiAxNy4wNjY2NjctMzguNCAyOS44NjY2NjctMTIuOCAxNy4wNjY2NjctMjEuMzMzMzMzIDM0LjEzMzMzMy0yMS4zMzMzMzMgNDYuOTMzMzMzLTQuMjY2NjY3IDE3LjA2NjY2Ny00LjI2NjY2NyAyOS44NjY2NjcgNC4yNjY2NjcgMzguNCA4LjUzMzMzMyA4LjUzMzMzMyAyMS4zMzMzMzMgOC41MzMzMzMgMzQuMTMzMzMzIDQuMjY2NjY3IDEyLjgtNC4yNjY2NjcgMjUuNi0xNy4wNjY2NjcgMzguNC0yOS44NjY2NjcgMTIuOC0xMi44IDIxLjMzMzMzMy0yOS44NjY2NjcgMjEuMzMzMzMzLTQ2LjkzMzMzMyA0LjI2NjY2Ny0xNy4wNjY2NjcgMC0yOS44NjY2NjctNC4yNjY2NjYtMzguNHoiIGZpbGw9IiNGQ0JDNjgiIHAtaWQ9IjI1MzE5Ij48L3BhdGg+PHBhdGggZD0iTTMzOC42MDI2NjcgNzc0LjgyNjY2N2MtOC41MzMzMzMtOC41MzMzMzMtMjEuMzMzMzMzLTguNTMzMzMzLTM0LjEzMzMzNC00LjI2NjY2Ny0xMi44IDguNTMzMzMzLTI1LjYgMTcuMDY2NjY3LTM4LjQgMjkuODY2NjY3LTguNTMzMzMzIDguNTMzMzMzLTEyLjggMTcuMDY2NjY3LTE3LjA2NjY2NiAyOS44NjY2NjYgMCA4LjUzMzMzMyA0LjI2NjY2NyAxNy4wNjY2NjcgOC41MzMzMzMgMjEuMzMzMzM0IDguNTMzMzMzIDguNTMzMzMzIDE3LjA2NjY2NyA4LjUzMzMzMyAzNC4xMzMzMzMgNC4yNjY2NjYgMTIuOC04LjUzMzMzMyAyNS42LTE3LjA2NjY2NyAzOC40LTM0LjEzMzMzM2wxMi44LTI1LjZjMC04LjUzMzMzMyAwLTE3LjA2NjY2Ny00LjI2NjY2Ni0yMS4zMzMzMzN6IiBmaWxsPSIjRjdBRjQ4IiBwLWlkPSIyNTMyMCI+PC9wYXRoPjxwYXRoIGQ9Ik03NzAuMDA1MzMzIDg5MC4wMjY2NjdjMTIuOCA0LjI2NjY2NyAyNS42IDQuMjY2NjY3IDM0LjEzMzMzNC00LjI2NjY2NyA0LjI2NjY2Ny04LjUzMzMzMyA4LjUzMzMzMy0yMS4zMzMzMzMgNC4yNjY2NjYtMzguNC00LjI2NjY2Ny0xMi44LTEyLjgtMjkuODY2NjY3LTIxLjMzMzMzMy00Ni45MzMzMzMtMTIuOC0xMi44LTI1LjYtMjEuMzMzMzMzLTM4LjQtMjkuODY2NjY3LTE3LjA2NjY2Ny00LjI2NjY2Ny0yNS42LTQuMjY2NjY3LTM0LjEzMzMzMyA0LjI2NjY2N3MtOC41MzMzMzMgMjEuMzMzMzMzLTguNTMzMzM0IDM4LjRjNC4yNjY2NjcgMTcuMDY2NjY3IDEyLjggMjkuODY2NjY3IDIxLjMzMzMzNCA0Ni45MzMzMzMgMTIuOCAxMi44IDI1LjYgMjEuMzMzMzMzIDQyLjY2NjY2NiAyOS44NjY2Njd6IiBmaWxsPSIjRkNCQzY4IiBwLWlkPSIyNTMyMSI+PC9wYXRoPjxwYXRoIGQ9Ik03MjguNDA1MzMzIDg1Ni4yNzczMzNjMTIuOCAxNy4wNjY2NjcgMjUuNiAyNS42IDM4LjQgMzQuMTMzMzM0IDE3LjA2NjY2NyA0LjI2NjY2NyAyNS42IDAgMzQuMTMzMzM0LTQuMjY2NjY3IDQuMjY2NjY3LTQuMjY2NjY3IDguNTMzMzMzLTEyLjggOC41MzMzMzMtMjEuMzMzMzMzLTQuMjY2NjY3LTguNTMzMzMzLTguNTMzMzMzLTE3LjA2NjY2Ny0xNy4wNjY2NjctMjUuNi0xMi44LTE3LjA2NjY2Ny0yNS42LTI1LjYtMzguNC0yOS44NjY2NjctMTIuOC04LjUzMzMzMy0yNS42LTQuMjY2NjY3LTM0LjEzMzMzMyA0LjI2NjY2Ny00LjI2NjY2NyA0LjI2NjY2Ny00LjI2NjY2NyA4LjUzMzMzMy00LjI2NjY2NyAxNy4wNjY2NjYgNC4yNjY2NjcgMTIuOCA4LjUzMzMzMyAyMS4zMzMzMzMgMTIuOCAyNS42eiIgZmlsbD0iI0Y3QUY0OCIgcC1pZD0iMjUzMjIiPjwvcGF0aD48cGF0aCBkPSJNNTYzLjYyNjY2NyAxNzguNjAyNjY3Yy0xMDIuNCAwLTE4Ny43MzMzMzMgMzQuMTMzMzMzLTI2MC4yNjY2NjcgMTAyLjQtNzIuNTMzMzMzIDcyLjUzMzMzMy0xMTAuOTMzMzMzIDE1My42LTExMC45MzMzMzMgMjU2czM0LjEzMzMzMyAxODMuNDY2NjY3IDEwNi42NjY2NjYgMjU2Yzc2LjggNjguMjY2NjY3IDE2Mi4xMzMzMzMgMTAyLjQgMjY0LjUzMzMzNCAxMDIuNHMxODcuNzMzMzMzLTM0LjEzMzMzMyAyNjAuMjY2NjY2LTEwNi42NjY2NjdjNzIuNTMzMzMzLTY4LjI2NjY2NyAxMDYuNjY2NjY3LTE1My42IDEwNi42NjY2NjctMjU2cy0zNC4xMzMzMzMtMTgzLjQ2NjY2Ny0xMDYuNjY2NjY3LTI1NmMtNzIuNTMzMzMzLTY0LTE1Ny44NjY2NjctOTguMTMzMzMzLTI2MC4yNjY2NjYtOTguMTMzMzMzeiIgZmlsbD0iI0NDNDczQSIgcC1pZD0iMjUzMjMiPjwvcGF0aD48cGF0aCBkPSJNMjU2LjQyNjY2NyAxOTUuODRsLTIxLjMzMzMzNCAxNy4wNjY2NjcgNjguMjY2NjY3IDg5LjYgMTcuMDY2NjY3LTE3LjA2NjY2N3oiIGZpbGw9IiNFMjYyNEQiIHAtaWQ9IjI1MzI0Ij48L3BhdGg+PHBhdGggZD0iTTEzMy42NzQ2NjcgMjE0LjAxNmMtNC4yNjY2NjcgMzguNCA0LjI2NjY2NyA3Ni44IDI1LjYgMTE1LjJsMjIxLjg2NjY2Ni0xODcuNzMzMzMzYy0yMS4zMzMzMzMtMzguNC01MS4yLTU1LjQ2NjY2Ny04OS42LTU5LjczMzMzNC0zOC40LTguNTMzMzMzLTcyLjUzMzMzMyAwLTEwMi40IDI1LjYtMjkuODY2NjY3IDI5Ljg2NjY2Ny01MS4yIDY0LTU1LjQ2NjY2NiAxMDYuNjY2NjY3eiIgZmlsbD0iI0Y3QUY0OCIgcC1pZD0iMjUzMjUiPjwvcGF0aD48cGF0aCBkPSJNMTMzLjY3NDY2NyAyNDYuNDg1MzMzYzAgMjkuODY2NjY3IDguNTMzMzMzIDU1LjQ2NjY2NyAyNS42IDgxLjA2NjY2N2wxOTYuMjY2NjY2LTE2Mi4xMzMzMzNjLTIxLjMzMzMzMy0xNy4wNjY2NjctNDIuNjY2NjY3LTI1LjYtNjQtMjkuODY2NjY3LTI1LjYtOC41MzMzMzMtNTEuMi00LjI2NjY2Ny03Ni44IDQuMjY2NjY3LTIxLjMzMzMzMyA4LjUzMzMzMy0zOC40IDI1LjYtNTEuMiA0Mi42NjY2NjYtMTIuOCAyMS4zMzMzMzMtMjUuNiAzOC40LTI5Ljg2NjY2NiA2NHoiIGZpbGw9IiNGQ0JDNjgiIHAtaWQ9IjI1MzI2Ij48L3BhdGg+PHBhdGggZD0iTTc4NS40OTMzMzMgMjgxLjAwMjY2N2MtNzIuNTMzMzMzLTY4LjI2NjY2Ny0xNTcuODY2NjY3LTEwMi40LTI2MC4yNjY2NjYtMTAyLjRzLTE4Ny43MzMzMzMgMzQuMTMzMzMzLTI2MC4yNjY2NjcgMTAyLjRjLTcyLjUzMzMzMyA3Mi41MzMzMzMtMTEwLjkzMzMzMyAxNTMuNi0xMTAuOTMzMzMzIDI1NnMzNC4xMzMzMzMgMTgzLjQ2NjY2NyAxMDYuNjY2NjY2IDI1NmM3Ni44IDY4LjI2NjY2NyAxNjIuMTMzMzMzIDEwMi40IDI2NC41MzMzMzQgMTAyLjRzMTg3LjczMzMzMy0zNC4xMzMzMzMgMjYwLjI2NjY2Ni0xMDYuNjY2NjY3YzcyLjUzMzMzMy02OC4yNjY2NjcgMTA2LjY2NjY2Ny0xNTMuNiAxMDYuNjY2NjY3LTI1NnMtMzQuMTMzMzMzLTE3OS4yLTEwNi42NjY2NjctMjUxLjczMzMzM3oiIGZpbGw9IiNFMjYyNEQiIHAtaWQ9IjI1MzI3Ij48L3BhdGg+PHBhdGggZD0iTTc2NC4xNiAyNzYuNzM2Yy02OC4yNjY2NjctNjguMjY2NjY3LTE1My42LTEwMi40LTI1MS43MzMzMzMtMTAyLjRzLTE4My40NjY2NjcgMzQuMTMzMzMzLTI1MS43MzMzMzQgMTAyLjRjLTY4LjI2NjY2NyA2OC4yNjY2NjctMTA2LjY2NjY2NyAxNDkuMzMzMzMzLTEwNi42NjY2NjYgMjQ3LjQ2NjY2N3MzNC4xMzMzMzMgMTc5LjIgMTA2LjY2NjY2NiAyNDcuNDY2NjY2YzY4LjI2NjY2NyA2OC4yNjY2NjcgMTUzLjYgMTAyLjQgMjUxLjczMzMzNCAxMDIuNHMxODMuNDY2NjY3LTM0LjEzMzMzMyAyNTEuNzMzMzMzLTEwMi40YzY4LjI2NjY2Ny02OC4yNjY2NjcgMTA2LjY2NjY2Ny0xNDkuMzMzMzMzIDEwNi42NjY2NjctMjQ3LjQ2NjY2NnMtMzQuMTMzMzMzLTE3OS4yLTEwNi42NjY2NjctMjQ3LjQ2NjY2N3oiIGZpbGw9IiNGQzkzODEiIHAtaWQ9IjI1MzI4Ij48L3BhdGg+PHBhdGggZD0iTTUzMi42OTMzMzMgMjEwLjkwMTMzM2MtOTMuODY2NjY3IDAtMTc0LjkzMzMzMyAzNC4xMzMzMzMtMjM4LjkzMzMzMyA5OC4xMzMzMzQtNzIuNTMzMzMzIDY0LTEwMi40IDE0MC44LTEwMi40IDIzMC40IDAgODkuNiAzNC4xMzMzMzMgMTcwLjY2NjY2NyA5OC4xMzMzMzMgMjM0LjY2NjY2NiA2OC4yNjY2NjcgNjQgMTQ1LjA2NjY2NyA5OC4xMzMzMzMgMjM4LjkzMzMzNCA5OC4xMzMzMzQgOTMuODY2NjY3IDAgMTc0LjkzMzMzMy0zNC4xMzMzMzMgMjM4LjkzMzMzMy05OC4xMzMzMzQgNjguMjY2NjY3LTY0IDk4LjEzMzMzMy0xNDUuMDY2NjY3IDk4LjEzMzMzMy0yMzQuNjY2NjY2cy0zNC4xMzMzMzMtMTcwLjY2NjY2Ny05OC4xMzMzMzMtMjM0LjY2NjY2N2MtNjQtNjQtMTQwLjgtOTMuODY2NjY3LTIzNC42NjY2NjctOTMuODY2NjY3eiIgZmlsbD0iI0Y1N0I2MSIgcC1pZD0iMjUzMjkiPjwvcGF0aD48cGF0aCBkPSJNNTI0LjIwMjY2NyAyNDMuMmMtODUuMzMzMzMzIDAtMTUzLjYgMjkuODY2NjY3LTIxMy4zMzMzMzQgODUuMzMzMzMzcy04OS42IDEyOC04OS42IDIwOS4wNjY2NjcgMjkuODY2NjY3IDE0OS4zMzMzMzMgODkuNiAyMDkuMDY2NjY3YzU5LjczMzMzMyA1NS40NjY2NjcgMTMyLjI2NjY2NyA4NS4zMzMzMzMgMjEzLjMzMzMzNCA4NS4zMzMzMzNzMTUzLjYtMjkuODY2NjY3IDIxMy4zMzMzMzMtODUuMzMzMzMzIDg5LjYtMTI4IDg5LjYtMjA5LjA2NjY2Ny0yOS44NjY2NjctMTQ5LjMzMzMzMy04OS42LTIwOS4wNjY2NjdjLTU1LjQ2NjY2Ny01OS43MzMzMzMtMTI4LTg1LjMzMzMzMy0yMTMuMzMzMzMzLTg1LjMzMzMzM3oiIGZpbGw9IiNGM0MyODgiIHAtaWQ9IjI1MzMwIj48L3BhdGg+PHBhdGggZD0iTTUyNi4zMzYgMjYwLjQzNzMzM2MtODEuMDY2NjY3IDAtMTQ1LjA2NjY2NyAyNS42LTIwMC41MzMzMzMgODEuMDY2NjY3cy04NS4zMzMzMzMgMTE5LjQ2NjY2Ny04NS4zMzMzMzQgMTk2LjI2NjY2NyAyOS44NjY2NjcgMTQwLjggODUuMzMzMzM0IDE5MmM1NS40NjY2NjcgNTUuNDY2NjY3IDExOS40NjY2NjcgODEuMDY2NjY3IDIwMC41MzMzMzMgODEuMDY2NjY2czE0NS4wNjY2NjctMjUuNiAyMDAuNTMzMzMzLTgxLjA2NjY2NmM1NS40NjY2NjctNTUuNDY2NjY3IDgxLjA2NjY2Ny0xMTkuNDY2NjY3IDgxLjA2NjY2Ny0xOTYuMjY2NjY3cy0yNS42LTEzNi41MzMzMzMtODEuMDY2NjY3LTE5MmMtNTUuNDY2NjY3LTU1LjQ2NjY2Ny0xMjMuNzMzMzMzLTgxLjA2NjY2Ny0yMDAuNTMzMzMzLTgxLjA2NjY2N3oiIGZpbGw9IiNGRkVDQjQiIHAtaWQ9IjI1MzMxIj48L3BhdGg+PHBhdGggZD0iTTU0Ni44MTYgNTY1Ljg0NTMzM2MtNC4yNjY2NjctMTIuOC0xMi44LTIxLjMzMzMzMy0yMS4zMzMzMzMtMjUuNi0xMi44LTQuMjY2NjY3LTIxLjMzMzMzMyAwLTM0LjEzMzMzNCA0LjI2NjY2Ny04LjUzMzMzMyA0LjI2NjY2Ny0xNy4wNjY2NjcgMTIuOC0xNy4wNjY2NjYgMjUuNi00LjI2NjY2NyAxMi44LTQuMjY2NjY3IDIxLjMzMzMzMyAwIDM0LjEzMzMzMyA0LjI2NjY2NyAxMi44IDEyLjggMTcuMDY2NjY3IDI1LjYgMjEuMzMzMzM0IDguNTMzMzMzIDQuMjY2NjY3IDIxLjMzMzMzMyA0LjI2NjY2NyAyOS44NjY2NjYtNC4yNjY2NjcgOC41MzMzMzMgMCAxNy4wNjY2NjctOC41MzMzMzMgMTcuMDY2NjY3LTIxLjMzMzMzMyA0LjI2NjY2Ny0xMi44IDQuMjY2NjY3LTI1LjYgMC0zNC4xMzMzMzR6IiBmaWxsPSIjRjNDMjg4IiBwLWlkPSIyNTMzMiI+PC9wYXRoPjxwYXRoIGQ9Ik01MzEuOTI1MzMzIDU3NC41OTJjLTQuMjY2NjY3LTguNTMzMzMzLTguNTMzMzMzLTEyLjgtMTIuOC0xNy4wNjY2NjctOC41MzMzMzMgMC0xMi44IDAtMTcuMDY2NjY2IDQuMjY2NjY3LTguNTMzMzMzIDAtMTIuOCA4LjUzMzMzMy0xMi44IDEyLjgtNC4yNjY2NjcgOC41MzMzMzMgMCAxMi44IDAgMjEuMzMzMzMzczguNTMzMzMzIDEyLjggMTIuOCAxMi44YzQuMjY2NjY3IDQuMjY2NjY3IDEyLjggNC4yNjY2NjcgMTcuMDY2NjY2IDAgOC41MzMzMzMtNC4yNjY2NjcgMTIuOC04LjUzMzMzMyAxMi44LTE3LjA2NjY2NiA0LjI2NjY2Ny00LjI2NjY2NyA0LjI2NjY2Ny0xMi44IDAtMTcuMDY2NjY3eiIgZmlsbD0iI0Y0QkU0QSIgcC1pZD0iMjUzMzMiPjwvcGF0aD48cGF0aCBkPSJNNDI4LjM3MzMzMyAzNDguNTg2NjY3bC0yNS42LTEyLjgtOC41MzMzMzMgMjkuODY2NjY2IDk4LjEzMzMzMyAxODcuNzMzMzM0IDEyLjgtNC4yNjY2Njd6TTczMC4zNjggNTI0Ljg0MjY2N2wxNy4wNjY2NjctMjUuNi0yOS44NjY2NjctMTIuOC0xNzkuMiA4MS4wNjY2NjYgNC4yNjY2NjcgMTcuMDY2NjY3eiIgZmlsbD0iI0YzQzI4OCIgcC1pZD0iMjUzMzQiPjwvcGF0aD48cGF0aCBkPSJNNTU2LjQxNiA1NTAuODI2NjY3Yy04LjUzMzMzMy04LjUzMzMzMy0xMi44LTE3LjA2NjY2Ny0yNS42LTIxLjMzMzMzNC04LjUzMzMzMy00LjI2NjY2Ny0yMS4zMzMzMzMtNC4yNjY2NjctMjkuODY2NjY3IDQuMjY2NjY3LTguNTMzMzMzIDQuMjY2NjY3LTE3LjA2NjY2NyAxMi44LTIxLjMzMzMzMyAyNS42LTQuMjY2NjY3IDEyLjgtNC4yNjY2NjcgMjEuMzMzMzMzIDAgMzQuMTMzMzMzIDguNTMzMzMzIDguNTMzMzMzIDE3LjA2NjY2NyAxNy4wNjY2NjcgMjUuNiAyMS4zMzMzMzQgOC41MzMzMzMgNC4yNjY2NjcgMjEuMzMzMzMzIDQuMjY2NjY3IDI5Ljg2NjY2Ny00LjI2NjY2NyAxMi44LTQuMjY2NjY3IDE3LjA2NjY2Ny0xMi44IDIxLjMzMzMzMy0yMS4zMzMzMzMgNC4yNjY2NjctMTIuOCA0LjI2NjY2Ny0yNS42IDAtMzguNHoiIGZpbGw9IiM3QTQ2NDQiIHAtaWQ9IjI1MzM1Ij48L3BhdGg+PHBhdGggZD0iTTU0MS41MjUzMzMgNTYxLjU3ODY2N2MtNC4yNjY2NjctOC41MzMzMzMtOC41MzMzMzMtMTIuOC0xNy4wNjY2NjYtMTIuOC00LjI2NjY2Ny00LjI2NjY2Ny0xMi44LTQuMjY2NjY3LTE3LjA2NjY2NyAwLTQuMjY2NjY3IDQuMjY2NjY3LTguNTMzMzMzIDguNTMzMzMzLTEyLjggMTcuMDY2NjY2czAgMTIuOCAwIDIxLjMzMzMzNGM0LjI2NjY2NyA4LjUzMzMzMyA4LjUzMzMzMyAxMi44IDEyLjggMTIuOCA0LjI2NjY2NyA0LjI2NjY2NyAxMi44IDQuMjY2NjY3IDE3LjA2NjY2NyAwIDQuMjY2NjY3LTQuMjY2NjY3IDguNTMzMzMzLTguNTMzMzMzIDEyLjgtMTcuMDY2NjY3IDQuMjY2NjY3LTguNTMzMzMzIDQuMjY2NjY3LTE3LjA2NjY2NyA0LjI2NjY2Ni0yMS4zMzMzMzN6IiBmaWxsPSIjRkZFQ0I0IiBwLWlkPSIyNTMzNiI+PC9wYXRoPjxwYXRoIGQ9Ik00MzYuOTA2NjY3IDMzNy43OTJsLTI5Ljg2NjY2Ny0xNy4wNjY2NjctNC4yNjY2NjcgMzQuMTMzMzM0IDk4LjEzMzMzNCAxODcuNzMzMzMzIDguNTMzMzMzLTguNTMzMzMzek03MzguOTAxMzMzIDUxNC4wOTA2NjdsMTcuMDY2NjY3LTI5Ljg2NjY2Ny0yOS44NjY2NjctOC41MzMzMzMtMTc5LjIgODEuMDY2NjY2IDQuMjY2NjY3IDEyLjh6IiBmaWxsPSIjN0E0NjQ0IiBwLWlkPSIyNTMzNyI+PC9wYXRoPjxwYXRoIGQ9Ik01NDQuNzY4IDMzMy4xNDEzMzN2LTUxLjJoLTE3LjA2NjY2N2wtOC41MzMzMzMgNTEuMnpNNzQ4LjcxNDY2NyA1NzQuMzc4NjY3aDQyLjY2NjY2NnYtMTcuMDY2NjY3bC00Mi42NjY2NjYtOC41MzMzMzN6TTMxOC4zMzYgNTQ0LjM0MTMzM3YtMjUuNmwtNTkuNzMzMzMzIDguNTMzMzM0djIxLjMzMzMzM3pNNTQ0Ljc2OCA4MDAuMjEzMzMzdi01OS43MzMzMzNoLTI1LjZsOC41MzMzMzMgNTkuNzMzMzMzeiIgZmlsbD0iI0YzQzI4OCIgcC1pZD0iMjUzMzgiPjwvcGF0aD48L3N2Zz4=',
    // “修改”图标
    rewriteImg: 'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB0PSIxNzI3MTY2NTA4NDg3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ0ODkiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNOTg5IDk4NE05ODkgMTAwNiAzNSAxMDA2Yy0xNy42NzMgMC0zMi0xNC4zMjctMzItMzJzMTQuMzI3LTMyIDMyLTMybDk1NCAwYzE3LjY3MyAwIDMyIDE0LjMyNyAzMiAzMlMxMDA2LjY3MyAxMDA2IDk4OSAxMDA2ek0xOSA5NDggOTIgNzM2IDI5NyA5NDlaTTE1MCA2NjUgMzUyIDg3NCA3OTYgNDMxIDU5MiAyMjZaTTY1OSAxNDhsMjAyIDIwMiA1OC02MGMwIDAgMjItMzIgMTUtNTdTODAxIDk3IDc4NyA4M3MtNDEtMTItNzEgMTNTNjU5IDE0OCA2NTkgMTQ4eiIgZmlsbD0iIzI3MjYzNiIgcC1pZD0iNDQ5MCI+PC9wYXRoPjwvc3ZnPg=='
  },

  /**
   * 生命周期函数--监听页面加载
   * 1. 设置月份标题
   * 2. 计算1号前空缺的天数，1号是星期几
   * 3. 判断闰年
   * 4. 生成日期数字序列，包括空缺即为''
   * 5. 根据actList，生成每天的活动列表
   */
  onLoad(options) {
    var date = new Date();
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.showCalendar(date);
    this.showPoint(date);
    let {
      curyear, curmonth, curday
    } = this.data;
    this.setData({
      thisyear: curyear,
      thismonth: curmonth,
      today: curday
    })

    // showCalendar在setData前，没改变thisyear等的值，需要再判断一次
    this.judgeStar();
  },

  /**
 * 生命周期函数--监听页面显示
 */



  /**
   * 这里需要修改
   * 当从 “新建” 返回时，页面已经加载过一次，onShow调用时页数数据已经加载完毕，需要重新加载数据
   */
  onShow() {
    if (!this.data.newRemindId) return;
    let {
      actList, newRemind, newRemindId, curyear, curmonth, curday
    } = this.data;
    var temp;
    // 活动已存在
    if (newRemindId > -1) {
      newRemindId = parseInt(newRemindId);

      actList[newRemindId].title = newRemind.title;
      actList[newRemindId].beginDate = newRemind.beginDate;
      actList[newRemindId].beginTime = newRemind.beginTime;
      actList[newRemindId].endDate = newRemind.endDate;
      actList[newRemindId].endTime = newRemind.endTime;
      temp = actList[newRemindId];

      actList.splice(newRemindId, 1);
    }
    else {
      temp = {
        id: actList.length,
        title: newRemind.title,
        beginDate: newRemind.beginDate,
        beginTime: newRemind.beginTime,
        endDate: newRemind.endDate,
        endTime: newRemind.endTime,
        finish: false,
        // urlTitle: null,
        // urlid: -1
      }
    }

    var that = this;

    // 二分查找（查找修改的活动所插入的位置）
    var left = 0, right = actList.length - 1;
    var mid;
    while (left <= right) {
      mid = parseInt((left + right) / 2);
      if (newRemind.beginDate == actList[mid].beginDate && newRemind.beginTime == actList[mid].beginTime)
        break;
      if (that.compareDate(newRemind.beginDate, actList[mid].beginDate, newRemind.beginTime, actList[mid].beginTime))
        left = mid + 1;
      else right = mid - 1;
    }

    actList.splice(left, 0, temp);
    for (var i = 0; i < actList.length; i++)
      actList[i].id = i;

    this.setData({
      actList: actList,
      newRemindId: null
    })
    // console.log(actList);
    this.showCalendar(new Date(curyear, curmonth, curday));
    this.showPoint(new Date(curyear, curmonth, curday));

  },

  // 返回date1 > date2（若=，返回time1 > time2）
  compareDate(date1, date2, time1, time2) {
    var compareTime = function (time1, time2) {
      var t1 = time1.split(':').map(t => parseInt(t));
      var t2 = time2.split(':').map(t => parseInt(t));
      return t1[0] == t2[0] ? t1[1] > t2[1] : t1[0] > t2[0];
    }

    var d1 = date1.split('-').map(t => parseInt(t));
    var d2 = date2.split('-').map(t => parseInt(t));
    return d1[0] == d2[0] ? (d1[1] == d2[1] ? (d1[2] == d2[2] ? compareTime(time1, time2) : d1[2] > d2[2]) : d1[1] > d2[1]) : d1[0] > d2[0];
  },

  // 显示日历(data的month没有-1,date：当天00：00)
  showCalendar(date) {
    var year, month, frontDate, emptyDay, countDays, dayList;
    year = date.getFullYear();
    month = date.getMonth();

    // 今月的第一天是星期几
    frontDate = new Date(year, month, 1);
    emptyDay = frontDate.getDay();
    // 下个月的前一天，即本月的最后一天，在本月第几天，作为天数
    countDays = new Date(year, month + 1, 0).getDate();

    // 生成今月1号前的空白
    dayList = new Array(emptyDay).fill('');
    // 连接数字；map( (当前元素,当前索引) => 返回值 )
    dayList = dayList.concat(Array(countDays).fill(0).map((_, i) => i + 1));
    this.showAct(date);

    this.setData({
      curyear: year,
      curmonth: month,
      curday: date.getDate(),
      dayList: dayList,
      emptyDay: emptyDay
    })

    this.judgeStar();
  },

  // 显示活动(date:当天00：00)
  showAct(date) {
    let {
      actList
    } = this.data;
    var showList = [];
    for (var i = 0; i < actList.length; i++) {
      var temp = actList[i];
      if (new Date(temp.beginDate + 'T00:00:00') <= date && new Date(temp.endDate + 'T00:00:00') >= date) {
        showList.push(temp);
      }
    }
    this.setData({
      showList: showList
    })
  },

  // 显示当月日期下方的圆点，表示有活动
  showPoint(date) {
    let {
      actList
    } = this.data;
    var point = new Array(31).fill(false);
    var year = date.getFullYear();
    var month = date.getMonth();
    // 本月第一天
    var monthFront = new Date(year, month, 1);
    // 本月最后一天
    var monthTail = new Date(year, month + 1, 0);
    var begin = 0, end = 0;
    for (var i = 0; i < actList.length; i++) {
      var beginDate = new Date(actList[i].beginDate);
      var endDate = new Date(actList[i].endDate);
      var beginDay, endDay;
      if (beginDate > monthTail || endDate < monthFront)
        continue;
      if (beginDate.getMonth() < month)
        beginDay = 1;
      else beginDay = beginDate.getDate();
      if (endDate.getMonth() > month)
        endDay = monthTail.getDate();
      else endDay = endDate.getDate();
      if (beginDay > end) {
        for (var j = beginDay - 1; j < endDay; j++)
          point[j] = true;
        begin = beginDay;
        end = endDay;
        if (end == monthTail.getDate()) break;
      }
      // console.log(point);
    }

    this.setData({
      pointList: point
    })
  },

  // 点击当月的某天，数字变红色，显示当天的活动
  changeCurDay(e) {
    let {
      emptyDay, curyear, curmonth
    } = this.data;
    var index = e.currentTarget.dataset.set - emptyDay + 1;
    this.showAct(new Date(curyear, curmonth, index));
    this.setData({
      curday: index
    })
    this.judgeStar();
  },

  judgeStar() {
    let {
      curyear, curmonth, curday,
      thisyear, thismonth, today
    } = this.data;
    var index;
    if (curyear == thisyear && curmonth == thismonth && curday == today)
      index = 0;
    else index = 1;

    this.setData({
      curImgIndex: index
    })
  },

  // 修改日历展示日期(没修改一次年月，发送一次请求获取活动列表)
  changeCalendar(e) {
    var date;
    if (typeof e != 'string') {
      date = e.detail.value;
      if (date == undefined) return;
    }
    else date = e;
    date = date.split('-');
    this.setData({
      curyear: date[0],
      curmonth: parseInt(date[1]) - 1
    })

    let {
      curyear, curmonth, thisyear, thismonth, today
    } = this.data;
    if (curyear == thisyear && curmonth == thismonth) {
      date = new Date(thisyear, thismonth, today);
    }
    else
      date = new Date(curyear, curmonth, 1);
    // 修改日历
    this.showCalendar(date);
    this.showPoint(date);
  },

  changeCalendarLeft() {
    let {
      curyear, curmonth
    } = this.data;
    var date;
    if (curmonth > 0)
      date = curyear + '-' + curmonth;
    else date = (curyear - 1) + '-12';
    this.changeCalendar(date);
  },

  changeCalendarRight() {
    let {
      curyear, curmonth
    } = this.data;
    var date;
    if (curmonth < 12)
      date = curyear + '-' + (curmonth + 2);
    else date = (curyear + 1) + '-1';
    this.changeCalendar(date);
  },

  actFinish(e) {
    let {
      showList
    } = this.data;
    var index = e.currentTarget.dataset.set;
    showList[index].finish = !showList[index].finish;
    this.setData({
      showList: showList
    })
  },

  // 回到顶部
  backTop() {
    wx.pageScrollTo({
      // 页面滚动距离
      scrollTop: 0,
      // 滚动执行时间，100毫秒
      duration: 100
    })
  },

  // 显示回到顶部按钮
  onPageScroll(e) {
    // 滚动距离
    let {
      scrollTop
    } = e;
    //
    let {
      back_top,
      isTop
    } = this.data;

    // 判断当前滚动距离是否大于设定规定距离
    if (scrollTop >= back_top && !isTop) {
      // 滑动到了指定位置
      this.setData({
        isTop: true
      })
    }
    else {
      if (scrollTop <= back_top && isTop) {
        this.setData({
          isTop: false
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})