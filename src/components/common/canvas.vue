<template>
    <canvas
        id="bgcanvas"
        v-canvas
        style="position:absolute;top:0;bottom:0;left:0;right:0;z-index:-1111;"
    >浏览器版本过低，不支持该效果</canvas>
</template>
<script>
import DrawCanvas from "@/assets/js/canvas";

export default {
    directives: {
        canvas: {
            inserted(el) {
                DrawCanvas(el);
            }
        }
    }
};
</script>
