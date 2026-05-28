{{!-- Edited for Threads Theme --}}

<div data-view="Global.BackToTop"></div>
<div class="footer-content">



    <section class="footer-content-upper-section-container">
        <div class="footer-content-upper-section">
          {{#if extraFooterViewContext.showLegacyNewsletter}}
            {{#if extraFooterViewContext.title}}
              <p class="footer-content-upper-section-title">{{extraFooterViewContext.title}}</p>
            {{/if}}
            <div data-view="FooterContent" class="footer-content-newsletter-container"></div>
          {{else}}
            <div class="newsletter-cct-area" data-cms-area="newsletter-cct-area" data-cms-area-filters="global"></div>
          {{/if}}
        </div>
    </section>
		<div data-cms-area="page_banner_footer" data-cms-area-filters="path"></div>
    <div id="banner-footer" class="content-banner banner-footer find-fortessa-footer" data-cms-area="global_banner_footer" data-cms-area-filters="global">
        <!--<div class="find-fortessa-footer_title">
            <h3>#FINDING<span>FORTESSSA</span></h3>
            <p>The difference between a meal and an experience</p>
            <a href="" class="btn button-primary">Show Me</a>
        </div>-->
        <!--<div class="find-fortessa-footer_info">
            <div class="container">
                <div class="row">
                    <div class="col-sm-4">
                        <p class="title">FREE SHIPPING</p>
                        <p>Free shipping on all US orders above $75</p>
                    </div>
                    <div class="col-sm-4">
                        <p class="title">30 DAY RETURN</p>
                        <p>Return within 30 days of shipping date</p>
                    </div>
                    <div class="col-sm-4">
                        <p class="title">WHOLESALE PRICING</p>
                        <p>Sing in to the Business account to receive commercial pricing <a href="">Learn more</a></p>
                    </div>
                </div>
            </div>
        </div>-->
    </div>
    <section class="footer-content-middle-section-container">
        <div class="footer-content-middle-section">
            {{#if extraFooterViewContext.socialMediaLinks}}
                <div class="footer-content-social">
                    <div class="footer-logo-view-container" data-view="Footer.Logo.View"></div>
                    <ul class="footer-content-social-list">
                    {{#if extraFooterViewContext.socialMediaLinksTitle}}<li class="footer-content-social-media-links-title">{{extraFooterViewContext.socialMediaLinksTitle}}</li>{{/if}}
                    {{#each extraFooterViewContext.socialMediaLinks}}
                        <li><a {{objectToAtrributes item}} data-hashtag="{{datahashtag}}" data-touchpoint="{{datatouchpoint}}" data-target="{{datatarget}}" class="footer-content-social-link" target="_blank" aria-label="{{text}}">{{#if icon}}<i class="footer-content-social-icon icon-{{icon}}"></i>{{else}}{{text}}{{/if}}<span class="invisible">Social Media Icon {{icon}}</span></a></li>
                    {{/each}}
                    </ul>
                </div>
	        {{/if}}

            <div class="footer-columns">
                {{#if extraFooterViewContext.col1Links}}
                <div class="footer-column-links">
                    <ul>
                    {{#each extraFooterViewContext.col1Links}}
                    {{#if @first}}
                    <li class="footer-column-heading-listitem"><h2 class="footer-column-heading">{{text}}</h2></li>
                    {{else}}
                    {{#if href}}
                        <li class="footer-column-link-listitem"><a class="footer-column-link" {{objectToAtrributes item}} data-hashtag="{{datahashtag}}" data-touchpoint="{{datatouchpoint}}" data-target="{{datatarget}}">{{text}}</a></li>
                    {{else}}
                        <li class="footer-column-heading-listitem"><p class="footer-column-text">{{text}}</p></li>
                    {{/if}}
                    {{/if}}
                    {{/each}}
                    </ul>
                </div>
                {{/if}}
                {{#if extraFooterViewContext.col2Links}}
                <div class="footer-column-links">
                    <ul>
                    {{#each extraFooterViewContext.col2Links}}
                    {{#if @first}}
                    <li class="footer-column-heading-listitem"><h2 class="footer-column-heading">{{text}}</h2></li>
                    {{else}}
                    {{#if href}}
                        <li class="footer-column-link-listitem"><a class="footer-column-link" {{objectToAtrributes item}} data-hashtag="{{datahashtag}}" data-touchpoint="{{datatouchpoint}}" data-target="{{datatarget}}">{{text}}</a></li>
                    {{else}}
                        <li class="footer-column-heading-listitem"><p class="footer-column-text">{{text}}</p></li>
                    {{/if}}
                    {{/if}}
                    {{/each}}
                    </ul>
                </div>
                {{/if}}
                {{#if extraFooterViewContext.col3Links}}
                <div class="footer-column-links">
                    <ul>
                    {{#each extraFooterViewContext.col3Links}}
                    {{#if @first}}
                    <li class="footer-column-heading-listitem"><h3 class="footer-column-heading">{{text}}</h3></li>
                    {{else}}
                    {{#if href}}
                        <li class="footer-column-link-listitem"><a class="footer-column-link" {{objectToAtrributes item}} data-hashtag="{{datahashtag}}" data-touchpoint="{{datatouchpoint}}" data-target="{{datatarget}}">{{text}}</a></li>
                    {{else}}
                        <li class="footer-column-heading-listitem"><p class="footer-column-text">{{text}}</p></li>
                    {{/if}}
                    {{/if}}
                    {{/each}}
                    </ul>
                </div>
                {{/if}}
                {{#if extraFooterViewContext.col4Links}}
                <div class="footer-column-links">
                    <ul>
                    {{#each extraFooterViewContext.col4Links}}
                    {{#if @first}}
                    <li class="footer-column-heading-listitem"><h4 class="footer-column-heading">{{text}}</h4></li>
                    {{else}}
                    {{#if href}}
                        <li class="footer-column-link-listitem"><a class="footer-column-link" {{objectToAtrributes item}} data-hashtag="{{datahashtag}}" data-touchpoint="{{datatouchpoint}}" data-target="{{datatarget}}">{{text}}</a></li>
                    {{else}}
                        <li class="footer-column-heading-listitem"><p class="footer-column-text">{{text}}</p></li>
                    {{/if}}
                    {{/if}}
                    {{/each}}
                    </ul>
                </div>
                {{/if}}
            </div>
        </div>
    </section>

    {{#with extraFooterViewContext.copyright}}
    {{#unless hide}}
        <section class="footer-content-bottom-section-container">
            <div class="footer-content-bottom-section">
                <div class="footer-content-copyright">
                    {{#if showRange}}
                        {{translate '&copy; $(0) &#8211; $(1) $(2)' initialYear currentYear companyName}}
                        <!-- an en dash &#8211; is used to indicate a range of values -->
                    {{else}}
                        {{translate '&copy; $(0) $(1)' currentYear companyName}}
                    {{/if}}
                </div>
            </div>
        </section>
    {{/unless}}
    {{/with}}
</div>



{{!----
Use the following context variables when customizing this template:

	showFooterNavigationLinks (Boolean)
	footerNavigationLinks (Array)

----}}
