<template>
    <file-pond
    name="icon"
    label-idle="Clique ou arraste a imagem..."
    :allow-multiple="false"
    accepted-file-types="image/svg+xml"
    :beforeRemoveFile="teste2"
    class="layout-upload-file"
    :files="myFiles"/>
</template>

<script>
import vueFilePond from 'vue-filepond';

import 'filepond/dist/filepond.min.css';

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

export default {
    components: {
        FilePond
    },
    data() {
        return { 
          myFiles: null
        };
    },
    methods: {
      teste(value, value2) {
        console.log(value)
        console.log(value2)
      },
      teste2(value, value2) {

        console.log(value)
        console.log(value2)
      },
        handleFilePondInit: function() {
            console.log('FilePond has initialized');

            // example of instance method call on pond reference
            this.$refs.pond.getFiles();
        }
    }
};
</script>
<style lang="scss">
.layout-upload-file {
    cursor: pointer;
    :nth-child(1) {
    
    cursor: pointer;
    }
}
.filepond--panel-root {
  cursor: pointer;
  background-color: rgb(187, 70, 70);
}
</style>