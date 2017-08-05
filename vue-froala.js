Vue.component('froala-editor', {
    props: ['options', 'value'],
    data: function() {
        return {
            el: undefined,
            editor: undefined,
            notChange: false,
            id: Math.trunc(Math.random() * 10000)
        }
    },
    template: `<div :id="'vue-froala-wrapper-' + this.id"></div>`,
    watch: {
        value: function(value) {
            if (!this.$data.notChange) {
                $(this.el[0]).froalaEditor('html.set', this.$props.value);
            } else {
                this.$data.notChange = true;
            }
        }
    },
    mounted: function() {
        const defaultParagraphFormat = {
            n: 'Normal',
            h2: 'Cabecera 2',
            h3: 'Cabecera 3',
            h4: 'Cabecera 4',
            blockquote: 'Cita',
            pre: 'Código'
        };
        const defaults = {
            toolbarButtons: this.$props.toolbarButtons || ['paragraphFormat', 'fontFamily', 'fontSize', 'color', 'inlineStyle', '|', 'bold', 'italic', 'underline', '|', 'align', 'formatOL', 'formatUL', 'insertTable', '|', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'emoticons', '|', 'undo', 'redo', 'clearFormatting', 'fullscreen', '|', 'html'],
            toolbarButtonsMD: this.$props.toolbarButtonsMD || ['bold', 'italic', 'underline', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'insertTable', '|', 'insertLink', '|', 'undo', 'redo', 'clearFormatting', '|', 'html'],
            toolbarButtonsSM: this.$props.toolbarButtonsSM || ['bold', 'italic', 'underline', '|', 'insertLink', '|', 'undo', 'redo', 'clearFormatting'],
            toolbarButtonsXS: this.$props.toolbarButtonsXS || ['bold', 'italic', 'underline', '|', 'insertLink', '|', 'undo', 'redo', 'clearFormatting'],
            paragraphFormat: this.$props.paragraphFormat || defaultParagraphFormat,
            codeMirror: this.$props.codeMirror || true,
            height: this.$props.height || 400,
            theme: this.$props.theme || 'gray',
            imageMaxSize: this.$props.imageMaxSize || 2 * 1024 * 1024
        };
        const opts = {
            full: {
                toolbarButtons: ['paragraphFormat', 'fontFamily', 'fontSize', 'color', 'inlineStyle', '|', 'bold', 'italic', 'underline', '|', 'align', 'formatOL', 'formatUL', 'insertTable', '|', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'emoticons', '|', 'undo', 'redo', 'clearFormatting', 'fullscreen', '|', 'html'],
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
        };

        this.el = $('#vue-froala-wrapper-' + this.id);
        let _this = this;
        this.el.on('froalaEditor.initialized', function(e, editor) {
            this.editor = editor;
            this.editor.html.set(_this.$props.value);
        });
        this.el.on('froalaEditor.focus', function(e, editor) {
            return editor.$box.addClass('focus');
        });
        this.el.on('froalaEditor.blur', function(e, editor) {
            return editor.$box.removeClass('focus');
        });
        this.el.on('froalaEditor.image.error', function(e, editor, error) {
            return alert(error.message);
        });
        this.el.on('froalaEditor.contentChanged', function(e, editor) {
            _this.notChange = true;
            _this.$emit('input', editor.html.get());
        });

        var options = {
            toolbarButtons: this.$props.toolbar || opts['full'].toolbarButtons,
            toolbarButtonsMD: this.$props.toolbarMd || opts['full'].toolbarButtonsMD,
            height: this.$props.height || defaults.height,
            fileUploadURL: this.$props.uploadPath || 'uploadFile',
            imageUploadURL: this.$props.uploadPath || 'uploadImage',
            imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif'],
            imageMaxSize: this.$props.imageMaxSize || defaults.imageMaxSize,
            theme: this.$props.theme || '',
            videoAllowedTypes: ['webm'],
            videoUploadURL: this.$props.videoUploadPath || 'uploadVideo',
            fileAllowedTypes: [
                'application/pdf',
                'application/msword',
                'application/vnd.ms-excel',
                'application/vnd.ms-powerpoint',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                'application/vnd.oasis.opendocument.text',
                'application/vnd.oasis.opendocument.presentation',
                'application/vnd.oasis.opendocument.spreadsheet',
                'application/vnd.oasis.opendocument.chart'
            ],
        };

        setTimeout(function() {
            _this.el.froalaEditor(options);
        }, 200);
    }
});