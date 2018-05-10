/* eslint-disable prefer-arrow-callback, no-inner-declarations */
const $ = window.$;

export default function card() {
  $(document).on('click', '.card-reviewform__button', function (e) {
    e.preventDefault();
    let err = 0;
    const $this = $(this);
    const form = $this.parents('.card-reviewform__form');
    const input = form.find('.card-reviewform__field');
    input.each(function () {
      if ($(this).val() === '') err += 1;
    });
    if (err < 1) {
      $this.parents('.card-reviewform').addClass('success');
      setTimeout(function () {
        form.submit();
      }, 5000);
    }
  });

  $(document).on('click', '.card-reviewform__link a', function (e) {
    e.preventDefault();
    const form = $(this).parents('.card-reviewform').find('.card-reviewform__content');
    if (form.hasClass('is-active')) {
      form.removeClass('is-active');
      form.children('.card-reviewform__inner').slideUp(500);
    } else {
      form.addClass('is-active');
      form.children('.card-reviewform__inner').slideDown(500);
    }
  });

  function validateImage(file, elem) {
    if (file) {
      for (let i = 0; i < file.length; i += 1) {
        const validSize = $(elem).attr('data-correct-size');
        const validWidth = $(elem).attr('data-correct-resolution').split('x')[0];
        const validHeight = $(elem).attr('data-correct-resolution').split('x')[1];
        const errorEl = $(elem).next('.card-reviewform__file-error');
        errorEl.text('');
        $(elem).removeAttr('data-error');

        if (file[i].type.split('/')[0] !== 'image') {
          errorEl.text('Файл не является изображением');
          break;
        }

        if (file[i].size > validSize) {
          errorEl.text('Размер файла превышает допустимый');
          break;
        }

        function validateResolution(callback) {
          const reader = new FileReader();
          reader.readAsDataURL(file[i]);
          reader.onload = function (e) {
            const image = new Image();
            image.src = e.target.result;
            image.onload = function () {
              const height = this.height;
              const width = this.width;
              if (height > validHeight && width > validWidth) {
                const previews = $(elem).find('.card-reviewform__file-previews');
                $(elem).find('.card-reviewform__file-preview.is-hidden').clone(true).appendTo(previews)
                  .removeClass('is-hidden')
                  .attr('data-file', i)
                  .find('img')
                  .attr('src', e.target.result);
                $(elem).append(`<input type="hidden" name="file[${i}]" value="${e.target.result}">`);
                callback(false);
              } else {
                errorEl.text('Разрешение файла меньше допустимого');
                callback(true);
              }
            };
          };
        }

        validateResolution(function (err) {
          if (err) {
            $(elem).attr('data-error', 'true');
          }
        });

        if ($(elem).attr('data-error')) {
          break;
        }
      }
    }
  }

  $('.card-reviewform__file-label input').on('change', function () {
    const dataEl = $(this).parents('.card-reviewform__file');
    const previews = dataEl.find('.card-reviewform__file-preview:not(.is-hidden)');
    previews.remove();
    dataEl.find('input[type="hidden"]').remove();
    validateImage(this.files, dataEl);
  });

  $('.card-reviewform__file').on('drag dragstart dragend dragover dragenter dragleave drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
  })
  .on('dragover dragenter', function () {
    $(this).addClass('dragover');
  })
  .on('dragleave dragend drop', function () {
    $(this).removeClass('dragover');
  })
  .on('drop', function (e) {
    const droppedFiles = e.originalEvent.dataTransfer.files;
    const dataEl = $(this);
    const previews = dataEl.find('.card-reviewform__file-preview:not(.is-hidden)');
    previews.remove();
    dataEl.find('input[type="hidden"]').remove();
    validateImage(droppedFiles, dataEl);
  });

  $(document).on('click', '.card-reviewform__file-preview-close', function (e) {
    e.preventDefault();
    const fileIndex = $(this).parent().attr('data-file');
    $(this).parents('.card-reviewform__file').find(`input[name="file[${fileIndex}]"]`).remove();
    $(this).parent().remove();
  });
}
/* eslint-enable prefer-arrow-callback, no-inner-declarations */
