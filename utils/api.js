var baseUrl = "http://tingapi.ting.baidu.com/v1/restserver/ting"

var apiMethod = {
	search: 'baidu.ting.search.catalogSug',
	detail: 'baidu.ting.song.play',
	lrc: 'baidu.ting.song.lry',
	recommand: 'baidu.ting.song.getRecommandSongList',
	download: 'baidu.ting.song.downWeb',
	list: 'baidu.ting.billboard.billList'
}

var query = option => ({
	formate: 'json'
})

var request = data => new Promise((resolve, reject) => {
	wx.request({
		url: baseUrl,
		data: data,
		success: (res) => {
			resolve(res.data);
		},
		fail: err => {
			reject(err)
		}
	})
})

var search = keyword => request({
	method: apiMethod['search'],
	query: keyword
})

// type = 1-新歌榜,2-热歌榜,11-摇滚榜,12-爵士,16-流行,21-欧美金曲榜,22-经典老歌榜,23-情歌对唱榜,24-影视金曲榜,25-网络歌曲榜
var getOnline = (type, paged) => {
	var limit = 12;
	return request({
		method: apiMethod['list'],
		type: type,
		offset: limit * paged,
		size: limit
	})
}

module.exports = {
	getOnline,
	search,
	request,
	apiMethod
}