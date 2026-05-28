
<!-- 
<input id="Isearcher" data-type="search-input" class="itemssearcher-input typeahead"
	placeholder="{{placeholderLabel}}"
	type="search" autocomplete="off" title="Search"
	{{#if showId}} id="{{id}}" {{/if}} {{#if showName}} name="{{name}}" {{/if}}
	maxlength="{{maxLength}}"/>
-->

<input id="Isearcher-{{uid}}" data-type="search-input" class="itemssearcher-input typeahead"
	placeholder="{{placeholderLabel}}"
	type="search" autocomplete="off" title="Search"
	{{#if showId}} id="{{id}}" {{/if}} {{#if showName}} name="{{name}}" {{/if}}
	maxlength="{{maxLength}}"/>
<label for="Isearcher-{{uid}}" hidden>Item Searcher</label>




{{!----
Use the following context variables when customizing this template: 
	
	placeholderLabel (String)
	maxLength (Number)
	showId (Boolean)
	showName (Boolean)
	id (String)
	name (String)

----}}
