<template>
	<view class="container">
		<view v-if="loadState">
			<view class="title">
				{{detailData.title}}
			</view>
			<view class="info">
				<text>{{detailData.author}}</text>
				<text><uni-dateformat :date="detailData.posttime" :threshold="[60000, 3600000]"></uni-dateformat></text>
			</view>
			<view class="content">
				{{detailData.content}}
			</view>
			<view class="img">
				<image :src="item" v-for="item in detailData.picUrl" mode="widthFix"></image>
			</view>
			<view class="btn">
				<button size="mini" @click="toEdit" >修改</button>
				<button size="mini" type="warn" @click="onRemove" >删除</button>
			</view>
		</view>
		<view v-else>
			<uni-load-more status="loading"></uni-load-more>
		</view>
	</view>
</template>

<script>
	let id
	export default {
		data() {
			return {
				detailData: {},
				loadState: false
			};
		},
		onLoad(e) {
			id = e.id
		},
		onShow() {
			this.getDetail()
		},
		methods: {
			//点击删除按钮
			onRemove() {
				uni.showModal({
					content:"是否确认删除",
					success: (res) => {
						if(res.confirm) {
							this.removeArticle()
						}
					}
				})
			},
			//删除文章的功能函数
			removeArticle() {
				uniCloud.callFunction({
					name: 'art_remove_row',
					data: {
						id: this.detailData._id
					}
				}).then((res) => {
					uni.showToast({
						title:"删除成功",
						icon:"success"
					})
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/index/index'
						})
					}, 800)

				})
			},
			//获取详情页数据
			getDetail() {
				uniCloud.callFunction({
					name: 'art_get_row',
					data:{
						id
					}
				}).then((res) => {
					this.detailData = res.result.data[0]
					uni.setNavigationBarTitle({
						title: this.detailData.title,
					})
					this.loadState = true
				}).catch(() => {
					uni.showToast({
						title: "参数错误"
					})
					uni.reLaunch({
						url: '/pages/index/index'
					})
				})
			},
			//跳转至修改页
			toEdit() {
				uni.navigateTo({
					url: '/pages/edit/edit?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 20rpx;
		text-align: justify;
		.img {
			padding-top: 30rpx;
			image {
				width: 100%;
				display: block;
				margin-bottom: 10rpx;
			}
		}
		.title {
			font-size: 50rpx;
		}
		.info {
			font-size: 26rpx;
			margin: 30rpx 0;
			color: #888;
			text {
				margin: 0 20rpx;
			}
		}
		.content {
			font-size: 28rpx;
			line-height: 45rpx;
		}
		.btn {
			button {
				margin: 20rpx;
			}
		}
	}
</style>
