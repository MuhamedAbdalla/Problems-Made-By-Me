(function ($) {
    /**
     * This function is analogue for click() handler, but it can prevent multiply popup calls.
     *
     * There are two strategies:
     * CLOSE_PREVIOUS strategy allows you to open a new popup, but it closes previous popups;
     * PREVENT_CALL_IF_OPENED strategy prevents you to open a popup if any popup is opened.
     *
     * Note that CLOSE_PREVIOUS strategy may produce some problems if you are moving (not cloning) the content of popup.
     *
     * @param handler is a function that click() handler has as an argument.
     * @param autoclose is <code>true</code> if you want to use the CLOSE_PREVIOUS strategy,
     * otherwise this function uses the PREVENT_CALL_IF_OPENED strategy.
     */
    $.fn.clickToPopup = function (handler, autoclose) {
        this.click(function() {
            if (autoclose) {
                $("body > .popup").find(".popup-close img").click();
                return handler.bind(this)();
            } else {
                if ($("body > .popup").length > 0) {
                    return false;
                } else {
                    return handler.bind(this)();
                }
            }
        });
    };
})(jQuery);
