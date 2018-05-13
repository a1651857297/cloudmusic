$.ajax({
    url: '/api/data',
    dataType: 'json',
    success: function(res) {
        console.log(res);
        render(res)

    },
    error: function(error) {
        console.warn(error);

    }
})

function render(data) {
    var str = "";
    data.forEach(function(val, i) {
        str += '<div class="swiper-slide"><img src="' + val.url + '" alt=""></div>'
    })
    $('.swiper-wrapper').html(str);
    var myswiper = new Swiper('.swiper-container', {
        autoplay: 2000,
        pagination: '.swiper-pagination',
    })
}