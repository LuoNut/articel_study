<template>
	<view class="edit">
		<form @submit="onSubmit">
			<view class="item" >
				<input v-model="formValue.title" type="text" name="title" placeholder="请输入标题" >
			</view>
			<view class="item">
				<input v-model="formValue.author" type="text" name="author" placeholder="请输入作者" >
			</view>
			<view class="item">
				<textarea v-model="formValue.content" name="content" placeholder="" placeholder="请输入内容" />
			</view>
			<uni-file-picker
				v-model="imageValue" 
				fileMediatype="image" 
				mode="grid"  
				@success="uploadSuccess" 
			/>
			<view class="item">
				<button form-type="reset">重置</button>
				<button form-type="submit" type="primary" :disabled="isDisable(formValue)">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageValue: [],
				picUrls: [],
				id: '',
				formValue: {
					title: "",
					author: "",
					content: ""
				}
			};
		},
		onLoad(e) {
			this.id = e.id
			this.getArtData()
		},
		methods: {
			//图片修改上传成功
			uploadSuccess() {
				this.picUrls = this.imageValue.map((item) => {
					return item.url
				})
				
			},
			//获取需要修改的文章数据
			getArtData() {
				uniCloud.callFunction({
					name: 'art_get_row',
					data: {
						id: this.id
					}
				}).then((res) => {
					this.formValue = res.result.data[0]
					if(!res.result.data[0].picUrl) return
					this.imageValue = res.result.data[0].picUrl.map(item => {
						return {url: item}
					})
				})
			},
			//前端表单验证
			isDisable(obj) {
				for (let key in obj) {
					if (!obj[key]) {
						return true
					}
				}
			},
			//提交表单
			onSubmit() {
				uniCloud.callFunction({
					name: 'art_updata_row',
					data:
					{
						value:this.formValue,
						picUrl: this.picUrls
					}
				}).then((res) => {
					uni.showToast({
						title: "修改成功",
						mask:true
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 800)

				})
			}
		}
	}
</script>

<style lang="scss" scoped >
	.edit {
		padding: 20rpx;
		.item {
			margin-bottom: 20rpx;
			input,textarea {
				padding: 10rpx;
				height: 60rpx;
				border: 2rpx solid #ccc;
			}
			textarea {
				
				width: 100%;
				height: 150rpx;
			}
		}
	}
</style>
