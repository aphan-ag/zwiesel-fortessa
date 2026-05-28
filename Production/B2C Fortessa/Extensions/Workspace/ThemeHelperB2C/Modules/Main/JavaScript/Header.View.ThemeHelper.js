define('Header.View.ThemeHelper', [
    'header_theme_helper.tpl',
	'Header.View',
    'underscore'
], function HeaderViewThemeHelper(
    HeaderTpl,
    HeaderView,
    _
) {
	'use strict';

    return _.extend(HeaderView.prototype, {
        template: HeaderTpl,

        getContext: _.wrap(HeaderView.prototype.getContext, function getContext(fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            var config = this.application.getComponent('Environment').getConfig('themeHelper');
            
            context.headerBannerTitle = config.headerBannerTitle;
            context.headerBannerNavItems = config.headerBannerNavItems;
            
            return context;
        })
    });
});
