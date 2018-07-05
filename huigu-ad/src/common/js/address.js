//接口地址
var basePath = '',
    articleDetail = basePath + '/huiguapi/article/news/detail',  //新闻
    queryListUrl = basePath + '/huiguapi/interaction/comment/queryList', //评论
    collectDelete = basePath + '/huiguapi/interaction/collect/delete', //取消收藏
    collectSave = basePath + '/huiguapi/interaction/collect/save', //收藏
    praiseAddData = basePath + '/huiguapi/interaction/praise/add', //点赞
    querySingle = basePath + '/huiguapi/interaction/comment/querySingle', //新增评论
    praiseQueryList = basePath + '/huiguapi/interaction/pushCommentPraise/queryList', //点赞通知列表
    getDoctorUserDetail = basePath + '/huiguapi/doctorUser/getDoctorUserDetail', //获取医生信息
    questionnaireService = basePath + '/huiguapi/questionnaire/addQuestionnaireService'; //帮扶申请表
    doctorHomeService = basePath + '/huiguapi/doctorShare/getDoctorHomePage'; // 医生个人主页
    queryProductionService = basePath + '/huiguapi/doctorShare/queryProduction'; //医生主页及专家团队主页的作品
    doctorStudioSpecificService = basePath + '/huiguapi/doctorShare/getWorkingGroupDetail'; //专家团队主页
    getSerceGroupPageService = basePath + '/huiguapi/doctorShare/queryGroup'; //分享专家团队交流群
    getPushRecord = basePath + '/huiguapi/userHome/getPushRecord'; //获取小助手推送资讯的消息
    getDoctorUserService = basePath + '/huiguapi/doctorShare/getDoctorUserDetail'; //获取医生名片信息

//新增
var apiPath = '/huiguapi';
var huiguPostUrl = {
    cooperationApply : basePath + apiPath + '/departmentBuildOrder/apply', //学科共建
    cooperationOrder : basePath + apiPath + '/departmentBuildOrder/detail', //学科共建预约单
    conferenceList : basePath + apiPath + '/conference/queryConferenceList', //学术会议列表
    conferenceDetail : basePath + apiPath + '/conference/queryConference', //学术会议详情
    conferencetoApply : basePath + apiPath + '/conference/toAppoint', //学术会议默认值
    conferenceApply : basePath + apiPath + '/conference/appoint', //学术会议申请
    conferenceOrder : basePath + apiPath + '/conference/showConferenceOrder',
    getOperationOrder: basePath + apiPath + '/opsAppointmentOrder/detail', //手术快约-预约单
    getOperationApply: basePath + apiPath + '/opsAppointmentOrder/apply', //手术快约-申请
    getUploadImg: basePath + apiPath + '/doctorHomePage/singleUploadReize', //手术快约-上传图片


    /*慧骨2.0新增 */
    getServiceApply: basePath + apiPath + '/service/apply', //服务开通申请
    getServiceResult: basePath + apiPath + '/service/select', //服务开通查询订单
    getShowPrepare: basePath + apiPath + '/opsAppointmentOrder/showPrepare', //查看术前准备
    getOperationDetail: basePath + apiPath + '/opsAppointmentOrder/detail', //手术快约订单详情-专家团队
    getTrainDetail: basePath + apiPath + '/train/detail', //技术培训，专家坐诊订单详情-专家团队
    getOrderList: basePath + apiPath + '/order/showOrders', //订单列表  不区分医生还是专家团队
    getQueryJourney: basePath + apiPath + '/doctorUser/queryJourneyByType', //我的行程、历史行程
    getInsuranceDetail: basePath + apiPath + '/doctorUser/queryInsuranceDetail', //我的保单

}
