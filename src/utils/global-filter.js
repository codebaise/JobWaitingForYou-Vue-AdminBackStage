import Vue from 'vue'

Vue.filter("minExperienceFilter", minExperience =>{
  const experienceRule = {
    0: '1年以内',
    1: '1-3年',
    2: '3-5年',
    3: '5-10年',
    4: '10年以上'
  }
  return experienceRule[minExperience]
})
Vue.filter("minEducationFilter", education => {
  const educationRule = {
    0: '不限',
    1: '初中及以下',
    2: '中专/中技',
    3: '高中',
    4: '大专',
    5: '本科',
    6: '硕士',
    7: '博士'
  }
  return educationRule[education]
})
