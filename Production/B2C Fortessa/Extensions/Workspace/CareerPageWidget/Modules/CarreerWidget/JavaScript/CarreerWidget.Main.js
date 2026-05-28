define('CarreerWidget.Main', [
	'jQuery'
], function (
	jQuery
) {
	'use strict';
	var scriptId = "smartrecruiters-widget-script";
	function onScriptLoaded() {
		try{
          if (widget) {
			widget({
				"company_code": "ZwieselFortessaAmericasLLC",
				"departments_field_id": "58b7e93de4b0885c92cda0d0",
				"jobAdType": "PUBLIC",
				"api_url": "https://www.smartrecruiters.com",
				"custom_css_url": "https://static.smartrecruiters.com/job-widget/1.8.5/css/smart_widget.css",
				"job_ad_url": "https://jobs.smartrecruiters.com",
				"bg_color_even_row": "#e0e0e0",
				"bg_color_headers": "#969696",
				"bg_color_links": "#55dd88",
				"bg_color_odd_row": "#f7f7f7",
				"bg_color_widget": "#ffffff",
				"txt_color_headers": "#292929",
				"txt_color_job": "#3d3d3d",
				"auto_height": "auto",
				"auto_width": "auto",
				"job_title": "true",
				"location": "true",
				"type_of_employment": "false",
				"department": "false",
				"published_since": "false",
				"remove_headers": "false",
				"add_search": "false"
			},'smartrecruiters-widget');
		}
        }catch(e){
          
        }
	}
	return  {
		addScript: function addScript() {
			if (document.getElementById(scriptId)){
              onScriptLoaded();
              return;
            }

			const script = document.createElement("script");
			script.id = scriptId;
			script.src = "https://static.smartrecruiters.com/job-widget/1.8.5/script/smart_widget.js";
			script.async = true;

			script.onload = onScriptLoaded;
			script.onerror = () => {
			console.error("Error al cargar el script");
			};

			document.body.appendChild(script);
		},

		removeScript: function removeScript() {
			const script = document.getElementById(scriptId);
			if (script) {
			script.remove();
			}
 		},
		mountToApp: function mountToApp (container)
		{
			var self = this;
            
			Backbone.on('job_widget_loaded',function(){
				self.addScript();
			})
		}
	};
});
