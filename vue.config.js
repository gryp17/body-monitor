module.exports = {
	css: {
		loaderOptions: {
			sass: {
				//imports the provided scss files globally (in every vue component)
				//so you don't have to import them manually
				prependData: `
					@import '@/assets/css/_global.scss';
				`
			}
		}
	},
	devServer: {
		hot: false,
		liveReload: false
	}
};
