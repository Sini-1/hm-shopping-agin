import request from '@/utils/request'
export const getPicCode = () => {
  // const res = await request.get('/captcha/image')
  return request.get('/captcha/image')
}
