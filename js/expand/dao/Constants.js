/* eslint-disable prettier/prettier */
/**
 * 全局常量类
 */
export default {
  // url: 'http://192.168.31.211:9001/api/v1/',
  url: 'http://10.119.109.101:9001/api/v1/',
  // url: 'http://10.118.197.123:9001/api/v1/',

  apiDoc: 'https://api.devio.org/uapi/swagger-ui.html#',
  login: {
    api: 'login',
  },
  userInfo: {
    api: 'sys-user/userInfo',
  },
  flowLeave: {
    api: 'sys-flow/leave/add',
  },
  flowCancel: {
    api: 'sys-flow/cancel/add',
  },
  flowOverTime: {
    api: 'sys-flow/overtime/add',
  },
  flowWorkTime: {
    api: 'sys-flow/workTime/add',
  },
  check: {
    api: 'sys-check/add',
  },
  unsafeUpload: {
    api: 'sys-upload-unsafe/uploadUnsafe',
  },
  flowLeaveList: {
    apiLeave: 'sys-flow/leave/list',
  },
  flowOverList: {
    apiOver: 'sys-flow/overtime/list',
  },
  flowCancelList: {
    apiCancel: 'sys-flow/cancel/list',
  },
  flowWorkList: {
    apiWork: 'sys-flow/workTime/list',
  },
  flowApprovel: {
    api: 'sys-flow/approval/info',
  },
  examList: {
    listApi: 'sys-exam/list',
  },
  examHistory: {
    historyApi: 'sys-exam/user/listHistory',
  },
  examInfo: {
    api: 'sys-exam/info',
  },
  unSafeList: {
    api: 'sys-upload-unsafe/list',
  },
  examEmpty: {
    api: 'sys-exam/user/listEmpty',
  },
  submitExam: {
    api: 'sys-exam/user/submit',
  },
  addUserStudy: {
    api: 'sys-user-study/add',
  },
  getStandard: {
    api: 'sys-check/getStandard',
  },
  getStudyStatistic: {
    api: 'statistic/studyData',
  },
  getCheckStatistic: {
    indexApi: 'statistic/myIndex',
    recordsApi: 'statistic/DividedData',
  },
  checkList: {
    api: 'sys-check/list',
  },
  forCancelList: {
    api: 'sys-flow/leave/listForCancel',
  },
};
