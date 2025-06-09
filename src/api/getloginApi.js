import request from '@/utils/request'
export const getPicCode = () => {
  // const res = await request.get('/captcha/image')
  return request.get('/captcha/image')
}

// export const getSmsCode = (captchaCode, captchaKey, mobile) => {
//   request.post('/captcha/sendSmsCaptcha', {
//     form: {
//       captchaCode,
//       captchaKey,
//       mobile
//     }
//   })
// }
export const getSmsCode = (obj) => {
  request.post('/captcha/sendSmsCaptcha', {
    from: {
      captchaCode: obj.chuanPicCode,
      captchaKey: obj.chuanPicKey,
      mobile: obj.chuanMobile
    }
  })
}

export const codeLogin = (mobile, msgCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      // mobile: mobile,
      mobile,
      partyData: {},
      smsCode: msgCode
    }
  })
}
