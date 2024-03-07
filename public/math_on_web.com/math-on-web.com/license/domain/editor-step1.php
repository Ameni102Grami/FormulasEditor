<script>
var url =
    'editor-step2.php?editorId=editor&lang=en&mathsize=30&key=VTY6X-AZFPQ-Q1KS8-EPOW4&time=1709654598203&hash=b54759b46b2b4557224e5631f05c405c254d01f9ce73398f66f1f5a084558a17&d=t8a%2FG6uULtWOXh8Izshx';
var urlD = 'editor-step3.php?editorId=editor&lang=en&mathsize=30';

var urlFinal = url;
try {
    var jwt = localStorage.getItem("JWT");
    if (jwt != null && jwt.length > 0) {

        var base64Url = jwt.split(".")[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jwt = JSON.parse(atob(base64));
        var expireDate = jwt.exp;

        var actualDate = new Date();
        if ((expireDate * 1000) > actualDate.getTime()) {
            urlFinal = urlD;
        }
    }
} catch (e) {
    console.log(e);
}
console.log('redirect to:' + urlFinal);
window.location.href = urlFinal;
</script>