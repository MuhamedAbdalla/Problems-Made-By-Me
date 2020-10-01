var formSubmitting = false;
var aceEditorsDefaultValue = {};

var confirmExitIfModified = (function()
{
    function formIsDirty(form)
    {
        for (var i = 0; i < form.elements.length; i++)
        {
            var element = form.elements[i];
            var type = element.type;
            if (type == "checkbox" || type == "radio")
            {
                if (element.checked != element.defaultChecked)
                {
                    //alert(type);
                    return true;
                }
            }
            else if (type == "hidden" || type == "password" || type == "text" ||
                     type == "textarea")
            {
                if (element.value != element.defaultValue && !$(element).hasClass("ace_text-input")) {
                    return true;
                }
            }
            else if (type == "select-one" || type == "select-multiple")
                {
                    var hasSelected = false;

                    for (var j = 0; j < element.options.length; j++)
                        if (element.options[j].defaultSelected) {
                            hasSelected = true;
                        }

                    for (var j = 0; j < element.options.length; j++) {
                        if (element.options[j].selected != element.options[j].defaultSelected)
                        {
                            if (element.options[j].selected && !hasSelected && j === 0)
                                continue;

                            return true;
                        }
                    }
                }
        }

        if (typeof(ace) !== "undefined") {
            for (var aceId in aceEditorsDefaultValue) {
                if (aceEditorsDefaultValue.hasOwnProperty(aceId)
                        && ace.edit(aceId).getValue() != aceEditorsDefaultValue[aceId]) {
                    return true;
                }
            }
        }

        return false;
    }

    return function(message) {
        window.onbeforeunload = function(e) {
            e = e || window.event;
            for (var i = 0; i < document.forms.length; ++i) {
                if (formIsDirty(document.forms[i]) && !formSubmitting) {
                    if (e) {
                        e.returnValue = message;
                    }
                    return message;
                }
            }
        };
    };
})();

function safeFormsLeave() {
    $("form").submit(function() {
        formSubmitting = true;
    });

    if (typeof(ace) !== "undefined") {
        var savedElements = $("form .savedFile");
        if (savedElements.length > 0) {
            savedElements.each(function () {
                var id = $(this).attr("id");
                aceEditorsDefaultValue[id] = ace.edit(id).getValue();
            });
        } else {
            $("form .aceSupportsSafeFormsLeave").each(function () {
                var id = $(this).attr("id");
                aceEditorsDefaultValue[id] = ace.edit(id).getValue();
            });
        }
    }

    confirmExitIfModified("Warning! You may lose your unsaved changes. Are you sure you want to leave the page?");
}

function isMobileBrowser() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}

function extractionNumericText(node) {
    var s = $(node).text().trim();
    if (/^([0-9]+)$/.test(s)) {
        while (s.length < 18) {
            s = '0' + s;
        }
    }
    return s;
}
