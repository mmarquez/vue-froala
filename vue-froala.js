var $ = require('jquery');
import 'froala-editor/js/froala_editor.pkgd.min';
import "froala-editor/css/froala_editor.min.css";
import "froala-editor/css/froala_style.min.css";
import "font-awesome/css/font-awesome.css";

const inBrowser = typeof window !== 'undefined'

export default (Vue, Options = {}) => {

    const defaultParagraphFormat = {
        n:  'Normal',
        h2: 'Heading 2',
        h3: 'Heading 3',
        h4: 'Heading 4',
        blockquote: 'Quote',
        pre: 'Code'
    }

    const defaults = {
        toolbarButtons: Options.toolbarButtons || ['bold', 'italic', 'underline', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'insertTable', '|', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', '|', 'undo', 'redo', 'clearFormatting', 'fullscreen', '|', 'html'],
        toolbarButtonsMD: Options.toolbarButtonsMD || ['bold', 'italic', 'underline', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'insertTable', '|', 'insertLink', '|', 'undo', 'redo', 'clearFormatting', '|', 'html'],
        toolbarButtonsSM: Options.toolbarButtonsSM || ['bold', 'italic', 'underline', '|', 'insertLink', '|', 'undo', 'redo', 'clearFormatting'],
        toolbarButtonsXS: Options.toolbarButtonsXS || ['bold', 'italic', 'underline', '|', 'insertLink', '|', 'undo', 'redo', 'clearFormatting'],
        paragraphFormat: Options.paragraphFormat || defaultParagraphFormat,
        codeMirror: Options.codeMirror || true,
        height: Options.height || 400,
        theme: Options.theme || 'gray'
    }

    const opts = {
        full: {
            toolbarButtons: ['bold', 'italic', 'underline', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'insertTable', '|', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', '|', 'undo', 'redo', 'clearFormatting', 'fullscreen', '|', 'html'],
            toolbarButtonsMD: ['bold', 'italic', 'underline', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'insertTable', '|', 'insertLink', '|', 'undo', 'redo', 'clearFormatting', '|', 'html'],
        },
        text: {
            toolbarButtons: ['bold', 'italic', 'underline', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'insertTable', '|', 'insertLink', '|', 'undo', 'redo', 'clearFormatting', '|', 'html'],
            toolbarButtonsMD: ['bold', 'italic', 'underline', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'insertTable', '|', 'insertLink', '|', 'undo', 'redo', 'clearFormatting', '|', 'html'],
            height: 300,
        },
        mini: {
            toolbarButtons: ['bold', 'italic', 'underline', '|', 'insertLink', '|', 'undo', 'redo', 'clearFormatting', '|', 'html'],
            toolbarButtonsMD: ['bold', 'italic', 'underline', '|', 'insertLink', '|', 'undo', 'redo', 'clearFormatting', '|', 'html'],
            height: 200
        }
    }

    Vue.component('froala', {
        props: ['options'],
        template: '<div id="vue-froala-wrapper"></div>',
        mounted: function() {
            var $el = $(this.$el);
            $el.on('froalaEditor.initialized', function (e, editor) {
                return $el.$editor = editor;
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

            var options = {
                toolbarButtons: this.options.toolbar || opts['full'].toolbarButtons,
                toolbarButtonsMD: this.options.toolbarMd || opts['full'].toolbarButtonsMD,
                height: this.options.height || 300,
                fileUploadURL: this.options.uploadPath || '',
                imageUploadURL: this.options.uploadPath || '',
                theme: this.options.theme || ''
            };

            setTimeout(function () {
                $el.froalaEditor(options);
            }, 200);
        }
    })
}