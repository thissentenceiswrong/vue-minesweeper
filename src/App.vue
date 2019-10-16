<template>
    <div>
        <Setting></Setting>
        <Game></Game>

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-114654492-4"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-114654492-4');
</script>

    </div>
</template>

<script>
    import Setting from "./components/Setting";
    import Game from "./components/Game";

    export default {
        components: {Setting, Game}
    };
</script>

<style scoped>

</style>
