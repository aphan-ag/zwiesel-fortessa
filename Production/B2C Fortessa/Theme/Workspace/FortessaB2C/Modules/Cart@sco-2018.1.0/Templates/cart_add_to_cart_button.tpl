{{!-- Edited for Threads Theme --}}

{{#if isCurrentItemPurchasable}}
  <div class="cart-add-to-cart-button-container">
    <div class="cart-add-to-cart-button">
      <button type="submit" data-type="add-to-cart" data-action="sticky" class="cart-add-to-cart-button-button">
        {{#if isUpdate}}{{translate 'Update'}}{{else}}{{translate 'Add to Cart'}}{{/if}}
      </button />
    </div>
  </div>
{{else}}
  <div class="product-line-stock" style="padding: 15px">
    <p class="product-line-stock-msg-out">
      <span class="product-line-stock-icon-out"><i></i></span>
      <span class="product-line-stock-msg-out-text">Out of Stock</span>
    </p>
  </div>
{{/if}}



{{!----
Use the following context variables when customizing this template: 
	
	isCurrentItemPurchasable (Boolean)
	isUpdate (Boolean)

----}}
