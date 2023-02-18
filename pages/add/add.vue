<template>
	<view class="add">
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
				imageValue:[],
				picUrls: [],
				formValue: {
					title: "",
					author: "",
					content: ""
				}
			};
		},

		methods: {
			//图片上传成功
			uploadSuccess(e) {
				this.picUrls = e.tempFilePaths
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
			onSubmit(e) {
				let value = e.detail.value
				uniCloud.callFunction({
					name: 'art_add_row',
					data:
					{
						value,
						picUrl: this.picUrls
					}
				}).then((res) => {
					uni.showToast({
						title: "提交成功"
					})
					setTimeout(() => {
						uni.reLaunch({
							url: "/pages/index/index"
						})
					}, 800)

				})
			}
		}
	}
</script>

<style lang="scss" scoped >
	.add {
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
