/*!
 * Vue-Froala.js v1.0.0
 * (c) 2016 David Baldwynn <polydaic@gmail.com>
 * Released under the MIT License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('lodash')) :
    typeof define === 'function' && define.amd ? define(['jquery', 'lodash'], factory) :
    (global.install = factory(global.$,global._));
}(this, (function ($,_) { 'use strict';

$ = 'default' in $ ? $['default'] : $;
_ = 'default' in _ ? _['default'] : _;

var vueFroala = (function (Vue) {
    var Options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    var defaultParagraphFormat = {
        n: 'Normal',
        h2: 'Heading 2',
        h3: 'Heading 3',
        h4: 'Heading 4',
        blockquote: 'Quote',
        pre: 'Code'
    };

    var defaults = {
        toolbarButtons: Options.toolbarButtons || ['bold', 'italic', 'underline', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'insertTable', '|', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', '|', 'undo', 'redo', 'clearFormatting', 'fullscreen', '|', 'html'],
        toolbarButtonsMD: Options.toolbarButtonsMD || ['bold', 'italic', 'underline', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'insertTable', '|', 'insertLink', '|', 'undo', 'redo', 'clearFormatting', '|', 'html'],
        toolbarButtonsSM: Options.toolbarButtonsSM || ['bold', 'italic', 'underline', '|', 'insertLink', '|', 'undo', 'redo', 'clearFormatting'],
        toolbarButtonsXS: Options.toolbarButtonsXS || ['bold', 'italic', 'underline', '|', 'insertLink', '|', 'undo', 'redo', 'clearFormatting'],
        paragraphFormat: Options.paragraphFormat || defaultParagraphFormat,
        codeMirror: Options.codeMirror || true,
        height: Options.height || 400,
        theme: Options.theme || 'gray'
    };

    var opts = {
        full: {
            toolbarButtons: ['bold', 'italic', 'underline', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'insertTable', '|', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', '|', 'undo', 'redo', 'clearFormatting', 'fullscreen', '|', 'html'],
            toolbarButtonsMD: ['bold', 'italic', 'underline', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'insertTable', '|', 'insertLink', '|', 'undo', 'redo', 'clearFormatting', '|', 'html']
        },
        text: {
            toolbarButtons: ['bold', 'italic', 'underline', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'insertTable', '|', 'insertLink', '|', 'undo', 'redo', 'clearFormatting', '|', 'html'],
            toolbarButtonsMD: ['bold', 'italic', 'underline', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'insertTable', '|', 'insertLink', '|', 'undo', 'redo', 'clearFormatting', '|', 'html'],
            height: 300
        },
        mini: {
            toolbarButtons: ['bold', 'italic', 'underline', '|', 'insertLink', '|', 'undo', 'redo', 'clearFormatting', '|', 'html'],
            toolbarButtonsMD: ['bold', 'italic', 'underline', '|', 'insertLink', '|', 'undo', 'redo', 'clearFormatting', '|', 'html'],
            height: 200
        }
    };

    Vue.directive('froala', {
        params: ['upload-path', 'froala-toolbar'],

        bind: function bind() {
            var _this = this;

            var $el = $(this.el);
            $el.on('froalaEditor.initialized', function (e, editor) {
                return _this.vm.$editor = editor;
            });
            $el.on('froalaEditor.focus', function (e, editor) {
                return editor.$box.addClass('focus');
            });
            $el.on('froalaEditor.blur', function (e, editor) {
                return editor.$box.removeClass('focus');
            });
            $el.on('froalaEditor.image.error', function (e, editor, error) {
                return alert(error.message);
            });

            var options = {};
            _.extend(options, defaults, opts[this.params.froalaToolbar], {
                fileUploadURL: this.params.uploadPath,
                imageUploadURL: this.params.uploadPath
            });

            setTimeout(function () {
                $el.froalaEditor(options);
            }, 200);
        }
    });
});

return vueFroala;

})));
