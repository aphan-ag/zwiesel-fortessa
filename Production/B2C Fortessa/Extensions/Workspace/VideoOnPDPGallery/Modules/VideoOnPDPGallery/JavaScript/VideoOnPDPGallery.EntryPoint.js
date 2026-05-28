define("VideoOnPDPGallery.EntryPoint", [
	'Item.Model',
  "ProductDetails.ImageGallery.View",
	'SC.Configuration',
  "underscore",
	'Utilities.ResizeImage'
], function VideoOnPDPGalleryEntryPoint(
	ItemModel,
  View,
	Configuration,
  _,
	ResizeImage
) {
  "use strict";

	_.extend(ItemModel.prototype, {
		getImages: _.wrap(ItemModel.prototype.getImages, function getImagesWrapper(fn) {
			var images = fn.apply(this, _.toArray(arguments).slice(1));
			try {
				var video = this.get('custitem_video');
				if (video) {
					var videoPosition = Configuration.get('VideoOnPDPGallery.position');
					if (!videoPosition) {
						videoPosition = images.length || 0;
					} else if (parseInt(videoPosition) > images.length) {
						videoPosition = images.length;
					} else {
						videoPosition = parseInt(videoPosition);
					}
					var videoObject = {
						video: video
					};
					if (videoPosition >= images.length) {
						images.push(videoObject);
					} else {
						images.splice(videoPosition, 0, videoObject);
					}
				}
			} catch (exc) {
				console.log('There was an error while adding the video to the item image gallery.\n\n' + exc);
			}
			return images;
		})
	});

  return _.extend(View.prototype, {
		buildSliderPager: function buildSliderPager(slideIndex) {
			var image = this.images[slideIndex];
			if (image.video) {
				return (
					'<div class="video-thumbnail"><i></i></div>'
				);
			} else if (image) {
				return (
					'<img src="' +
					ResizeImage(image.url, 'tinythumb') +
					'" alt="' +
					image.altimagetext +
					'">'
				);
			}
    }
  });
});
