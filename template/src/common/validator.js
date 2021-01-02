
export const Validator = {
	/*手机号码格式校验正则*/
	PHONEREG: /^(13[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9]|14[0-9])[0-9]{8}$/,

	/*同时包含字母和数字*/
	ISNUMANDLETTERS: /^[a-zA-Z0-9]+$/,

	/*特殊字符正则*/
	SPECIALLETTER:new RegExp("[`~!@#$^&*=|{}':;',\\[\\]<>?~！@#￥……&*——|{}【】‘；：”“'。，、？ ]"),
	
	/*邮箱地址格式正则*/
	//EMAILREG:/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
	EMAILREG:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
	
	/*判断是否为中文*/
	ISCHINESE:/^[\u0391-\uFFE5]+$/,
	
	/*判断是否为英文字母*/
	ISENGLISH:/^[a-zA-Z]+$/, 
	
	/*是否包含空格*/
	ISHAVENULL:/^[^\s]*$/,
	
	/*保留两位小数*/
	TWODECIMAL: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
	
	/*判断是否为正整数*/
	ISDECIMAL:/^[0-9]*$/,
	
	/**
	 * 账号管理-手机号码校验
	 */
	checkPhoneNumber:function(str){
		return Validator.PHONEREG.test(str);
	}
	
};
