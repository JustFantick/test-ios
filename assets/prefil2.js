let ziyin = true;
let domain = "";
let pay_id = "";
let pay_method = 1;
let byShipping = null;

$(".loading_btn").css("display", "none");
$(".pay_text").css("display", "block");
let arr_cm = `{"cm_val":"eiro","cm_unit":"eiro","cm_rate":1}`;
let arr_cmNew = JSON.parse(arr_cm);
let currency_val = arr_cmNew.cm_val;
let moneyIcon = arr_cmNew.cm_unit;
let currency_rate = arr_cmNew.cm_rate;
let tks = window.localStorage.getItem("tk");
let argoods = [];

let discount = null;
let auto_dis_id = 0;
let manual_code = "";
let manual_discount_id = 0;
let manual_code_price = 0;
let discount_state = true;

let amount = 0;
let auto_discount = 0;

let auto_discount_id = "";

let msgVal = false;
let full_reduction = 0;
let full_discount = 0;
let goods_reduction = null;
let carList = [];
let carListAll = [];
let country_id = 225;
let country_name = "";

let shipping_price = 0;
let shipping_id = 0;
let order_remark = "";
let spId = false;

let payment = null;

let email_bo = false;
let first_Name_bo = false;
let last_Name_bo = false;
let address_bo = true;
let city_bo = false;
let province_bo = false;
let code_bo = true;
let phone_bo = false;
let country_Bo = false;
let order_money_sum = 0;


let country = "";
let tt = "";
let ip = "";
fetch("https://ipapi.co/json/")
    .then((d) => d.json())
    .then((d) => {
        country = d.country_name;
        ip = d.ip;
        tt = d.country_calling_code;
        // $(".val2").val(tt);
        // $(".val3").val(tt);
    });

checkOutData();
function checkOutData() {
    let str = "";
    countryList.forEach((item) => {
        str += ` <option class="optionvalue" id='option_${item.id}' value=${item.id} label="${item.name}">${item.name}</option>`;
    });
    $(".option_val").append(str);
}
$(".email").addClass("form_com_active");
$("#checkout").click(() => {
    $(".email").removeClass("form_com_active");
});
function applyOnInput() {
    manual_code_price = 0;
    manual_code = "";
    manual_discount_id = 0;
    totalSum();
    $(".code_msg").css("display", "none");
    $(".manua").css("display", "none");
}
function btnCodeClick() {
    $(".code_msg").css("display", "block");
}
getPayment();
function getPayment() {
    if (!payment) {
        payment = JSON.parse('["stripe"]');
        if (payment.length > 0) {
            pay_name = payment[0];
        }
    }
}
getTopcontent([{ type: "718", content: null }]);

function getTopcontent(res) {
    if (
        JSON.parse(res[0].content) !== null &&
        JSON.parse(res[0].content).pin_h == 1
    ) {
        $(".submit_box").css("display", "none");
    } else {
        $(".submit_box").css("display", "block");
    }
}

function getFullDiscount() {
    let strFull = "";
    if ('{"318387":{"discount":0,"discount_des":""}}') {
        goods_reduction = JSON.parse(
            '{"318387":{"discount":0,"discount_des":""}}'
        );
    }
    if (goods_reduction) {
        window.localStorage.setItem(
            "goods_reduction",
            JSON.stringify(goods_reduction)
        );
        for (const key in goods_reduction) {
            full_reduction += goods_reduction[key].discount;
        }
        if (Math.abs(full_reduction) > 0) {
            $(".shipping_main").css("display", "flex");
            $(".sub_full").html(
                `-<span class="font-apple notranslate">${moneyIcon}<span class="notranslate">${(
                    Math.abs(full_reduction) / currency_rate
                ).toFixed(2)}`
            );
        }
        if (!full_reduction) {
            full_discount = 0;
        } else {
            full_discount = 1;
        }
    }
    $(".load_img").css("display", "none");
    $("body").css("overflow", "visible");
}
function getCarList() {
    return;
    if (tks) {
        carList = [
            {
                id: 318387,
                goods_id: 318387,
                goods_size_id: 3276851,
                goods_name: "14 Pro Max",
                goods_image:
                    "https://img-va.myshopline.com/image/store/2007839799/1685496406861/SKU-02-Silver-1TB.jpeg?w=1000&h=1000",
                seo_url: "iphone-14-pro-max",
                price: "2",
                spec_name1: "Color",
                spec_value1: "Deep Purple",
                spec_name2: "Size",
                spec_value2: "1TB",
                spec_name3: "Plug",
                spec_value3: "US",
                price_usd: "2",
                totle: 2,
                goods_num: 1,
                goods_amount: "2",
            },
        ];
        argoods = argoodsCarFn(carList);
        $(".sub").css("display", "flex");
        $(".argoodsSum").html(
            `<span class= "font-apple notranslate" >${moneyIcon}49</span>`
        );
        $(".checkout_sum_moeny").html(
            `<span class="font-apple notranslate">${moneyIcon}49</span>`
        );
        getFullDiscount();
    } else {
        carList = [
            {
                id: 318387,
                goods_id: 318387,
                goods_size_id: 3276851,
                goods_name: "14 Pro Max",
                goods_image:
                    "https://img-va.myshopline.com/image/store/2007839799/1685496406861/SKU-02-Silver-1TB.jpeg?w=1000&h=1000",
                seo_url: "iphone-14-pro-max",
                price: "49.00",
                spec_name1: "Color",
                spec_value1: "Deep Purple",
                spec_name2: "Size",
                spec_value2: "1TB",
                spec_name3: "Plug",
                spec_value3: "US",
                price_usd: "49.00",
                totle: 49,
                goods_num: 1,
                goods_amount: "49.00",
            },
        ];
        argoods = argoodsCarFn(carList);
        $(".sub").css("display", "flex");
        $(".argoodsSum").html(
            `<span class="font-apple notranslate">${moneyIcon}49<span>`
        );
        $(".checkout_sum_moeny").html(
            `<span class="font-apple notranslate">${moneyIcon}49`
        );
        getFullDiscount();
    }
}

function getListByGoods() {
    return;
    let arship = [
        {
            id: 991,
            name: "Free shipping",
            price: "0.00",
            ischeck: 1,
            price_cm: "$0",
        },
    ];
    arship.forEach((v) => {
        if (v.ischeck == 1) {
            shipping_price = Number(v.price);
            shipping_id = v.id;
        }
    });
    $(".freight-option").css("display", "block");
    $(".shipping").css("display", "flex");
    $(".shipping .sub_right").html(
        `<span class="font-apple notranslate">${moneyIcon}<span>${(
            shipping_price / currency_rate
        ).toFixed(2)}`
    );
    let shipping_radio = $(".freight_list");
    for (let i = 0; i < shipping_radio.length; i++) {
        $(shipping_radio[i]).bind(
            "click",
            {
                index: i,
                byShipping: arship,
            },
            radioChang
        );
    }
}
function radioChang(event) {
    let i = event.data.index;
    let byShipping = event.data.byShipping;
    shipping_id = byShipping[i].id;
    shipping_price = Number(byShipping[i].price);
    $(".shipping .sub_right").html(
        `<span class="font-apple notranslate">${moneyIcon}<span>${(
            shipping_price / currency_rate
        ).toFixed(2)}`
    );
    totalSum();
}

let userFrom = JSON.parse(window.localStorage.getItem("userInfo"));
if (false) {
    $(".email").val(userFrom.user.email);
    $(".first_Name").val(userFrom.user.firstName);
    $(".last_Name").val(userFrom.user.lastName);
    $(".address").val(userFrom.user.address);
    $(".optional").val(userFrom.user.apartment);
    $(".city").val(userFrom.user.city);
    $(".province").val(userFrom.user.province);
    $(".code").val(userFrom.user.postalcode);
    $(".phone").val(userFrom.user.mobile);
    $(".option_val").val(userFrom.user.region);
} else {
    getCity();
}

// 获取国家ip
function getCity() {
    $.ajax({
        type: "post",
        url: "https://ipapi.co/json/",
        dataType: "json",
        success: function (data) {
            //console.log(data);
            //alert(data.country_name + ", " + data.city);

            if (data.country_name == "United Kingdom") {
                $(".option_val").val(225);//225 = "United Kingdom"
                country_id = data.id;
                $(`#option_${country_id}`).attr("selected", "selected");

                $(".city").val(data.city);
                $(".city").addClass("form-control_focus");
                $(".city").prev(".label_title").addClass("label_title_focus");

                // $("#code_id").val(data.postal)
                // $("#code_id").addClass("form-control_focus");
                // $("#code_id").prev(".label_title").addClass("label_title_focus");
            } else {
                $(".option_val").val(225);//225 = "United Kingdom"
                country_id = data.id;
                $(`#option_${country_id}`).attr("selected", "selected");
            }

            $(".inputBox .prefix").text("+44");
            $("#phone_id").addClass("form-control_focus");
            $("#phone_id").prev(".label_title").addClass("label_title_focus");
        },
        error: () => {
            $(".option_val").val(225);//225 = "United Kingdom"
            country_id = data.id;
            $(`#option_${country_id}`).attr("selected", "selected");

            $(".inputBox .prefix").text("+44");
            $("#phone_id").addClass("form-control_focus");
            $("#phone_id").prev(".label_title").addClass("label_title_focus");
        }

    });
}

$('#county_id').on("change", function (e) {
    let countryObj = countryList.find(el => el.id == e.target.value);

    if (countryObj) {
        $.ajax({
            type: "get",
            url: `https://restcountries.com/v3.1/name/${countryObj.name}`,
            dataType: "json",
            success: function (data) {
                //$("#phone_id").val(data[0].idd.root + data[0].idd.suffixes[0]);
                $(".inputBox .prefix").text((data[0].idd.root + data[0].idd.suffixes[0]).substring(0, 3));
                if ((data[0].idd.root + data[0].idd.suffixes[0]).length == 2) {
                    $("#phone_id").style = "padding-left: 32px";
                }
                $("#phone_id").addClass("form-control_focus");
                $("#phone_id").prev(".label_title").addClass("label_title_focus");
            },
            error: () => {
                $("#phone_id").val('');
                $("#phone_id").css({ 'padding-left': "12px" });
                $(".inputBox .prefix").text('');
                $("#phone_id").addClass("form-control_focus");
                $("#phone_id").prev(".label_title").addClass("label_title_focus");
            }
        });
    }
});

const email =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phone = /^.{8,20}$/;
$(".form-control").each(function () {
    $(this).focus(() => {
        $(this).addClass("form-control_focus");
        $(this).closest(".userForm_item").find(".label_title").addClass("label_title_focus");
        $(this).closest(".userForm_item").find(".prefix").addClass("focused");
        $(this).removeClass("borderMsg");
        $(this).parent().next(".invalid-feedback").css("display", "none");
    });
    $(this).blur(() => {
        let val = $.trim($(this).val());
        if (!val) {
            $(this).removeClass("form-control_focus");
            $(this).closest(".userForm_item").find(".label_title").removeClass("label_title_focus");
            $(this).closest(".userForm_item").find(".prefix").removeClass("focused");
        }
    });
    $(this).on("input", (event) => {
        let val = $(this).val();
        if (val) {
            $(this).addClass("form-control_focus");
            $(this).closest(".userForm_item").find(".label_title").addClass("label_title_focus");
            $(this).closest(".userForm_item").find(".prefix").addClass("focused");
        }
    });
    let input_val = $.trim($(this).val());
    if (input_val) {
        $(this).addClass("form-control_focus");
        $(this).closest(".userForm_item").find(".label_title").addClass("label_title_focus");
        $(this).closest(".userForm_item").find(".prefix").addClass("focused");
    }
});

formatTelInput();
function formatTelInput() {
    const telInput = document.querySelector('#phone_id');

    let previousValue = '';
    telInput.addEventListener('input', (e) => {
        console.log('input worked');
        var currentValue = e.target.value;
        //console.log(e.target.value.length);
        if (e.target.value.length > 11) {
            console.log('over 11');
            e.target.value = previousValue;
            return;
        }
        if (e.inputType === "deleteContentBackward" && previousValue == '') return;

        if (previousValue.length === currentValue.length - 1 && currentValue.startsWith(previousValue)) {
            if (e.inputType !== "deleteContentBackward") {
                if (telInput.value.length == 3 || telInput.value.length == 7) {
                    telInput.value += " ";
                }
            }
        } else if (e.inputType !== "deleteContentBackward") {
            console.log('worked white spaces');
            const pastedStr = e.target.value.substring(0, 10);
            e.target.value = pastedStr.slice(0, 3) + " " + pastedStr.slice(3, 6) + " " + pastedStr.slice(6)
        }
        previousValue = e.target.value;
    }, false);

    // let prev = '';
    // telInput.addEventListener('keydown', (e) => {
    //     console.log('worked', e.target.value.length);
    //     if (e.target.value.length > 12) {
    //         e.target.value = prev;
    //         return;
    //     }
    //     prev = e.target.value;
    // });
}

$(".option_val").change(function () {
    country_id = $(".option_val option:selected").val();
    country_name = $(".option_val option:selected").attr("label");
    $(this).parent().next(".invalid-feedback").css("display", "none");
    $(this).removeClass("borderMsg");
});
let scrTop = 0;
function submint_save() {
    let form_bo = true;
    $(".form_verify").each(function () {
        if ($.trim($(this).val()) === "") {
            $(this).parent().next(".invalid-feedback").css("display", "block");
            $(this).addClass("borderMsg");
            form_bo = false;
            //state/prividance not exist
        } else {
            if ($(this).attr("id") == "email_id") {
                if (!email.test($.trim($(this).val()))) {
                    $(this)
                        .parent()
                        .next(".invalid-feedback")
                        .css("display", "block");
                    $(this).addClass("borderMsg");
                    form_bo = false;
                }
            }
            if ($(this).attr("id") == "county_id") {
                if ($(this).val() == 0) {
                    $(this)
                        .parent()
                        .next(".invalid-feedback")
                        .css("display", "block");
                    $(this).addClass("borderMsg");
                    form_bo = false;
                } else {
                    country_id = $(this).val();
                }
            }
            if ($(this).attr("id") == "phone_id") {
                if (!this.value.match(/^\d{3} \d{3} \d{4}$/)) {
                    $(this)
                        .parent()
                        .next(".invalid-feedback")
                        .css("display", "block");
                    $(this).addClass("borderMsg");
                    form_bo = false;
                }
            }
        }
    });
    if (form_bo) {
        window.localStorage.setItem(
            "userInfo",
            JSON.stringify({
                user: {
                    email: $(".email_Val").val(),
                    send_news:
                        $(".check_val_child").is(":checked") == true ? 1 : 0,
                    region: $(".option_val").val(),
                    firstName: $(".first_Name").val(),
                    lastName: $(".last_Name").val(),
                    address: $(".address").val(),
                    apartment: $(".optional").val(),
                    city: $(".city").val(),
                    province: $(".province").val(),
                    postalcode: $(".code").val(),
                    mobile: $(".phone").val(),
                    save_address:
                        $(".save_address").is(":checked") == true ? 1 : 0,
                },
            })
        );
        getSave();
        $(".loading_btn").css("display", "-webkit-box");
        $(".loading_btn").css("display", "-ms-flexbox");
        $(".loading_btn").css("display", "flex");
        $(".pay_text").css("display", "none");
    } else {
        let formTop = $(".middle").offset().top;
        $("html ,body").animate(
            {
                scrollTop: formTop,
            },
            0
        );
    }
}

function getSave() {
    let data = {};
    data = {
        email: $(".email_Val").val(),
        send_news: $(".check_val_child").is(":checked") == true ? 1 : 0,
        region: $(".option_val").val(),
        first_name: $(".first_Name").val(),
        last_name: $(".last_Name").val(),
        address: $(".address").val(),
        apartment: $(".optional").val(),
        city: $(".city").val(),
        province: $(".province").val(),
        postcode: $(".code").val(),
        mobile: $(".phone").val(),
        save_address: $(".save_address").is(":checked") == true ? 1 : 0,
        country_id,
        auto_discount_id: auto_dis_id,
        manual_code: manual_code, //手动折扣码
        manual_discount_id: manual_discount_id, //折扣码id
        full_discount,
        auto_discount,
        shipping_id: shipping_id,
        order_remark,
        pay_name,
    };
    if (
        JSON.parse(sessionStorage.getItem("fbq")) &&
        window.sessionStorage.getItem("fbq_status")
    ) {
    }
    getAxiosSave(data);
}

let pull_cars_bo = true;
$(document).ready(function () {
    $(".panel-header").click(function () {
        var panelContent = $(this).next(".panel-content");
        panelContent.slideToggle();
        if (!pull_cars_bo) {
            $(".goods_title_info").text("Hide Order Summary");
            $(".goods_info_jt").addClass("details_jt_rotate");
            pull_cars_bo = !pull_cars_bo;
        } else {
            $(".goods_title_info").text("Show Order Summary");
            $(".goods_info_jt").removeClass("details_jt_rotate");
            pull_cars_bo = !pull_cars_bo;
        }
    });

    //hide details on mobile devices
    const hideDetailsOnMb = () => {
        if (window.innerWidth < 900) {
            $('.panel-header').next(".panel-content").slideToggle();
            $(".goods_title_info").text("Show Order Summary");
            $(".goods_info_jt").removeClass("details_jt_rotate");
            pull_cars_bo = !pull_cars_bo;
        }
    };
    hideDetailsOnMb();
});

$(".tipsClick").click((e) => {
    e.stopPropagation();
    $(".phone-tips").addClass("phone-tips--show");
    setTimeout(() => {
        $(".phone-tips").removeClass("phone-tips--show");
    }, 3000);
});
function backHome() {
    window.location.href = "/";
}
function backCar() {
    window.location.href = "/car";
}

const cookieExpires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

function setCookie(name, value, expires) {
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}
