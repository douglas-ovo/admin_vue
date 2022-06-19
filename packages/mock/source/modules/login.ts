export default {
    url: '/login.json',
    method: 'post',
    response(option: any) {
        const newUserinfo = JSON.parse(localStorage.getItem('newuserinfo') as string)
        let un, pw
        if (newUserinfo) {
            un = option.body.username === newUserinfo.username
            pw = option.body.password === newUserinfo.password
        } else {
            un = option.body.username === 'admin'
            pw = option.body.password === '123123'
        }

        return {
            status: un && pw ? 1 : 2,
            message: un && pw ? '登录成功' : '登录失败，请检查密码或账号是否正确'
        }
    }
}