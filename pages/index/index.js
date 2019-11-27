const newsVac = {
  '国内': 'gn',
  '国际': 'gj',
  '财经': 'cj',
  '娱乐': 'yl',
  '军事': 'js',
  '体育': 'ty',
  '其他': 'other',
}

Page({
      data: {
        list: ['国内', '国际', '财经', '娱乐', '军事', '体育', '其他'],
        news: {},
        allnews:[],
        id: [],
        nowResult_title: '',
        nowResult_date: '',
        nowResult_firstImage: '',
        nowResult_id: '',
        nowResult_source: '',
        newsType: 'gn',
        result_date: '',
        result_firstImage: '',
        result_id: '',
        result_source: '',
        result_title: '',

      },

      onPullDownRefresh() {
        //console.log("refresh executed!")
        this.getNow(this.data.newsType,() => {
          wx.stopPullDownRefresh()
        })
      },

      onTapNewslist(e) {
        wx.showToast({
          title: 'reloading',
        })
        let newsType = newsVac[e.currentTarget.id]
        this.getNow(newsType)
        this.setData({
          newsType: newsType,
        })
      },
  onTapDetails(e){
    wx.navigateTo({
      url: '/pages/list/list'
    })
  },

      onLoad() {
        this.getNow(newsVac['国内'], '')
      },

      getNow(type, callback) {
        wx.request({
            url: 'https://test-miniprogram.com/api/news/list',
            data: {
              type: type
            },
            success: res => {
              let result = res.data.result
              //console.log('显示e', result)
              let result_date = res.data.result[0].date
              let result_firstImage = res.data.result[0].firstImage
              let result_id = res.data.result[0].id
              let result_source = res.data.result[0].source
              let result_title = res.data.result[0].title
              let allnews = []
              for (let i = 1; i < result.length; i++) {
                allnews.push({
                  id: result[i].id,
                  allnewsTitle: result[i].title,
                  allnewsImage: result[i].firstImage,
                  allnewsSource: result[i].source,
                  allnewsDate: result[i].date
                })
              }this.setData({
                nowResult_title: result_title,
                nowResult_source: result_source,
                nowResult_date: result_date,
                nowResult_firstImage: result_firstImage,
                allnews: allnews,
              })

              },
              complete: () => {
                callback && callback()
              }
            
            /*onTapNewslist(e) {
              //wx.showToast()
              let id = e.currentTarget.id
              //console.log('显示e', e)
              console.log('显示id', id)
              let newsType = newsVac[e.currentTarget.id]
              console.log('显示newsType', newsType)
              }
              */
          })
        }
      })