$.fn.SubscribeNewsletter = function (options) {
    const MIN_SUBSCRIBER_ID = 1000000
    const MAX_SUBSCRIBER_ID = 9999999;

    return this.each(function (index, el) {

        var settings = $.extend({
            color: "#556b2f",
            backgroundColor: "white"
        });

        var $this = $(this), $email = $this.find('#email-subscribe-input');
        $this.find('#email-subscribe-button').on('click', function () {
            if (_validateEmail($email.val())) {
                _saveEmail($email.val()).then(response => {
                    _showConfirmationText("Thank you your email address has been registered.", $email.val(), "text-success");
                }).catch(error => {
                    _showConfirmationText("Error registering email address:", $email.val(), "text-danger");
                });
            } else {
                _showConfirmationText("Invalid email address:", $email.val(), "text-danger");
            }
        });
    });

    function _showConfirmationText(text, email, cssClass) {
        const confirmationH5 = document.createElement("h4");
        confirmationH5.classList.add(cssClass);
        if (cssClass === 'text-danger') {
            confirmationH5.innerHTML = text + "<br/><br/><h5>" + email + "</h5>";
            console.error("ERROR: " + text)
        } else {
            confirmationH5.innerHTML = text
            console.log(text);
        }
        const confirmationDiv = document.createElement("div");
        confirmationDiv.classList.add("m-4", "text-center");
        confirmationDiv.appendChild(confirmationH5);
        $('#confirmation-modal').find('#confirmation-modal-body').empty().append(confirmationDiv);
        $('#confirmation-modal').modal('toggle');
        return confirmationDiv;
    }

    async function _saveEmail(email) {
        let subscriberId = Math.random() * (MAX_SUBSCRIBER_ID - MIN_SUBSCRIBER_ID) + MIN_SUBSCRIBER_ID;
        let data = JSON.stringify(
            {
                id: subscriberId,
                name: "",
                email: email,
                role: "ROLE_GUEST"
            }
        )
        return await $.ajax({
            url: '/api/subscribe-user',
            type: 'POST',
            contentType: 'application/json',
            data: data
        })
    }

    function _validateEmail(email) {
        var emailExpression = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return emailExpression.test(email);
    }
};
