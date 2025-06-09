import request from '@/utils/request'
export const getPicCode = () => {
  // const res = await request.get('/captcha/image')
  return request.get('/captcha/image')
}

// export const getSmsCode = (captchaCode, captchaKey, mobile) => {
//   request.post('/captcha/sendSmsCaptcha', {
//     // captchaCode, captchaKey, mobile
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
