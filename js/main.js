$(document).ready(function () {
  // ================= Portfolio Modal =================
  // لما المستخدم يكبس على أي كرت من كروت البورتفوليو
  $(document).on("click", ".portfolio-card", function () {
    // نجيب عنوان المشروع من داخل h5
    const title = $(this).find("h5").text();

    // نجيب مسار الصورة من data-img
    const img = $(this).data("img");

    // نجيب الوصف المختصر للمشروع
    const desc = $(this).find(".portfolio-info p").text();

    // نجيب المحتوى الكامل للمشروع (HTML)
    const content = $(this).find(".portfolio-full-content").html();

    // نحط العنوان داخل المودال
    $("#modalTitle").text(title);

    // نغير صورة المودال حسب المشروع
    $("#modalImg").attr("src", img);

    // نحط الوصف داخل المودال
    $("#modalDesc").text(desc);

    // نحط المحتوى الكامل داخل المودال
    $("#modalContent").html(content);

    // إنشاء مودال Bootstrap
    const myModal = new bootstrap.Modal(
      document.getElementById("portfolioModal")
    );

    // عرض المودال للمستخدم
    myModal.show();
  });

  // ================= Filtering =================
  // لما المستخدم يكبس على زر من أزرار الفلترة
  $(".filter-btn").click(function () {
    // نشيل كلاس active من كل الأزرار
    $(".filter-btn").removeClass("active");

    // نضيف كلاس active للزر اللي انكبس
    $(this).addClass("active");

    // نجيب نوع الفلترة من data-type
    let type = $(this).data("type");

    // إذا اختار "all" نعرض كل العناصر
    if (type === "all") {
      $(".item").fadeIn();
    } else {
      // نخفي كل العناصر
      $(".item").hide();

      // نعرض العناصر اللي بتطابق النوع المختار
      $("." + type).fadeIn();
    }
  });

  // ================= Contact =================
  // لما المستخدم يضغط على زر إرسال الفورم
  $("#contactForm").submit(function (e) {
    // نمنع التحديث الافتراضي للصفحة
    e.preventDefault();

    // نمسك زر الإرسال
    const btn = $(this).find("button[type='submit']");

    // نخزن النص الأصلي للزر
    const originalText = btn.text();

    // نعطل الزر ونغير النص عشان نوضح إنو الإرسال شغال
    btn.prop("disabled", true).text("جاري الإرسال...");

    // محاكاة وقت الإرسال
    setTimeout(() => {
      // نظهر رسالة النجاح
      $("#successMsg").slideDown();

      // نرجع الزر لحالته الطبيعية
      btn.prop("disabled", false).text(originalText);

      // نفرغ الفورم
      $(this)[0].reset();

      // نخفي رسالة النجاح بعد 5 ثواني
      setTimeout(() => {
        $("#successMsg").slideUp();
      }, 5000);
    }, 1500);
  });

  // ================= Navigation =================
  // لما المستخدم يكبس على لينك من الناف بار أو زر بيروح على سيكشن
  $("a.nav-link, .btn-primary[href^='#']").on("click", function (event) {
    // نتأكد إنو الرابط فيه هاش (#)
    if (this.hash !== "") {
      // نمنع الانتقال العادي
      event.preventDefault();

      // نخزن قيمة الهاش (id السيكشن)
      var hash = this.hash;

      // نفعّل اللينك المناسب
      setActiveLink(hash);

      // سكرول ناعم للسيكشن مع تعويض ارتفاع الناف بار
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top - 70,
        },
        600
      );
    }
  });

  // دالة لتفعيل اللينك الحالي في الناف بار
  function setActiveLink(targetId) {
    // نشيل كلاس active و text-primary من كل اللينكات
    $(".nav-link").removeClass("active text-primary");

    // نضيف الكلاسات على اللينك اللي بيدل على السيكشن الحالي
    $('a.nav-link[href="' + targetId + '"]').addClass("active text-primary");
  }

  // لما المستخدم يعمل سكرول بالصفحة
  $(window).scroll(function () {
    // نجيب مكان السكرول الحالي
    var scrollPos = $(document).scrollTop();

    // نلف على كل لينكات الناف بار
    $(".nav-link").each(function () {
      var currLink = $(this);

      // نجيب السيكشن المرتبط باللينك
      var refElement = $(currLink.attr("href"));

      // نتأكد إنو السيكشن موجود
      if (refElement.length) {
        // إذا المستخدم داخل نطاق السيكشن
        if (
          refElement.position().top - 80 <= scrollPos &&
          refElement.position().top + refElement.height() > scrollPos
        ) {
          // نحدث اللينك النشط حسب مكان السكرول
          $(".nav-link").removeClass("active text-primary");
          currLink.addClass("active text-primary");
        }
      }
    });

    // ================= Animations =================
    // لما المستخدم يعمل سكرول على الصفحة
    $(window).scroll(function () {
      // نلف على كل العناصر اللي بدنا نعملها fade أثناء السكرول
      $(".fade-on-scroll").each(function () {
        // نحدد مكان العنصر بالنسبة للصفحة
        var bottom_of_object = $(this).offset().top + 50;

        // نحدد آخر نقطة ظاهرة من الشاشة
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        // إذا العنصر دخل ضمن الشاشة
        if (bottom_of_window > bottom_of_object) {
          // نعمل له تأثير fade in
          $(this).animate({ opacity: "1" }, 1000);
        }
      });
    });
  });

  // نخلي كل العناصر مخفية بالبداية
  $(".fade-on-scroll").css("opacity", 0);

  // نشغل حدث السكرول أول ما الصفحة تفتح
  $(window).trigger("scroll");

  // تأثير ظهور تدريجي لمحتوى الهيرو
  $(".hero-content h1").hide().fadeIn(1000); // العنوان
  $(".hero-content p").hide().delay(500).fadeIn(1000); // الوصف
  $(".hero-content .btn").hide().delay(1000).fadeIn(1000); // الزر
});
