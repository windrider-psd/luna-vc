<script>
    import { onMount } from "svelte";
    import "./../lib/app.css";
    import IconButton from "../lib/micro/IconButton.svelte";
    import { OpenComponentModal } from "../lib";
    import ModalManager from "../lib/modal/ModalManager.svelte";

    onMount(()=>{
        OpenComponentModal("Test Modal", IconButton, {
            icon: "fa-home",
            text: "Home",
            color: "primary"
        })
    })
</script>
<ModalManager></ModalManager>
<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p class="text-2xl">Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<IconButton
    icon="fa-home"
    text="Home"
    color="primary">

</IconButton>