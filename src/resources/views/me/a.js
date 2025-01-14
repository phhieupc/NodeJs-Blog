document.addEventListener('DOMContentLoaded', function () {
    const delete_course_modal = document.getElementById('delete-course-modal');
    var courseId;
    var deleteForm = document.forms['delete-course-form'];
    var containerForm = $('form[name="container-form"]');
    var btnDeleteCourse = document.getElementById('btn-delete-course');
    var checkboxAll = $('#checkbox-all');
    var courseItemCheckbox = $('input[name="courseIds[]"]');
    var executeBtn = $('.btn-execute');
    delete_course_modal.addEventListener('show.bs.modal', function (event) {
        var btn = event.relatedTarget;
        courseId = btn.getAttribute('data-bs-id');
    });
    btnDeleteCourse.onclick = function () {
        deleteForm.action = '/courses/' + courseId + '?_method=DELETE';
        deleteForm.submit();
    };
    checkboxAll.change(function () {
        var isCheckedAll = $(this).prop('checked');
        courseItemCheckbox.prop('checked', isCheckedAll);
        renderCheckAllSubmitBtn();
    });
    courseItemCheckbox.change(function () {
        var isCheckedAll = courseItemCheckbox.length === $('input[name="courseIds[]"]:checked').length;
        checkboxAll.prop('checked', isCheckedAll);
        renderCheckAllSubmitBtn();
    });
    containerForm.on('submit', function (event) {
        var isSubmittable = !executeBtn.hasClass('disabled');
        if (!isSubmittable) {
            event.preventDefault();
        }
    });
    function renderCheckAllSubmitBtn() {
        var checkedCount = $('input[name="courseIds[]"]:checked').length;
        if (checkedCount) {
            executeBtn.removeClass('disabled');
        } else {
            executeBtn.addClass('disabled');
        }
    }
});
