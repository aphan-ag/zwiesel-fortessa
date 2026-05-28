{{!-- Edited for Threads Theme --}}

<form class="newsletter-suscription-form" data-action="newsletter-subscribe" novalidate>

	<div data-validation="control-group">

		<!-- <h5 class="newsletter-subscription-form-label" for="login-email">{{translate 'Sign Up for Our Newsletter'}}</h5> -->

		<div class="newsletter-subscription-form-container {{#if showErrorMessage}}error{{/if}}" data-validation="control">
			<!--label for="email" class="invisible">Email</label-->
			<input
				name="email"
				id="email"
				type="email"
				class="newsletter-suscription-form-input"
				title="Email"
				placeholder="{{translate 'username@domain.com'}}"
			>

            <input type="text" class="extraField" id="extraField" style="display:none !important" tabindex="-1" autocomplete="off">

			<button type="submit" class="newsletter-subscription-form-button-subscribe">
				{{translate 'Subscribe'}}
			</button>

			<div class="newsletter-alert-placeholder" data-type="alert-placeholder" >
				{{#if isFeedback}}
				<div data-view="GlobalMessageFeedback"></div>
				{{/if}}
			</div>
		</div>
	</div>
</form>



{{!----
Use the following context variables when customizing this template: 
	
	isFeedback (Boolean)
	model (Object)

----}}
