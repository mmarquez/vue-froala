import _ from 'lodash';

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

    Vue.directive('froala', {
        params: ['upload-path', 'froala-toolbar'],

        bind: function(el, binding, vnode) {
            let $el = $(el);
            $el.on('froalaEditor.initialized',  (e, editor) => this.$editor = editor );
            $el.on('froalaEditor.focus',        (e, editor) => editor.$box.addClass('focus') );
            $el.on('froalaEditor.blur',         (e, editor) => editor.$box.removeClass('focus') );
            $el.on('froalaEditor.image.error',  (e, editor, error) => alert(error.message) );

            let options = {};
            _.extend(options, defaults, opts[binding.value.toolbar], {
                fileUploadURL: binding.value.uploadPath || '',
                imageUploadURL: binding.value.uploadPath || ''
            })

            setTimeout(() => { $el.froalaEditor() }, 200);
        }
    })
}