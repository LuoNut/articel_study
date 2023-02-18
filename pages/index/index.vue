<template>
	<view class="content">
		<view class="article">
			<view @click="toDetail(item._id)" class="item" v-for="item in dataArr" :key="item.id">
				<view class="text">
					<view class="title">
						{{item.title}}
					</view>
					<view class="info">
						<text>{{item.author}}</text>
						<text><uni-dateformat :date="item.posttime" format="MM-dd" :threshold="[60000, 3600000]" ></uni-dateformat></text>
					</view>
				</view>
				<view class="pic">
					<image v-if="item.picUrl && item.picUrl.length" :src="item.picUrl[0]" mode="aspectFill"></image>
					<image v-else src="/static/image/mmexport1658408767749.jpg" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view class="goAdd" @click="toAdd">
			<uni-icons type="compose" size="30" color="#fff"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataArr: []
			}
		},
		onLoad() {
			this.getArticleData()
		},
		//上滑触底
		onReachBottom() {
			this.getArticleData()
		},
		//下拉刷新
		onPullDownRefresh() {
			this.dataArr = [] 
			this.getArticleData()
		},
		methods: {
			//跳转至详情页
			toDetail(e) {
				uni.navigateTo({
					url: '/pages/detail/detail?id='+ e
				})
			},
			//获取文章数据
			getArticleData() {
				uniCloud.callFunction({
					name: 'art_get_data',
					data: {
						skip: this.dataArr.length
					}
				}).then((res) => {
					this.dataArr = [...this.dataArr, ...res.result.data]
					uni.stopPullDownRefresh()
				})
			},
			//跳转至新增页
			toAdd() {
				Date.now()
				uni.navigateTo({
					url: '/pages/add/add'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.article {
		padding: 20rpx;
		.item {
			display: flex;
			padding: 20rpx 0;
			.text {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding-right: 30rpx;

				.title {
					font-size: 40rpx;
					text-align: justify;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}

				.info {
					color: #666;
					font-size: 26rpx;

					text {
						margin-right: 20rpx;
					}
				}
			}

			.pic {
				image {
					width: 260rpx;
					height: 150rpx;
				}
			}
		}
	}

	.goAdd {
		position: fixed;
		right: 60rpx;
		bottom: 60rpx;
		width: 100rpx;
		height: 100rpx;
		background-color: #1ba035;
		color: #fff;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 60rpx;
	}
</style>
